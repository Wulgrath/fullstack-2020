const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'SECRET_KEY'

const MONGODB_URI = 'mongodb+srv://tan_nyy:testi@testi.5javp.mongodb.net/library-app?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    allAuthors: [Author]
    findAuthor(name: String!): Author
    bookCount(author: String): Int!
    allBooks(author: String, genre: String): [Book]
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    
    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      born: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`


const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    //allBooks: (root, args) => books.filter(p => p.author.includes(args.author || "" /* p.genres.includes(args.genre)*/)),
    allBooks: (root, args) => {
      return Book.find({}).populate('author', { name: 1, born: 1 })
    },
    allAuthors: (root, args) => {
      return Author.find({})
    },
    findAuthor: (root, args) => {
      return Author.findOne({ name: args.name })
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        const newAuthor = new Author({ name: args.author })
        author = newAuthor
        return author.save()
      }

      const book = new Book({ ...args, author: author._id })

      return book.save()
    },

    addAuthor: (root, args) => {
      const author = new Author({ name: args.name })
      return author.save()
    },

    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.born

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return author
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'salasana') {
        throw new UserInputError('wrong username or password')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Author: {
    bookCount: (root) => Book.find({ author: root._id }).countDocuments()
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
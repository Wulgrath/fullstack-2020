const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'testi1',
        author: "Erkki",
        url: "asdasdasdad",
        likes: 1222,
    },
    {
        title: 'testi2',
        author: "Jorma",
        url: "weweweewew",
        likes: 6476,
    },
    {
        title: 'testi2',
        author: "Jorma",
        url: "weweweewew",
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}
module.exports = {
    initialBlogs, 
    blogsInDb, 
    usersInDb
}
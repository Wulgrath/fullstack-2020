const { TestScheduler } = require('jest')
const mongoose = require ('mongoose')
const supertest = require ('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
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
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(initialBlogs.length)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'newBlog',
        author: 'Marjatta',
        url: 'asd',
        likes: 124
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const contents = res.body.map(r => r.title)
    expect(res.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
        'newBlog'
    )
})

afterAll(() => {
    mongoose.connection.close()
})
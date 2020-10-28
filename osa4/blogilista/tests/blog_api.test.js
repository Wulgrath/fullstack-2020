
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(helper.initialBlogs.length)
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

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).toContain(
        'newBlog'
    )
})

test('identification defined as id', async () => {
    const res = await api.get('/api/blogs')
    for (let i = 0; i < res.body.length; i++) {
        expect(res.body[i].id).toBeDefined()
    }
})

test('undefined likes is 0', async () => {
    const res = await api.get('/api/blogs')
    for (let i = 0; i < res.body.length; i++) {
        if (!res.body[i].likes) {
            expect(res.body[i].likes).toBe(0)
        }
    }
})

test('a blog without title and url returns 400', async () => {
    const newBlog = {
        author: 'Marjatta',
        likes: 124
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})
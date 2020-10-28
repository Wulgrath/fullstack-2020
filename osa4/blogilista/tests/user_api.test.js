const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        
        const passwordHash = await bcrypt.hash('sekret', 10)

        const user = new User({
            username: 'ASD',
            name: 'Mikko',
            passwordHash
        })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Arppa',
            name: 'Arto Paani',
            password: 'salasana'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails when username is taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ASD',
            name: 'Jari',
            password: 'salasana'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails when password is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'merirosvo',
            name: 'Jari',
            password: 'sa'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('password too short')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails when username is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'me',
            name: 'Jari',
            password: 'salasana'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body).toContain('is shorter than the minimum')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
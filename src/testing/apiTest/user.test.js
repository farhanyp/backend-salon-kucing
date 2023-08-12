import supertest from "supertest";
import mongoose from "mongoose"
import { app } from "../../application/app";
import { connectMongoDB, closedMongoDB } from "../util";
import { logger } from "../../application/logger";

describe('POST /api/v1/member/login', () => {

    beforeAll(async () => {
        await connectMongoDB()
    });

    afterAll(async () => {
        await closedMongoDB()
        });

    test('should can login', async () =>{
        const result = await supertest(app)
        .post('/api/v1/member/login')
        .send({
            username : 'admin-salon-hewan-admin',
            password : 'admin-salon-hewan159357',
        })

        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data._id).toBeDefined()
    })

    test('should reject login if not input username and password', async () =>{
        const result = await supertest(app)
        .post('/api/v1/member/login')
        .send({
            username : '',
            password : 'admin-salon-hewan159357',
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    test('should reject login if wrong username', async () =>{
        const result = await supertest(app)
        .post('/api/v1/member/login')
        .send({
            username : 'salah',
            password : 'admin-salon-hewan159357',
        })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    test('should reject login if wrong password', async () =>{
        const result = await supertest(app)
        .post('/api/v1/member/login')
        .send({
            username : 'admin-salon-hewan-admin',
            password : 'salah',
        })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
    
})
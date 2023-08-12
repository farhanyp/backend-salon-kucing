import supertest from "supertest";
import { app } from "../../application/app"
import { logger } from "../../application/logger";
import { getUser, closedMongoDB, connectMongoDB, deleteManyCategory, createManyCategory, getManyCategory } from "../util";
import { not } from "joi";

describe('POST /api/v1/member/category/create', ()=>{

    afterAll(async () => {
        await deleteManyCategory()
        await closedMongoDB()
    });

    it("Should can create category", async()=>{
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .post('/api/v1/member/category/create')
        .set("Authorization", getTestUser.token)
        .send({
            name: 'test'
        })

        expect(result.status).toBe(200)
        expect(result.body.data.name).toBe("test")
        expect(result.body.data._id).toBeDefined()
        
    })

    it("Should reject if invalid header", async()=>{
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .post('/api/v1/member/category/create')
        .set("Authorization", "getTestUser.token")
        .send({
            name: 'test'
        })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
        
    })

    it("Should reject if invalid input", async()=>{
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .post('/api/v1/member/category/create')
        .set("Authorization", getTestUser.token)
        .send({
            name: ''
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
        
    })
})

describe('GET /api/v1/member/categories', ()=>{

    beforeAll(async ()=>{
        // await connectMongoDB()
        await createManyCategory()
    })

    afterAll(async () => {
        await deleteManyCategory()
        await closedMongoDB()
    });

    it("Should can get category", async()=>{
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .get('/api/v1/member/categories')
        .set("Authorization", getTestUser.token)

        logger.info(result)
        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(5)
        
    })

    it("Should reject if invalid header", async()=>{
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .get('/api/v1/member/categories')
        .set("Authorization", "getTestUser.token")

        logger.info(result)
        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
        
    })
})


describe('PATCH /api/v1/member/category/:categoryId', ()=>{

    beforeAll(async ()=>{
        // await connectMongoDB()
        await createManyCategory()
    })

    afterAll(async () => {
        await deleteManyCategory()
        await closedMongoDB()
    });

    it("Should can update category", async()=>{
        const getTestUser = await getUser()
        const getTestCategory = await getManyCategory()
        const result =  await supertest(app)
        .patch('/api/v1/member/category/'+getTestCategory._id)
        .set("Authorization", getTestUser.token)
        .send({
            "name": "test1"
        })

        logger.info("category real: "+getTestCategory.name)
        logger.info("category update: "+result.body.data.name)
        logger.info("category update1: "+getTestCategory.name)
        expect(result.status).toBe(200)
        expect(result.body.data.name).toBe("test1")
        expect(result.body.data.name).not.toBe(getTestCategory.name)
        
    })

    it("Should reject if invalid header", async()=>{
        const getTestUser = await getUser()
        const getTestCategory = await getManyCategory()
        const result =  await supertest(app)
        .patch('/api/v1/member/category/'+getTestCategory._id)
        .set("Authorization", "getTestUser.token")
        .send({
            "name": "test1"
        })

        expect(result.status).toBe(401)
        
    })
})

describe('DELETE /api/v1/member/category/:categoryId', ()=>{

    beforeAll(async ()=>{
        // await connectMongoDB()
        await createManyCategory()
    })

    afterAll(async () => {
        await deleteManyCategory()
        await closedMongoDB()
    });

    it("Should can remove category", async()=>{
        const getTestUser = await getUser()
        const getTestCategory = await getManyCategory()
        const result =  await supertest(app)
        .delete('/api/v1/member/category/'+getTestCategory._id)
        .set("Authorization", getTestUser.token)

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")
        
    })

    it("Should reject if wrong url", async()=>{
        const getTestUser = await getUser()
        const getTestCategory = await getManyCategory()
        const result =  await supertest(app)
        .delete('/api/v1/member/categorysalah/'+getTestCategory._id)
        .set("Authorization", getTestUser.token)

        expect(result.status).toBe(404)
        
    })
})

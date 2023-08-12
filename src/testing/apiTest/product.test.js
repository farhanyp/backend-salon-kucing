import supertest from "supertest"
import { app } from "../../application/app"
import { getUser } from "../util"
import { logger } from "../../application/logger"
import { deleteManyProduct, closedMongoDB, createManyCategory, getManyCategory, createManyProduct, deleteManyCategory, getOneProduct } from "../util"

describe("POST /api/v1/member/product/create",()=>{

    beforeAll(async ()=>{
        // await connectMongoDB()
        await createManyCategory()
    })

    afterAll(async () => {
        await deleteManyProduct()
        await deleteManyCategory()
        await closedMongoDB()
    });

    test("Should can create product", async () => {
        const getTestUser = await getUser()
        const getTestCategory = await getManyCategory()
        const result = await supertest(app)
        .post("/api/v1/member/product/create")
        .set("Authorization", getTestUser.token)
        .send({
            name: "Kucing Gaming",
            qty: 2,
            desc: "ini kucing gaming",
            price: 30000,
            categoryId: getTestCategory._id
        })

        expect(result.status).toBe(200)
        expect(result.body.data.name).toBe("Kucing Gaming")
        expect(result.body.data.qty).toBe(2)
        expect(result.body.data.desc).toBe("ini kucing gaming")
        expect(result.body.data.price).toBe(30000)
        expect(result.body.data.categoryId).not.toBeNull()

    })

    test("Should reject if invalid header", async () => {
        const getTestUser = await getUser()
        const getTestCategory = await getManyCategory()
        const result = await supertest(app)
        .post("/api/v1/member/product/create")
        .set("Authorization", "getTestUser.token")
        .send({
            name: "Kucing Gaming",
            qty: 2,
            desc: "ini kucing gaming",
            price: 30000,
            categoryId: getTestCategory._id
        })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    test("Should reject if invalid input", async () => {
        const getTestUser = await getUser()
        const getTestCategory = await getManyCategory()
        const result = await supertest(app)
        .post("/api/v1/member/product/create")
        .set("Authorization", getTestUser.token)
        .send({
            name: "",
            desc: "",
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

})


describe("GET /api/v1/member/product",()=>{

    beforeAll(async ()=>{
        // await connectMongoDB()
        await createManyCategory()
        await createManyProduct()
    })

    afterAll(async () => {
        await deleteManyProduct()
        await deleteManyCategory()
        await closedMongoDB()
    });

    test("Should can get product", async () => {
        const getTestUser = await getUser()
        const result = await supertest(app)
        .get("/api/v1/member/product")
        .set("Authorization", getTestUser.token)

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(3)

    })

    test("Should reject if invalid header", async () => {
        const getTestUser = await getUser()
        const result = await supertest(app)
        .get("/api/v1/member/product")
        .set("Authorization", "getTestUser.token")

        expect(result.status).toBe(401)

    })

})


describe('PATCH /api/v1/member/product/:productId', ()=>{

    beforeAll(async ()=>{
        // await createManyCategory()
        // await createManyProduct()
    })

    afterAll(async () => {
        // await deleteManyProduct()
        // await deleteManyCategory()
        await closedMongoDB()
    });

    it("Should can update category", async()=>{
        const getTestUser = await getUser()
        const getTestCategory = await getManyCategory()
        const getTestProduct = await getOneProduct()
        const result =  await supertest(app)
        .patch('/api/v1/member/product/'+getTestProduct._id)
        .set("Authorization", getTestUser.token)
        .send({
            "name": "test1",
            "qty": 2000,
            "desc": "test test 123",
            "price" : 2000,
            "categoryId": getTestCategory._id
        })


        expect(result.status).toBe(200)
        expect(result.body.data.name).toBe("test1")
        expect(result.body.data.qty).toBe(2000)
        expect(result.body.data.desc).toBe("test test 123")
        expect(result.body.data.price).toBe(2000)
        expect(result.body.data.name).not.toBe(getTestCategory.name)
        
    })


    it("Should reject if invalid header", async()=>{
        const getTestUser = await getUser()
        const getTestCategory = await getManyCategory()
        const getTestProduct = await getOneProduct()
        const result =  await supertest(app)
        .patch('/api/v1/member/product/'+getTestProduct._id)
        .set("Authorization", "getTestUser.token")
        .send({
            "name": "test1",
            "qty": 2000,
            "desc": "test test 123",
            "price" : 2000,
            "categoryId": getTestCategory._id
        })

        
        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
        
    })
})


describe('DELETE /api/v1/member/product/:productId', ()=>{

    beforeAll(async ()=>{
        // await connectMongoDB()
        await createManyCategory()
        await createManyProduct()
    })

    afterAll(async () => {
        await deleteManyProduct()
        await deleteManyCategory()
        await closedMongoDB()
    });

    it("Should can remove product", async()=>{
        const getTestUser = await getUser()
        const getTestProduct = await getOneProduct()
        const result =  await supertest(app)
        .delete('/api/v1/member/product/'+getTestProduct._id)
        .set("Authorization", getTestUser.token)

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")
        
    })


    it("Should reject if invalid header", async()=>{
        const getTestUser = await getUser()
        const getTestProduct = await getOneProduct()
        const result =  await supertest(app)
        .delete('/api/v1/member/product/'+getTestProduct._id)
        .set("Authorization", "getTestUser.token")

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
        
    })
})




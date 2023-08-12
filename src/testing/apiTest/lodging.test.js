import supertest from "supertest";
import { app } from "../../application/app"
import { logger } from "../../application/logger"
import { getUser, deleteManyTimes, createTimes, deleteManyLodging, createLodging, getLodging } from "../util"

describe("POST /api/v1/member/lodging/create", ()=>{

    afterAll( async() => {
        await deleteManyLodging()
    })

    it("Should can create lodging", async()=>{
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 3);
        
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .post('/api/v1/member/lodging/create')
        .set("Authorization", getTestUser.token)
        .send({
            ownerName: "test",
            phoneNumber: "084563125699",
            email: "test@gmail.com",
            petName: "test",
            petTypes: "test",
            startTime: currentDate,
            endTime: futureDate,
            specialNeeds: false,
            paymentStatus: false,
        })

        expect(result.status).toBe(200)
        expect(result.body.data.ownerName).toBe("test")
        expect(result.body.data.phoneNumber).toBe("084563125699")
        expect(result.body.data.email).toBe("test@gmail.com")
        expect(result.body.data.petName).toBe("test")
        expect(result.body.data.petTypes).toBe("test")
        expect(result.body.data.startTime).toBeDefined()
        expect(result.body.data.endTime).toBeDefined()
        expect(result.body.data.specialNeeds).toBe(false)
        expect(result.body.data.paymentStatus).toBe(false)
        
    })


    it("Should reject if invalid header", async()=>{
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 3);
        
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .post('/api/v1/member/lodging/create')
        .set("Authorization", "getTestUser.token")
        .send({
            ownerName: "test",
            phoneNumber: "084563125699",
            email: "test@gmail.com",
            petName: "test",
            petTypes: "test",
            startTime: currentDate,
            endTime: futureDate,
            specialNeeds: false,
            paymentStatus: false,
        })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
        
    })

    it("Should reject if invalid input", async()=>{
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 3);
        
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .post('/api/v1/member/lodging/create')
        .set("Authorization", getTestUser.token)
        .send({
            ownerName: "",
            phoneNumber: "",
            email: "",
            petName: "",
            petTypes: "",
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})

describe("GET /api/v1/member/lodging", ()=>{

    beforeEach(async () => {
        await createLodging()
    })

    afterAll( async() => {
        await deleteManyLodging()
    })

    it("Should can create lodging", async()=>{
        const getTestLodging = await getLodging()
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 3);
        
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .get('/api/v1/member/lodging')
        .set("Authorization", getTestUser.token)

        expect(result.status).toBe(200)
        expect(result.body.data.ownerName).toBe(getTestLodging.ownerName)
        expect(result.body.data.phoneNumber).toBe(getTestLodging.phoneNumber)
        expect(result.body.data.email).toBe(getTestLodging.email)
        expect(result.body.data.petName).toBe(getTestLodging.petName)
        expect(result.body.data.petTypes).toBe(getTestLodging.petTypes)
        expect(result.body.data.startTime).toBe(getTestLodging.startTime)
        expect(result.body.data.endTime).toBe(getTestLodging.endTime)
        expect(result.body.data.specialNeeds).toBe(getTestLodging.specialNeeds)
        expect(result.body.data.paymentStatus).toBe(getTestLodging.paymentStatus)
        
    })


    it("Should reject if invalid header", async()=>{
        const getTestLodging = await getLodging()
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 3);
        
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .get('/api/v1/member/lodging')
        .set("Authorization", "getTestUser.token")

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
        
    })

})

describe("PATCH /api/v1/member/lodging/:lodgingId", ()=>{

    beforeEach(async () => {
        await createLodging()
    })

    afterAll( async() => {
        await deleteManyLodging()
    })

    it("Should can update lodging", async()=>{
        const getTestLodging = await getLodging()
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 3);
        
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .patch('/api/v1/member/lodging/'+getTestLodging._id)
        .set("Authorization", getTestUser.token)
        .send({
            paymentStatus: true
        })

        expect(result.status).toBe(200)
        expect(result.body.data.paymentStatus).not.toBe(getTestLodging.paymentStatus)
        
    })


    it("Should reject if invalid header", async()=>{
        const getTestLodging = await getLodging()
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 3);
        
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .patch('/api/v1/member/lodging/'+getTestLodging._id)
        .set("Authorization", "getTestUser.token")

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
        
    })
    
})


describe("DELETE /api/v1/member/lodging/:lodgingId", ()=>{

    beforeEach(async () => {
        await createLodging()
    })

    afterAll( async() => {
        await deleteManyLodging()
    })

    it("Should can delete lodging", async()=>{
        const getTestLodging = await getLodging()
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 3);
        
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .delete('/api/v1/member/lodging/'+getTestLodging._id)
        .set("Authorization", getTestUser.token)

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")
        
    })


    it("Should reject if invalid header", async()=>{
        const getTestLodging = await getLodging()
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 3);
        
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .delete('/api/v1/member/lodging/'+getTestLodging._id)
        .set("Authorization", getTestUser.token)

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")
        
    })
    
})


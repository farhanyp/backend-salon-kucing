import supertest from "supertest";
import { app } from "../../application/app"
import { logger } from "../../application/logger"
import { getUser, deleteManyTimes, createTimes } from "../util"

describe("POST /api/v1/member/booking/times", ()=>{

    afterAll( async() => {
        await deleteManyTimes()
    })

    it("Should can create available time", async()=>{
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 3);
        
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .post('/api/v1/member/booking/times')
        .set("Authorization", getTestUser.token)
        .send({
            startTime: currentDate,
            endTime: futureDate,
        })

        expect(result.status).toBe(200)
        expect(result.body.data.startTime).toBeDefined()
        expect(result.body.data.endTime).toBeDefined()
        
    })

    it("Should reject if invalid header", async()=>{
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 3);
        
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .post('/api/v1/member/booking/times')
        .set("Authorization", "getTestUser.token")
        .send({
            startTime: currentDate,
            endTime: futureDate,
        })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
        
    })

})


describe("GET /api/v1/member/booking/times", ()=>{

    beforeEach( async() => {
        await createTimes()
    })

    afterAll( async() => {
        await deleteManyTimes()
    })

    it("Should can create available time", async()=>{
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 3);
        
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .get('/api/v1/member/booking/times')
        .set("Authorization", getTestUser.token)

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(1)
        
    })

    it("Should reject if invalid header", async()=>{
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 3);
        
        const getTestUser = await getUser()
        const result =  await supertest(app)
        .get('/api/v1/member/booking/times')
        .set("Authorization", "getTestUser.token")

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
        
    })

})



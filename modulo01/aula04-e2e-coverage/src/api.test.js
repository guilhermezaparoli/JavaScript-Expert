const { describe, it, after, before } = require("mocha")
const supertest = require("supertest")
const assert = require("assert")


describe("Api suite test", () => {
    let app;
    before((done) => {
        app = require("./api")
        app.once('listening', done)

    })
    after(done => app.close(done))
    describe("/contact:get", () => {
        it("Should request the contact route and return HTTP status 200", async () => {
            const response = await supertest(app).get("/contact").expect(200)
            assert.strictEqual(response.text, "Contact us page")

        })
    }) 
    describe("/login:post", () => {
        it("Should request the login page and return HTTP status 200", async () => {
            const response = await supertest(app).post("/login").expect(200).send({username: "erickwendel", password: '123'})
            assert.strictEqual(response.text, "Log in succeeded")

        })
    }) 
    describe("/login:post", () => {
        it("Should request the login page and return HTTP status 401", async () => {
            const response = await supertest(app).post("/login").expect(401).send({username: "erickwendel", password: '1234'})
            assert.ok(response.unauthorized)
            assert.strictEqual(response.text, "Log in faild!")

        })
    }) 
    describe("get/hi:404", () => {
        it("Should request and existing age return HTTP Status 404", async () => {
            const response = await supertest(app).get("/hi").expect(404)
        

        })
    }) 
})
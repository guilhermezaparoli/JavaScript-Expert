const http = require('http')
const DEFAULT_USER = {
    username: "ErickWendel",
    password: "123"
}
const {once} = require("events")
function handler(request, response) {
    const {url, method} = request

    const routes = {
        '/contact:get': (request, response) => {
            response.write("Contact us page")
            return response.end()
        },
        '/login:post': async (request, response) => {
            const user = JSON.parse(await once(request, "data"))
            const toLower = (text)=> text.toLowerCase()
         

           if(toLower(user.username) !== toLower(DEFAULT_USER.username)  || user.password !== DEFAULT_USER.password){
            response.writeHead(401)
            response.end("Log in faild!")
            return
           }
            response.write("Log in succeeded")
            return response.end()
        },
        default(request, response) {
            response.writeHead(404)
            return response.end("Not found!")
        }
    }
    
    const routeKey = `${url}:${method.toLowerCase()}`
    console.log({routeKey});
    const chosen = routes[routeKey] || routes.default

   
    return chosen(request, response)
}

const app = http.createServer(handler).listen(3000, () =>  console.log("running at PORT 3000"))

module.exports = app
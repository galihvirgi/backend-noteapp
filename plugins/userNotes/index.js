const routesUser = require("./routes")
const UserHandler = require('./handler')

const UserPlugin = {
    name : 'user',
    version : '1.0.0',
    register : async (server, {service}) => {
        const userHandler = new UserHandler(service)
        const userRoute = routesUser(userHandler)
        server.route(userRoute)
    }
}

module.exports = UserPlugin
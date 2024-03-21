const { server } = require("@hapi/hapi");
const { AuthHandler } = require("./handler");
const routes = require("./routes");

const authPlugin = {
    name: 'auth',
    version: '1.0.0',
    register: async (server, {userServices}) => {
        console.log(userServices)
        const authHandler = new AuthHandler(userServices)
        const authRoutes = routes(authHandler)
        server.route(authRoutes)
    }
}

module.exports = authPlugin
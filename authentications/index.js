const AuthenticationHandler = require('./handler')
const routes = require('./routes')

module.exports = {
    name: 'auth',
    version: '1.0.0',
    register: async (server, { authService, userService, tokenManager, validator }) => {
        const authHandler = new AuthenticationHandler(authService, userService, tokenManager, validator)
        server.route(routes(authHandler))
    }
}

const routes = handler => [
    {
        method: 'POST',
        path: '/auth/login',
        handler: handler.loginHandler
    },
]

module.exports = routes

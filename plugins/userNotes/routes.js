

const routesUser = (handler) => [
    {
        method : 'POST',
        path : '/user',
        handler : handler.addUserHandler
    },
    {
        method: 'GET',
        path: '/user',
        handler: handler.getUserHandler
    },
    {
        method: 'PUT',
        path: '/user/{id}',
        handler: handler.updateUserHandler
    },
    {
        method: 'DELETE',
        path: '/user/{id}',
        handler: handler.deleteUserHandler
    },
    
]

module.exports = routesUser
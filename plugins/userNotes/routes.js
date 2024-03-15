const Joi = require("joi")
const { validateAddUser } = require("./validate")


const routesUser = (handler) => [
    {
        method : 'POST',
        path : '/user',
        handler : handler.addUserHandler,
        options: {
            validate: {
                payload: Joi.object({ 
                    username: Joi.required(),
                    email: Joi.required(),
                    password: Joi.string().min(8).required() 
                }) 
            }
        }
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
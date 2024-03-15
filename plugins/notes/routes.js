
// Kode Sebelumnya

const Joi = require("joi")

// const routes = [
//     {
//         method : 'POST',
//         path : '/notes',
//         handler : addNoteHandler
//     },
//     {
//         method: 'GET',
//         path: '/notes',
//         handler: getNoteHandler
//     },
//     {
//         method: 'PUT',
//         path: '/notes',
//         handler: updateNoteHandler
//     },
//     {
//         method: 'DELETE',
//         path: '/notes/{id}',
//         handler: deleteNoteHandler
//     },

// ]


// Kode Baru

const routes = (handler) => [
    {
        method: 'POST',
        path: '/notes',
        handler: handler.addNoteHandler,
        options: {
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(5).required(),
                    content: Joi.required(),
                    writer: Joi.required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/notes',
        handler: handler.getNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: handler.getNoteByIdHandler
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: handler.updateNoteHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler.deleteNoteHandler
    },

]


module.exports = routes
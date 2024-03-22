const mysql = require ('mysql2/promise');

class UserHandler{
    constructor(service){
        this._service = service

        this.addUserHandler = this.addUserHandler.bind(this)
        this.getUserHandler = this.getUserHandler.bind(this)
        this.updateUserHandler = this.updateUserHandler.bind(this)
        this.deleteUserHandler = this.deleteUserHandler.bind(this)
    }

    addUserHandler = async (request, h) => {
        const {username, email, password} = request.payload

        const userId = await this._service.addUser({username, email, password})

        const response = h.response({
            status: 'success',
        })

        response.code(201)
        return response
    }

    getUserHandler = async(request, h) => {
        const user = await this._service.getUsers()

        const response = h.response({
            status: 'success',
            data: {
                user
            }
        })

        response.code(201)
        return response
    }

    getUserByEmailHandler = async(request, h) => {
        
        try {
            const { email } = request.params
            const user = await this._service.getUserByEmail(email)

            return h.response({
                status: 'success',
                data: {
                    user
                }
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    updateUserHandler = async (request, h) => {
        try{
            const { id } = request.params
            const { username, email, password } = request.payload

            await this._service.editUserById(id, {username, email, password})

            return h.response({
                status: 'success',
                message: 'User berhasil diubah',
            })
        }catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    deleteUserHandler = async (request, h) => {

        
        try {
            const { id } = request.params
            this._service.deleteUserById(id)

            return h.response({
                status: 'success',
                message: 'user berhasil dihapus'
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }
}

module.exports = UserHandler
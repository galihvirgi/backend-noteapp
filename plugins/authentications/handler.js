const { generateToken } = require("../../tokenize/tokenManager")

class AuthHandler{
    constructor(userService){
        this._userService = userService

        this.loginHandler = this.loginHandler.bind(this)
    }

    loginHandler = async (request, h) => {
        const { email, password } = request.payload

        const userDb = await this._userService.getUserByEmail(email)
        console.log(email, userDb)
        if(userDb.length == 0){
            const response =  h.response({
                status: 'fail',
                message: 'user tidak ditemukan'
            })
            response.code(404)
            return response
        }

        if(userDb[0].password == password){
            const token = generateToken({ id: userDb[0].id })
            const response = h.response({
                status: 'success',
                message: 'anda berhasil login', 
                data: {
                    token
                }
            })
            response.code(200)
            return response
        }else{
            const response = h.response({
                status: 'fail',
                message: 'password tidak valid', 
            })
            response.code(401)
            return response
        }
    }
}

module.exports = {AuthHandler}
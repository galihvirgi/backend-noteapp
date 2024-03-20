class AuthenticationHandler {
    constructor (authService, userService, tokenManager, validator) {
        this._authService = authService
        this._userService = userService
        this._tokenManager = tokenManager
        this._validator = validator

        this.postAuthHandler = this.postAuthHandler.bind(this)
        this.putAuthHandler = this.putAuthHandler.bind(this)
        this.deleteAuthHandler = this.deleteAuthHandler.bind(this)
    }

    async postAuthHandler ({ payload }, h) {
        this._validator.validatePostAuthPayload(payload)
        const { username, password } = payload
        const id = await this._userService.verifyUserCredentials(username, password)

        const accessToken = this._tokenManager.generateAccessToken({ id })
        const refreshToken = this._tokenManager.generateRefreshToken({ id })

        await this._authService.addRefreshToken(refreshToken)

        const response = h.response({
            status: 'success',
            message: 'Authentication berhasil ditambahkan',
            data: {
                accessToken, refreshToken
            }
        })

        response.code(201)
        return response
    }

    async putAuthHandler ({ payload }, h) {
        this._validator.validatePutAuthPayload(payload)

        const { refreshToken } = payload
        await this._authService.verifyRefreshToken(refreshToken)
        const { id } = this._tokenManager.verifyRefreshToken(refreshToken)

        const accessToken = this._tokenManager.generateAccessToken({ id })
        return {
            status: 'success',
            message: 'Access Token berhasil diperbarui',
            data: {
                accessToken
            }
        }
    }

    async deleteAuthHandler ({ payload }, h) {
        this._validator.validateDeleteAuthPayload(payload)
        const { refreshToken } = payload

        await this._authService.verifyRefreshToken(refreshToken)
        await this._authService.deleteRefreshToken(refreshToken)

        return {
            status: 'success',
            message: 'Refresh token berhasil dihapus'
        }
    }
}

module.exports = AuthenticationHandler

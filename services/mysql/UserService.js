//Ini untuk user notes

class UserServices{
    constructor(pool){
        this.pool = pool
    }

    async addUser({username, email, password}){
        const[result] = await this.pool.execute('INSERT INTO user (username, email, password) VALUES (:username, :email, :password)', { username, email, password })
        console.log(result)
        return result.InsertId
    }

    async getUsers() {
        const [rows] = await this.pool.query('SELECT * FROM user')
        console.log(rows)
        return rows
    }

    async getUserByEmail(email) {
        const [rows] = await this.pool.query('SELECT * FROM user WHERE email=:email', {email})
        return rows
    }

    async editUserById(id, {username, email, password}){
        const[result] = await this.pool.execute('UPDATE user SET username=:username, email=:email, password=:password WHERE id=:id', {username, email, password, id})
        return result.affectedRows
    }

    async deleteUserById(id){
        const [result] = await this.pool.execute('DELETE FROM user WHERE id=:id', { id })
        return result.affectedRows
    }
}

module.exports = UserServices
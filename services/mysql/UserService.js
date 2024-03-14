class UserServices{
    constructor(pool){
        this.pool = pool
    }

    async addUser({nama, email, password}){
        const[result] = await this.pool.execute('INSERT INTO user (nama, email, password) VALUES (:nama, :email, :password)', { nama, email, password })
        console.log(result)
        return result.InsertId
    }

    async getUser() {
        const [rows] = await this.pool.query('SELECT * FROM user')
        console.log(rows)
        return rows
    }

    async editUserById(id, {nama, email, password}){
        const[result] = await this.pool.execute('UPDATE user SET nama=:nama, email=:email, password=:password WHERE id=:id', {nama, email, password, id})
        return result.affectedRows
    }

    async deleteUserById(id){
        const [result] = await this.pool.execute('DELETE FROM user WHERE id=:id', { id })
        return result.affectedRows
    }
}

module.exports = UserServices
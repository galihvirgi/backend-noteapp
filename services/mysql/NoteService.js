//ini untuk notes

class NotesService {
  constructor(pool) {
    this._pool = pool
  }

  async addNote({ title, content, writer }) {
    const [result] = await this._pool.execute('INSERT INTO note (title, content, writer) VALUES (:title, :content, :writer)', { title, content, writer })
    console.log(result)
    return result.insertId
  }

  async getNotes() {
    const [rows] = await this._pool.query('SELECT * FROM note')
    console.log(rows)
    return rows
  }

  async getNoteById(id) {
    const [result] = await this._pool.execute('SELECT * FROM note WHERE id=:id', { id })
    return result
  }

  async editNoteById(id, { title, content, writer }) {
    const [result] = await this._pool.execute('UPDATE note SET title=:title, content=:content, writer=:writer WHERE id=:id', { title, content, writer, id })
    return result.affectedRows
  }

  async deleteNoteById(id) {
    const [result] = await this._pool.execute('DELETE FROM note WHERE id=:id', { id })
    return result.affectedRows
  }
}

module.exports = NotesService;
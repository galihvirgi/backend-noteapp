'use  strict';

const Jwt = require('@hapi/jwt')
const Hapi = require('@hapi/hapi');
const notesPlugin = require('./plugins/notes');
const UserPlugin = require('./plugins/userNotes');
const NoteService = require('./services/mysql/NoteService')
const mysql = require('mysql2/promise');
const UserServices = require('./services/mysql/UserService');


const init = async () => {

    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'virgi2007btg',
        database: 'notes',
        waitForConnections: true,
        connectionLimit: 10,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
        namedPlaceholders: true,
      });

    // INI OBJEK SERVICES
    const noteServices = new NoteService(pool)
    const userServices = new UserServices(pool)

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.register([
        {
            plugin: Jwt
        }
    ])

    await server.register(
        {
            plugin : notesPlugin,
            options : {
                service: noteServices
            }
        }
    )
    await server.register(
        {
            plugin : UserPlugin,
            options : {
                service: userServices
            }
        }
    )
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
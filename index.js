'use  strict';

const Hapi = require('@hapi/hapi');
const notesPlugin = require('./plugins/notes');
const UserPlugin = require('./plugins/userNotes');
const NoteService = require('./services/mysql/NoteService')
const mysql = require('mysql2/promise');
const UserServices = require('./services/mysql/UserService');
const Jwt = require('@hapi/jwt');
const TokenManager = require('./tokenize/tokenManager');
const authPlugin = require('./plugins/authentications');



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
    console.log(userServices)
    

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.register([
        {
            plugin: Jwt
        }
    ])

    server.auth.strategy('notes_jwt', 'jwt', {
        keys: '882cf3826475aeec414d83cfc3d34751051a2ed50e6e4b0190083eae78e01373207dd3e1644c65d5b45b07bf929533e42f0b3901300b87915b5cf604ce0fa061',
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: 1800
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id
            }
        })
    })

    await server.register([
        {
            plugin: authPlugin,
            options: {
                userServices,
                tokenManager: TokenManager
            }
        },
        {
            plugin : notesPlugin,
            options : {
                service: noteServices
            }
        },
        {
            plugin : UserPlugin,
            options : {
                service: userServices
            }
        }
    ])

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
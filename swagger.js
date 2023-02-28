const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Homework Rakamin W9",
            version: "1.0.0",
            description: "CRUD on table users & movies with Authentication & Authorization",
            contact: {
                name : "Aruf Rachman Hakim",
                email : "arufhakim@gmail.com"
            } 
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ['./router/*']
};

const specs = swaggerJsdoc(options);

module.exports = specs;
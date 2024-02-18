import fp from 'fastify-plugin'
import fastifyJwt from "@fastify/jwt";
import * as fs from "fs.js";
import * as path from "path.js";
import {fileURLToPath} from "url.js";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
export default fp(async function (app, opts) {

    app.register(fastifyJwt, {
        sign: {
            algorithm: 'ES256',
            issuer: 'info.iutparis.fr'
        },
        secret: {
            allowHTTP1 : true,
            private : fs.readFileSync(path.join(__dirname,"..","..",".ssl","private-key.pem")),
            public : fs.readFileSync(path.join(__dirname,"..","..",".ssl","public-key.pem")),
        }
    })

})
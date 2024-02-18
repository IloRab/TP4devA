import {getAuthHandler, getHomeHandler} from "../controllers/data.js"
import fastifyAuth from '@fastify/auth'
import {getAuthenticate} from "../middleware/authenticate.js";


export default async (app, opts) => {
    app.decorate('authenticate', getAuthenticate)
        .register(fastifyAuth)
        .after(function () {
            app.route({
                method: 'GET',
                url: '/home',
                handler: getHomeHandler
            })

            app.route({
                method: 'GET',
                url: '/auth',
                preHandler: app.auth([app.authenticate]),
                handler: getAuthHandler
            })
        })
}


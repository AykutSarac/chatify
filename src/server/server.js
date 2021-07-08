const fastify = require('fastify')({ logger: false })

fastify.register(require('fastify-cors'), {
    origin: "*",
    methods: ["POST", "GET"]
  })

fastify.register(require('./routes/router'))

// Homepage
fastify.get('/', async (req, res) => {
    res.status(200).send('Home')
})

const start = async () => {
    try {
        const PORT = process.env.PORT || 8080;
        await fastify.listen(PORT)

        console.log(`Server running at http://127.0.0.1:${PORT}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
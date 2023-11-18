import express from 'express'
const app = express();

//db connection
// const connection = require('./db/database');
// connection.connect();

//cors setting
app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*")
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")//
 next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Get example
const router: express.Router = express.Router()

router.get('/api/getTest', (req, res) => {
  res.send(req.query)
})

//Post example
router.post('/api/postTest', (req, res) => {
  res.send({ hello: 'world' })
})

app.use(router)

app.listen(3001, () => { console.log('Example app listening on port 3001!') })

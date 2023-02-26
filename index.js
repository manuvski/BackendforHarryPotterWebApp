const express = require('express')
const bodyParser = require('body-parser')
const syncCharacters = require('./src/routes/syncCharacters')
const syncStudents = require('./src/routes/syncStudents')
const syncStaff = require('./src/routes/syncStaff')
const syncSpells = require('./src/routes/syncSpells')
const Characters = require('./src/routes/characters')
const Students = require('./src/routes/students')
const Staff = require('./src/routes/staff')
const Spells = require('./src/routes/spells')
const db = require('./src/models')
const userRouter = require('./src/routes/users.js')
const authRoutes = require('./src/routes/auth')
const dotenv = require('dotenv')
const { ensureAuthentication } = require('./src/middelware/auth')
const cors = require('cors')

dotenv.config()

const startApp = async () => {
  const app = express()
  app.use(cors())
  const port = process.env.port

  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

  app.use(ensureAuthentication)
  app.get('/', (request, response) => {
    response.json('Aquí estoy')
  })

  app.use('/characters', Characters)
  app.use('/students', Students)
  app.use('/staff', Staff)
  app.use('/spells', Spells)
  app.use('/syncCharacters', syncCharacters)
  app.use('/syncStudents', syncStudents)
  app.use('/syncStaff', syncStaff)
  app.use('/syncSpells', syncSpells)
  app.use('/users', userRouter)
  app.use('/auth', authRoutes)

  try {
    app.listen(port, () => {
      console.log('APP running on port ' + port)
    })
  } catch (error) {
    console.log(error)
    process.exit(error.message)
  }
}

startApp()

//? Dependencies
const express = require('express')
const cors = require('cors')
//* Routes
const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')
const categoryRouter = require('./categories/categories.router')
const typeRouter = require('./types/types.router')
const recipesRouter = require('./recipes/recipes.router')
//? Files
const { port } = require('./config')
const initModels = require('./models/initModels')
const db = require('./utils/database')

//? Initial Configs
const app = express()
app.use(express.json())
app.use(cors())

db.authenticate() // ? Authenticate database credentials
    .then(() => console.log('Database authenticated'))
    .catch((err) => console.log(err))

db.sync() //? Sync sequelize models
    .then(() => console.log('Database synced'))
    .catch((err) => console.log(err))

initModels()

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/categorries', categoryRouter)
app.use('/api/v1/types', typeRouter)
app.use('/api/v1/recipes', recipesRouter)

app.get('/', (req, res) => {
    res.status(200).json({msg: 'OK'})
});

app.listen(port, () => {
    console.log(`Server started at port: ${port}`)
});
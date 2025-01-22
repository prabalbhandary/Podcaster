const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
require("colors")
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const connectDB = require('./database/db')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const podcastRoutes = require('./routes/podcastRoutes')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({origin: ['http://localhost:5173'], credentials: true}))
app.use(cookieParser())
app.use("/uploads", express.static("uploads"))

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/categories", categoryRoutes)
app.use("/api/v1/podcasts", podcastRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on http://localhost:${PORT}`.bgMagenta.white)
})
import express from 'express'
import dotenv from 'dotenv'
import shortenereRoutes from './routes/shortner'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/' , shortenereRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
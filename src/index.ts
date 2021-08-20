import * as dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { createExpressServer } from 'routing-controllers'
import { UserController } from './controllers/UserController'
import { GlobalErrorHandler } from './middleware/GlobalErrorHandler'

dotenv.config()

const port = process.env.PORT

const app = createExpressServer({
  controllers: [UserController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: true
})

app.use(`/${process.env.IMAGES_STORAGE_URL}`, express.static(path.join(__dirname, '../storage/images')))

app.listen(port, () => console.log(`Running on port ${port}`))

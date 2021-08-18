import * as dotenv from 'dotenv'
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

app.listen(port, () => console.log(`Running on port ${port}`))

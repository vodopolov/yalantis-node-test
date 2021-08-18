import * as dotenv from 'dotenv'
import log4js from 'log4js'
import { createExpressServer } from 'routing-controllers'
import { UserController } from './controllers/UserController'

dotenv.config()

const logger = log4js.getLogger()
logger.level = process.env.LOG_LEVEL || 'debug'

const port = process.env.PORT

const app = createExpressServer({
  controllers: [UserController]
})

app.listen(port, () => console.log(`Running on port ${port}`))

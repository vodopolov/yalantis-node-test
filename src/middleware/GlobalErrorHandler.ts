import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: () => any) {
    response.send(
      {
        ERROR:
          this.checkIfSimpleError(error) ? this.simpleErrorFormatter(error) : error
      })
    next()
  }

  private simpleErrorFormatter(error: any): string {
    return `${error.message} \n ${error.stack}`
  }

  private checkIfSimpleError(e: any): boolean {
    return !!e && (e.message && !e.errors && !e.httpCode)
  }
}

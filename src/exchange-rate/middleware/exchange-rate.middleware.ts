import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { AppLogger } from '../../core/logger/logger.service'

@Injectable()
export class ExchangeRateMiddleware implements NestMiddleware {
  constructor(
    private logger: AppLogger,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers['authorization']) {
        let jsn: any = null
        try {
          // jsn = this.jwt.verify(req.headers['authorization'].toString().split(' ')[1])
        } catch (e) {
          this.logger.log(e)
          // throw new HttpException(this.i18n.t('messages.TOKEN_NOT_FOUND'), HttpStatus.UNAUTHORIZED)
        }
        if (!req.body) {
          req.body = {
            jwt: jsn
          }
        } else {
          req.body.jwt = jsn
          ;(req as any).jwt = jsn
        }

        next()
      } else {
        // throw new HttpException(
          // this.i18n.t('messages.YOUR_REQUEST_IS_UNAUTHORIZED'),
          // HttpStatus.UNAUTHORIZED
        // )
      }
    } catch (e) {
      this.logger.log(e)
      // throw new HttpException(
      //   this.i18n.t('messages.YOUR_SESSION_IS_EXPIRED'),
      //   HttpStatus.UNAUTHORIZED
      // )
    }
  }
}

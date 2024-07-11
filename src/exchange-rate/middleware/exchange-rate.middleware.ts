import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { AppLogger } from '../../core/logger/logger.service'

@Injectable()
export class ExchangeRateMiddleware implements NestMiddleware {

  constructor(
    private jwt: JwtService,
    private logger: AppLogger,
    private readonly als: AsyncLocalStorage<IJwtClaims>
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    // try {
    //   if (req.headers['authorization']) {
    //     let jsn = this.jwt.verify(req.headers['authorization'].toString().split(' ')[1])
    //     const store ={
    //      username: jsn.username
    //      } as IJwtClaims;
    //     this.als.run(store, () => next());

    //   } else {
    //     throw new HttpException(
    //       'your request is unauthorized. please login',
    //       HttpStatus.UNAUTHORIZED
    //     )
    //   }
    // } catch (e) {
    //   console.log(e)
    //   throw new HttpException('your session tokens is expire', HttpStatus.UNAUTHORIZED)
    // }

    this.logger.log('this is just a show case of Authorization,jwt,i18n in middleware')
    next()
  }
 
 
}

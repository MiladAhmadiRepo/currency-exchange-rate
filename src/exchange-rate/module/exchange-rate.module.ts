import { HttpModule } from '@nestjs/axios'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import configuration from '../../core/config/configuration'
import { configModuleOptions } from '../../core/constant/options'
import { AppLogger } from '../../core/logger/logger.service'
import { ExchangeController } from '../controllers/exchange/exchange.controller'
import { ExchangeService } from '../controllers/exchange/exchange.service'
import { ExchangeRateMiddleware } from '../middleware/exchange-rate.middleware'
import { UserBaseEntity } from "../../typeorm/models/users/user_base.model";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forFeature([
      UserBaseEntity,
    ]),
  ],
  controllers: [ExchangeController],
  providers: [
    ExchangeService,
    AppLogger,
  ]
})
export class ExchangeRateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExchangeRateMiddleware).exclude().forRoutes(
      'v1/api/exchange-rate/exchange-rate/*'
      // { path: 'v1/api/patient/initial_evaluation/*', method: RequestMethod.POST },
    )
  }
}

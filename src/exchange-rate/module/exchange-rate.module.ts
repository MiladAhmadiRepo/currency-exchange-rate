import { HttpModule } from '@nestjs/axios'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import configuration from '../../core/config/configuration'
import { AppLogger } from '../../core/logger/logger.service'
import { ExchangeController } from '../controllers/exchange-rate/exchange.controller'
import { ExchangeService } from '../controllers/exchange-rate/exchange.service'
import { ExchangeRateMiddleware } from '../middleware/exchange-rate.middleware'
import { UserBaseEntity } from "../../typeorm/models/exchange_rate/exchange_rate.model";
import { ExchangeApisService } from "../controllers/exchange-apis/exchange-apis.service";

@Module({
  imports: [
    HttpModule,
    // ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forFeature([
      UserBaseEntity,
    ]),
  ],
  controllers: [ExchangeController],
  providers: [
    ExchangeApisService,
    ExchangeService,
    AppLogger,
  ]
})
export class ExchangeRateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExchangeRateMiddleware).exclude().forRoutes(
      'v1/api/exchange-rate-rate/exchange-rate-rate/*'
      // { path: 'v1/api/patient/initial_evaluation/*', method: RequestMethod.POST },
    )
  }
}

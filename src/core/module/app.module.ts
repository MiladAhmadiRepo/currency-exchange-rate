import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

import { ExchangeRateModule } from '../../exchange-rate/module/exchange-rate.module'
import { OrmModule } from '../../typeorm/module/orm.module'
import { AppLogger } from '../logger/logger.service'
import { RouteModule } from './route.module'
import configuration from "../config/configuration";
import { ExchangeRateEntity } from "../../typeorm/models/exchange_rate/exchange-rate.model";
import { ExchangeProviderEntity } from "../../typeorm/models/exchange_rate/exchange-providers.model";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../../../public'),
      serveRoot: '/assets'
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: (() => {
        const logger = new AppLogger()
        logger.log('**************************' + process.env.NODE_ENV + '************************')
        return `env/.env.${process.env.NODE_ENV || 'local'}`
      })(),
      load: [configuration]
    }),
    TypeOrmModule.forFeature([
      ExchangeProviderEntity,
      ExchangeRateEntity
    ]),
    RouteModule,
    OrmModule,
    ExchangeRateModule,
  ],
  controllers: [],
  providers: [ AppLogger]
})
export class AppModule implements NestModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer) {}
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

import { ExchangeRateModule } from '../../exchange-rate/module/exchange-rate.module'
import { RoutesEntity } from '../../typeorm/models/auth/routes.model'
import { UserBaseEntity } from '../../typeorm/models/users/user_base.model'
import { OrmModule } from '../../typeorm/module/orm.module'
import { configModuleOptions } from '../constant/options'
import { AppLogger } from '../logger/logger.service'
import { RouteModule } from './route.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../../../public'),
      serveRoot: '/assets'
    }),
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forFeature([
      RoutesEntity,
      UserBaseEntity,
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

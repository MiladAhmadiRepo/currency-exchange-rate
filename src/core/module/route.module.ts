import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ExchangeRateModule } from "../../exchange-rate/module/exchange-rate.module";


@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api',
        children: [
          // {
          //   path: 'auth',
          //   module: AuthModule
          // },
          {
            path: 'exchange-rate',
            module: ExchangeRateModule
          },


        ]
      }
    ])
  ]
})
export class RouteModule {}

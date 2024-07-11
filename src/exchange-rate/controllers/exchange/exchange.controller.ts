import { Body, Controller, Get, Param, Post, Query, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiParam, ApiTags } from '@nestjs/swagger'
import { DataSource } from 'typeorm'
import { ExchangeService } from './exchange.service'
import { IResponse } from "../../../core/global-dto/IResponse";
import { ConversionValueDtoOut } from "./exchange.dto";


@ApiTags('exchange')
@Controller({
  path: 'exchange',
  version: '1'
})

export class ExchangeController {
  constructor(
    private readonly exchangeService: ExchangeService,
    private dataSource: DataSource
  ) {}
  // ***************************************************************************** */

  @Get(  '/conversion-fiat-currencies')
  async conversionFiatCurrencies(
    @Req() req: Request,
    @Query('amount') amount: number,
    @Query('base') base: string,
    @Query('target') target: string,
  ):
    Promise<IResponse<ConversionValueDtoOut>>
  {
    return await this.exchangeService.conversionFiatCurrencies(base,target,amount )
  }

  @Get(  '/conversion-between-cryptocurrencies')
  async conversionBetweenCryptocurrencies(
    @Req() req: Request,
    @Query('amount') amount: number,
    @Query('base') base: string,
    @Query('target') target: string,
  ):
    Promise<IResponse<ConversionValueDtoOut>>
  {
    return await this.exchangeService.conversionBetweenCryptocurrencies(base,target,amount )
  }

}

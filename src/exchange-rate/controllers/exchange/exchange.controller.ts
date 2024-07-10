import { Body, Controller, Get, Param, Post, Query, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiParam, ApiTags } from '@nestjs/swagger'
import { DataSource } from 'typeorm'
import {   ExchangeRateAndConversionDtoOut,   } from "./exchange.dto";
import { ExchangeService } from './exchange.service'
import { IResponse } from "../../../core/global-dto/IResponse";


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
  @Get(  '/all-conversion')
  async allConversion(
    @Req() req: Request,
    @Query('amount') amount: number,
    @Query('base') base: string,
    @Query('target') target: string,
  ):
    Promise<IResponse<ExchangeRateAndConversionDtoOut>>
  {
    return await this.exchangeService.allConversion(base,target,amount )
  }

  @Get(  '/conversion-irr-to-usd')
  async conversionIrrToUsd(
    @Req() req: Request,
    @Query('amount') amount: number,
    @Query('base') base: string,
    @Query('target') target: string,
  ):
    Promise<IResponse<ExchangeRateAndConversionDtoOut>>
  {
    return await this.exchangeService.conversionIrrToUsd(base,target, amount )
  }

  @Get(  '/conversion-usd-to-any-other-fiat-currencies-or-between-fiat-currencies')
  async conversionUsdToAnyOtherFiatCurrenciesOrBetweenFiatCurrencies(
    @Req() req: Request,
    @Query('amount') amount: number,
    @Query('base') base: string,
    @Query('target') target: string,
  ):
    Promise<IResponse<ExchangeRateAndConversionDtoOut>>
  {
    return await this.exchangeService.conversionUsdToAnyOtherFiatCurrenciesOrBetweenFiatCurrencies(base,target,amount )
  }

  @Get(  '/conversion-eur-to-any-other-cryptocurrency-or-between-cryptocurrencies')
  async conversionEurToAnyCryptocurrencyOrBetweenCryptocurrencies(
    @Req() req: Request,
    @Query('amount') amount: number,
    @Query('base') base: string,
    @Query('target') target: string,
  ):
    Promise<IResponse<ExchangeRateAndConversionDtoOut>>
  {
    return await this.exchangeService.conversionEurToAnyCryptocurrencyOrBetweenCryptocurrencies(base,target,amount )
  }

}

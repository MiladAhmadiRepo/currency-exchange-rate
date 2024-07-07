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
  @Get(  '/exchange-and-conversion')
  async addClinic(
    @Req() req: Request,
    @Query('amount') amount: number,
    @Query('base') base: string,
    @Query('target') target: string,
  ):
    Promise<IResponse<ExchangeRateAndConversionDtoOut>>
  {
    return await this.exchangeService.exchangeRateAndConversion(base,target,amount )
  }

  @Get( )
  async getClinics():
    // Promise<GetClinicsDtoOut>
    Promise<void>
  {
    // return await this.clinicService.getClinics()
  }

}

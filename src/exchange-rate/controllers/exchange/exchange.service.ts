import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import to from 'await-to-js'
import { AxiosRequestConfig } from 'axios'
import { DataSource, Repository } from 'typeorm'
import { AppLogger } from '../../../core/logger/logger.service'
import {  ExchangeRateAndConversionDtoOut,   } from "./exchange.dto";
import { ProviderApisService } from "../../../datasource/provider-apis/provider-apis.service";
import { IResponse } from "../../../core/global-dto/IResponse";
import { fiatCurrencies } from "../../../core/config/configuration";

@Injectable()
export class ExchangeService {
  constructor(
    // @InjectRepository(ClinicEntity) private clinicEntity: Repository<ClinicEntity>,

    private dataSource: DataSource,
    private readonly httpService: HttpService,
    private readonly logger: AppLogger,
    private readonly exchangeApisService: ProviderApisService,
  ) {
  }


  async exchangeRateAndConversion(base:string,target:string,amount:number): Promise<IResponse<ExchangeRateAndConversionDtoOut>>{
    if(base=="IRR" && target=="USD")
    {

    }
    else if(base=="USD" && this.isItAFiatCurrency(target) )
    {

    }
    else if((base=="EUR" && !this.isItAFiatCurrency(target) )||
      (!this.isItAFiatCurrency(base) && !this.isItAFiatCurrency(target)))
    {

    }
    else
    {
      return {
        status: 400,
        message: 'this conversion is invalid',
        result:null
      }
    }
    let conversionValue = await this.exchangeApisService.getExchangeRateFromProvider2('GBP','EUR')
      return {
      status: 200,
      message: 'your conversion-irr-to-usd',
      result: {  } as  ExchangeRateAndConversionDtoOut ,
    }

  }


  private isItAFiatCurrency(currency:string):boolean{
    return  fiatCurrencies.includes(currency);
  }

}

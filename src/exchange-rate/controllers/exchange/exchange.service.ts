import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import to from "await-to-js";
import { AxiosRequestConfig } from "axios";
import { AppLogger } from "../../../core/logger/logger.service";
import { ExchangeRateAndConversionDtoOut, ExchangeRateDtoIn } from "./exchange.dto";
import { ProviderApisService } from "../../../datasource/provider-apis/provider-apis.service";
import { IResponse } from "../../../core/global-dto/IResponse";
import { fiatCurrencies } from "../../../core/config/configuration";
import { ExchangeRateEntity } from "../../../typeorm/models/exchange_rate/exchange-rate.model";
import { DataSource, InsertResult, Repository, UpdateResult } from "typeorm";
import { ProviderDtoOut } from "../../../datasource/provider-apis/provider-apis.dto";
import { ExchangeProviderEntity } from "../../../typeorm/models/exchange_rate/exchange-providers.model";

@Injectable()
export class ExchangeService {
  constructor(
    @InjectRepository(ExchangeRateEntity) private exchangeRateEntity: Repository<ExchangeRateEntity>,
    private dataSource: DataSource,
    private readonly exchangeApisService: ProviderApisService
  ) {
  }

  // ************************************************************************************************************************************* */

  async allConversion(base: string, target: string, amount: number): Promise<IResponse<ExchangeRateAndConversionDtoOut>> {
    if ((base == "IRR" && target == "USD")  ||  (base == "USD" && target == "IRR")  ){
      return await this.conversionIrrToUsd(base, target, amount);
    } else if (
      (base != "IRR" && target != "IRR")&&
      (this.isItAFiatCurrency(base) && this.isItAFiatCurrency(target))
    )
    {
      return await this.conversionUsdToAnyOtherFiatCurrenciesOrBetweenFiatCurrencies(base, target, amount);
    }
    else if ((base == "EUR" && !this.isItAFiatCurrency(target)) ||
      (!this.isItAFiatCurrency(base) && !this.isItAFiatCurrency(target))) {
      return await this.conversionEurToAnyCryptocurrencyOrBetweenCryptocurrencies(base, target, amount);
    } else {
      throw new HttpException("not Support currency",
        HttpStatus.BAD_REQUEST);
    }

  }

  async conversionIrrToUsd(base: string, target: string,amount: number): Promise<IResponse<ExchangeRateAndConversionDtoOut>> {
    if ((base == "IRR" && target == "USD")  ||  (base == "USD" && target == "IRR")  ) {
      let exchangeRateData: ProviderDtoOut = await this.exchangeApisService.getExchangeRateFromProvider1(base, target);
      await this.insertExchangeRate(exchangeRateData);
      let result: ExchangeRateAndConversionDtoOut = {
        exchangeRate: exchangeRateData.exchangeRate,
        conversionValue: this.convertFromBase(amount, exchangeRateData.exchangeRate)
      };
      return {
        status: 200,
        message: `your conversion is ${base} To ${target}`,
        result
      };
    }
    else {
      throw new HttpException("not Support currency",
        HttpStatus.BAD_REQUEST);
    }
  }

  async conversionUsdToAnyOtherFiatCurrenciesOrBetweenFiatCurrencies(base: string, target: string, amount: number): Promise<IResponse<ExchangeRateAndConversionDtoOut>> {
    if (base == "USD" && this.isItAFiatCurrency(target)) {
      let exchangeRateData: ProviderDtoOut = await this.exchangeApisService.getExchangeRateFromProvider2(base, target);
      await this.insertExchangeRate(exchangeRateData);
      let result: ExchangeRateAndConversionDtoOut = {
        exchangeRate: exchangeRateData.exchangeRate,
        conversionValue: this.convertFromBase(amount, exchangeRateData.exchangeRate)
      };
      return {
        status: 200,
        message: `your conversion is ${base} To ${target}`,
        result
      };
    } else {
      throw new HttpException("not Support currency",
        HttpStatus.BAD_REQUEST);
    }
  }

  async conversionEurToAnyCryptocurrencyOrBetweenCryptocurrencies(base: string, target: string, amount: number): Promise<IResponse<ExchangeRateAndConversionDtoOut>> {

    let exchangeRateData = await this.exchangeApisService.getExchangeRateFromProvider2(base, target);
    await this.insertExchangeRate(exchangeRateData);
    let result: ExchangeRateAndConversionDtoOut = {
      exchangeRate: exchangeRateData.exchangeRate,
      conversionValue: this.convertFromBase(amount, exchangeRateData.exchangeRate)
    };
    return {
      status: 200,
      message: `your conversion is ${base} To ${target}`,
      result
    };

  }

  // ************************************************************************************************************************************* */

  private async getCurrenciesByBaseAndTarget(base: string,target:string): Promise<ExchangeRateEntity> {
    const [err, data] = await to(
      this.exchangeRateEntity
        .createQueryBuilder('ex')
        .where('ex.base=:base and ex.target=:target', )
        .orWhere('ex.base=:target and ex.target=:base', )
        .setParameters({ base: base,target:target})
        .select(['ex'])
        .getOne()
    )
    if (err) {
      console.log(err)
      throw new HttpException('error in fetch plan', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return data
  }

  private async insertExchangeRate(exchangeRateData: ExchangeRateDtoIn) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let [err, exchangeInsertData]: [Error, InsertResult | UpdateResult] = [null, null];
      [err, exchangeInsertData] = await to(queryRunner.manager.insert(ExchangeRateEntity, exchangeRateData));
      if (err) {
        throw err;
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      if (err.message.includes("invalid input syntax")) {
        throw new HttpException("incorrect fields values", HttpStatus.BAD_REQUEST);
      }
      throw new HttpException("error in db", HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }

  private convertFromBase(amount: number, rate: number): number {
    return amount * rate;
  }

  private isItAFiatCurrency(currency: string): boolean {
    return fiatCurrencies.includes(currency);
  }

}

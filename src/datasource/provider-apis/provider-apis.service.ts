import { HttpService } from "@nestjs/axios";
import to from "await-to-js";
import { DataSource, Repository } from "typeorm";
import { AppLogger } from "../../core/logger/logger.service";
import Currencyapi from "@everapi/currencyapi-js";
import { catchError, throwError } from "rxjs";
import { Injectable, HttpException, HttpStatus, OnModuleInit } from "@nestjs/common";
import axios from "axios";
import { InjectRepository } from "@nestjs/typeorm";
import { ExchangeRateEntity } from "../../typeorm/models/exchange_rate/exchange-rate.model";
import { ExchangeProviderEntity } from "../../typeorm/models/exchange_rate/exchange-providers.model";
import { ProviderDtoOut } from "./provider-apis.dto";

@Injectable()
export class ProviderApisService implements OnModuleInit {
  constructor(
    @InjectRepository(ExchangeProviderEntity)
    private readonly exchangeProviderRepository: Repository<ExchangeProviderEntity>,
    private readonly logger: AppLogger
  ) {
  }
  // ************************************************************************************************************************************* */

  async onModuleInit() {
    await this.addProvidersIfNotExists();
  }

  async getExchangeRateFromProvider1(base, target): Promise<ProviderDtoOut> {
    let returnData: ProviderDtoOut ;
    const apiKey = process.env.CURRENCY_API;
    const providerId = (await this.getProviderByName("CURRENCY_API")).id;
    const client = new Currencyapi(apiKey);
    const [err1, res] = await to(client.latest({
      base_currency: base,
      currencies: target
    }));
    if (err1) {
      this.logger.error(err1);
      throw new HttpException("Provider 1 failed to fetch exchange rates.",
        HttpStatus.SERVICE_UNAVAILABLE);
    }
    try {
      returnData = {
        timeLastUpdateRate: (res as any).meta.last_updated_at,
        exchangeRate: (res as any).data.USD.value,
        base: "IRR",
        target: "USD",
        providerId
      };
    } catch (err) {
      this.logger.error(err1);
      throw new HttpException(" failed to convert data from Provider 1",
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return returnData;
  }

  async getExchangeRateFromProvider2( base:string,target:string): Promise<ProviderDtoOut> {
    let returnData: ProviderDtoOut ;
    const provider  = await this.getProviderByName("FRANK_FURTER_ADDRESS");
    const providerId =provider.id;
    const address =provider.address;
    const params = {
      from: base,
      to: target
    };
    const [err1, res] = await to(axios.get(address, { params }));
     if (err1) {
      this.logger.error(err1);
      throw new HttpException("Provider 2 failed to fetch exchange rates.",
        HttpStatus.SERVICE_UNAVAILABLE);
    }
    try {
      returnData = {
        timeLastUpdateRate: (res as any).meta.last_updated_at,
        exchangeRate: (res as any).data.USD.value,
        base: "IRR",
        target: "USD",
        providerId
      };
    } catch (err) {
      this.logger.error(err1);
      throw new HttpException(" failed to convert data from Provider 1",
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // axios.get(address, { params })
    //   .then(response => {
    //     exchangeRate = response.data;
    //   })
    //   .catch(error => {
    //     console.error("Error:", error.message);
    //     throw new HttpException("Provider 2 failed to fetch exchange rates.",
    //       HttpStatus.INTERNAL_SERVER_ERROR);
    //   });
    return returnData;
  }

  async getExchangeRateFromProvider3(target: string, base): Promise<number> {
    let exchangeRate = 1;
    const apiKey = process.env.ABSTRACT_API;
    const provider  = await this.getProviderByName("ABSTRACT_API");
    const providerId =provider.id;
    const address =provider.address;
    const params = {
      api_key: apiKey,
      base: base,
      target: target
    };
    const [err1, res] = await to(axios.get(address, { params }));
    exchangeRate = res.data;

    if (err1) {
      this.logger.error(err1);
      throw new HttpException("Provider 3 failed to fetch exchange rates.",
        HttpStatus.SERVICE_UNAVAILABLE);
    }
    return exchangeRate;
  }

  // async getExchangeRateFromProvider4(target: string, base): Promise<number> {
  //   const apiKey = process.env.ABSTRACT_API;
  //   const address = process.env.ABSTRACT_API_ADDRESS;
  //   const params = {
  //     api_key: apiKey,
  //     base: base,
  //     target: target
  //   };
  //   axios.get(address, { params })
  //     .then(response => {
  //       const user = response.data;
  //
  //     })
  //     .catch(error => {
  //       console.error("Error:", error.message);
  //     });
  // }

  // ************************************************************************************************************************************* */

  private async getProviderByName(name: string): Promise<ExchangeProviderEntity> {
    const [err, provider] = await to(this.exchangeProviderRepository.findOneBy({ name }));
    if (err) {
      console.error(err);
      throw new HttpException("not found provider", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return provider;
  }

  private async addProvidersIfNotExists(): Promise<void> {
    const count = await this.exchangeProviderRepository.count();
    if (count === 0) {
      const currencies = [
        { name: "CURRENCY_API", address: "" },
        { name: "FRANK_FURTER_ADDRESS", address: "https://api.frankfurter.app/latest" },
        { name: "ABSTRACT_API", address: "https://exchange-rates.abstractapi.com/v1/convert" },
        { name: "EXCHANGE_RATE_API", address: "https://v6.exchangerate-api.com/v6/" }
      ];
      await this.exchangeProviderRepository.save(currencies);
    }
  }

}

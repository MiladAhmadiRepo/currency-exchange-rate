import { HttpService } from "@nestjs/axios";
import to from "await-to-js";
import { DataSource, Repository } from "typeorm";
import { AppLogger } from "../../core/logger/logger.service";
import currencyapi from "@everapi/currencyapi-js";
import { catchError, throwError } from "rxjs";
import { Injectable, HttpException, HttpStatus, OnModuleInit } from "@nestjs/common";
import axios from "axios";
import { InjectRepository } from "@nestjs/typeorm";
import { ExchangeRateEntity } from "../../typeorm/models/exchange_rate/exchange-rate.model";
import { ExchangeProviderEntity } from "../../typeorm/models/exchange_rate/exchange-providers.model";

@Injectable()
export class ProviderApisService implements OnModuleInit  {
  constructor(
    @InjectRepository(ExchangeProviderEntity)
    private readonly exchangeProviderRepository: Repository<ExchangeProviderEntity>,
    @InjectRepository(ExchangeRateEntity)
    private readonly exchangeRateRepository: Repository<ExchangeRateEntity>,
    private dataSource: DataSource,
    private readonly httpService: HttpService,
    private readonly logger: AppLogger
  ) {
  }
  async onModuleInit() {
    await this.addProvidersIfNotExists();
  }

  async getExchangeRateFromProvider1(): Promise<void> {
    const apiKey = process.env.CURRENCY_API;
    const client = new currencyapi(apiKey);
    const [err1, res] = await to(client.latest({
      base_currency: "IRR",
      currencies: "USD"
    }));
    if (err1) {
      this.logger.error(err1);
      throw new HttpException("Provider 1 failed to fetch exchange rates.",
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
    this.logger.error(res);

  }

  async getExchangeRateFromProvider2(symbol: string, base): Promise<number> {
    let exchangeRate=1;
    const address =await this. getProviderAddress(2);
    const params = {
      from: base,
      to: symbol
    };
    axios.get(address, { params })
      .then(response => {
        exchangeRate = response.data;
      })
      .catch(error => {
        console.error("Error:", error.message);
        throw new HttpException("Provider 2 failed to fetch exchange rates.",
          HttpStatus.INTERNAL_SERVER_ERROR);
      });
    return  exchangeRate;
  }

  async getExchangeRateFromProvider3(target: string, base): Promise<void> {
    const apiKey = process.env.ABSTRACT_API;
    const address =await this. getProviderAddress(3);
    const params = {
      api_key: apiKey,
      base: base,
      target: target
    };
    axios.get(address, { params })
      .then(response => {
        const user = response.data;

      })
      .catch(error => {
        console.error("Error:", error.message);
      });

  }

  async getExchangeRateFromProvider4(target: string, base): Promise<number> {
    const apiKey = process.env.ABSTRACT_API;
    const address = process.env.ABSTRACT_API_ADDRESS;
    const params = {
      api_key: apiKey,
      base: base,
      target: target
    };
    axios.get(address, { params })
      .then(response => {
        const user = response.data;

      })
      .catch(error => {
        console.error("Error:", error.message);
      });
    return  12;
  }

  private async getProviderAddress(id:number): Promise<string> {
    const [errAddress, address] = await to(this.exchangeProviderRepository.findOneBy({ id }))
    if (errAddress) {
      console.error(errAddress)
      throw new HttpException('not found provider', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return address.address
  }

  private convertFromBase(amount: number, rate: number): number {
    // if (!this.rates[toCurrency]) {
    //   throw new Error(/`Unsupported currency: ${toCurrency}`);
    // }
    return amount * rate;
  }

  private async addProvidersIfNotExists(): Promise<void> {
    const count = await this.exchangeProviderRepository.count();
    if (count === 0) {
      const currencies = [
        { name: "CURRENCY API", address: "" },
        { name: "FRANK FURTER ADDRESS", address: "https://api.frankfurter.app/latest" },
        { name: "ABSTRACT API", address: "https://exchange-rates.abstractapi.com/v1/convert" },
        { name: "EXCHANGE RATE API", address: "https://v6.exchangerate-api.com/v6/" },
      ];
      await this.exchangeProviderRepository.save(currencies);
    }
  }

}

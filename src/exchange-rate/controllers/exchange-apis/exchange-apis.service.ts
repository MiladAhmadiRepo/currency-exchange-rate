import { HttpService } from "@nestjs/axios";
import to from "await-to-js";
import { DataSource, Repository } from "typeorm";
import { AppLogger } from "../../../core/logger/logger.service";
import currencyapi from "@everapi/currencyapi-js";
import { catchError, throwError } from "rxjs";
import { Injectable, HttpException, HttpStatus, OnModuleInit } from "@nestjs/common";
import axios from "axios";
import { InjectRepository } from "@nestjs/typeorm";
import { ExchangeCurrencyEntity } from "../../../typeorm/models/exchange_rate/exchange_currencies.model";
import { ExchangeRateEntity } from "../../../typeorm/models/exchange_rate/exchange_rate.model";

@Injectable()
export class ExchangeApisService implements OnModuleInit {
  constructor(
    @InjectRepository(ExchangeCurrencyEntity)
    private readonly exchangeCurrencyRepository: Repository<ExchangeCurrencyEntity>,
    @InjectRepository(ExchangeRateEntity)
    private readonly exchangeRateRepository: Repository<ExchangeRateEntity>,
    private dataSource: DataSource,
    private readonly httpService: HttpService,
    private readonly logger: AppLogger
  ) {
  }

  async onModuleInit() {
    await this.addCurrenciesIfNotExists();
  }


  async getCurrency(): Promise<void> {
    const apiKey = process.env.CURRENCY_API;

    const client = new currencyapi(apiKey);
    const [err1, res] = await to(client.latest({
      base_currency: "USD",
      currencies: "EUR"
    }));
    if (err1) {
      this.logger.error(err1);
      throw new HttpException("Provider 2 failed to fetch exchange rates.",
        HttpStatus.BAD_REQUEST);
    }
    this.logger.error(res);
    // return {
    //   message: 'success',
    //   count: 0,
    //   results: "res"
    // }
  }

  async getRateFromProvider1(symbol: string, base): Promise<void> {
    // const apiKey = process.env.CURRENCY_BEACON
    const address = process.env.FRANK_FURTER_ADDRESS;
    const params = {
      from: base,
      to: symbol
    };
    axios.get(address, { params })
      .then(response => {
        const user = response.data;

      })
      .catch(error => {
        console.error("Error:", error.message);
      });

  }

  async getRateFromProvider2(target: string, base): Promise<void> {
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

  }

  async getRateFromProvider3(target: string, base): Promise<void> {
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

  }


  private async addCurrenciesIfNotExists(): Promise<void> {
    const count = await this.exchangeCurrencyRepository.count();
    if (count === 0) {
      const currencies = [
        { code: "ARS", name: "Argentine Peso" },
        { code: "AUD", name: "Australian Dollar" },
        { code: "BCH", name: "Bitcoin Cash" },
        { code: "BGN", name: "Bulgarian Lev" },
        { code: "BNB", name: "Binance Coin" },
        { code: "BRL", name: "Brazilian Real" },
        { code: "BTC", name: "Bitcoin" },
        { code: "CAD", name: "Canadian Dollar" },
        { code: "CHF", name: "Swiss Franc" },
        { code: "CNY", name: "Chinese Yuan" },
        { code: "CYP", name: "Cypriot Pound" },
        { code: "CZK", name: "Czech Republic Koruna" },
        { code: "DKK", name: "Danish Krone" },
        { code: "DOGE", name: "Dogecoin" },
        { code: "DZD", name: "Algerian Dinar" },
        { code: "EEK", name: "Estonian Kroon" },
        { code: "ETH", name: "Ethereum" },
        { code: "EUR", name: "Euro" },
        { code: "GBP", name: "British Pound Sterling" },
        { code: "GRD", name: "Greek Drachma" },
        { code: "HKD", name: "Hong Kong Dollar" },
        { code: "HRK", name: "Croatian Kuna" },
        { code: "HUF", name: "Hungarian Forint" },
        { code: "IDR", name: "Indonesian Rupiah" },
        { code: "ILS", name: "Israeli New Sheqel" },
        { code: "INR", name: "Indian Rupee" },
        { code: "ISK", name: "Icelandic Króna" },
        { code: "JPY", name: "Japanese Yen" },
        { code: "KRW", name: "South Korean Won" },
        { code: "LTC", name: "Litecoin" },
        { code: "LTL", name: "Lithuanian Litas" },
        { code: "LVL", name: "Latvian Lats" },
        { code: "MAD", name: "Moroccan Dirham" },
        { code: "MTL", name: "Maltese Lira" },
        { code: "MXN", name: "Mexican Peso" },
        { code: "MYR", name: "Malaysian Ringgit" },
        { code: "NOK", name: "Norwegian Krone" },
        { code: "NZD", name: "New Zealand Dollar" },
        { code: "PHP", name: "Philippine Peso" },
        { code: "PLN", name: "Polish Zloty" },
        { code: "RON", name: "Romanian Leu" },
        { code: "RUB", name: "Russian Ruble" },
        { code: "SEK", name: "Swedish Krona" },
        { code: "SGD", name: "Singapore Dollar" },
        { code: "SIT", name: "Slovenian Tolar" },
        { code: "SKK", name: "Slovak Koruna" },
        { code: "THB", name: "Thai Baht" },
        { code: "TRY", name: "Turkish Lira" },
        { code: "TWD", name: "New Taiwan Dollar" },
        { code: "USD", name: "United States Dollar" },
        { code: "XRP", name: "Ripple" },
        { code: "ZAR", name: "South African Rand" }
      ];
      await this.exchangeCurrencyRepository.save(currencies);
    }
  }

  private convertFromBase(amount: number, rate: number): number {
    // if (!this.rates[toCurrency]) {
    //   throw new Error(/`Unsupported currency: ${toCurrency}`);
    // }
    return amount * rate;
  }

}

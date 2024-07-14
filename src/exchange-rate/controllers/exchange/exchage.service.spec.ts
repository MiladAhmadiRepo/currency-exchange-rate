import * as path from 'path'
import { ConfigService } from "@nestjs/config";
import { ExchangeController } from "./exchange.controller";
import { ExchangeService } from "./exchange.service";
import { Test,TestingModule } from "@nestjs/testing";
import { Column, JoinColumn, ManyToOne, Repository } from "typeorm";
import { ExchangeProviderEntity } from "../../../typeorm/models/exchange_rate/exchange-providers.model";
import { ExchangeRateEntity } from "../../../typeorm/models/exchange_rate/exchange-rate.model";
import { BaseEntity } from "../../../typeorm/models/base/base.model";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, QueryRunner } from 'typeorm';
import { ProviderApisService } from "../../../datasource/provider-apis/provider-apis.service";
import { ConversionValueDtoOut } from "./exchange.dto";
import { ProviderDtoOut } from "../../../datasource/provider-apis/provider-apis.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";


// Mock the CurrencyAPI module
jest.mock('@everapi/currencyapi-js', () => {
  return jest.fn().mockImplementation(() => {});
});

describe('ExchangeService', () => {
  let currenciesByBaseAndTargetMock: DataSource;
  let dataSourceMock: DataSource;
  let queryRunnerMock: QueryRunner;
  let providerApisServiceMock: ProviderApisService;
  let serviceExchange: ExchangeService;
  let entityBase: Repository<BaseEntity>;
  let entityExchangeProvider: Repository<ExchangeProviderEntity>;
  let entityExchangeRate: Repository<ExchangeRateEntity>;

  beforeEach(async () => {
    queryRunnerMock = {
      connect: jest.fn(),
      release: jest.fn(),
      // Mock other QueryRunner methods if needed
    } as unknown as QueryRunner;
    //--------------------------------------------------------------------------
    dataSourceMock = {
      createQueryRunner: jest.fn().mockReturnValue(queryRunnerMock),
    } as unknown as DataSource;
    //--------------------------------------------------------------------------
    providerApisServiceMock = {
      getExchangeRateFromProvider1: jest.fn(),
      getExchangeRateFromProvider2: jest.fn(),
      getExchangeRateFromProvider3: jest.fn(),
      getProviderByName: jest.fn(),
      addProvidersIfNotExists: jest.fn(),
    } as unknown as ProviderApisService;
    //--------------------------------------------------------------------------

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([BaseEntity, ExchangeProviderEntity, ExchangeRateEntity]),
      ],
      providers: [ExchangeService,
        { provide: DataSource, useValue: dataSourceMock },
        { provide: ProviderApisService, useValue: providerApisServiceMock },
      ],
    })
      .overrideProvider(getRepositoryToken(BaseEntity))
      .useValue({
        find: jest.fn(),
        // Add other mock methods as needed
      })
      .overrideProvider(getRepositoryToken(ExchangeProviderEntity))
      .useValue({
        find: jest.fn(),
        // Add other mock methods as needed
      })
      .overrideProvider(getRepositoryToken(ExchangeRateEntity))
      .useValue({
        find: jest.fn(),
        // Add other mock methods as needed
      })
      .compile();


    serviceExchange = module.get<ExchangeService>(ExchangeService);
    entityBase = module.get<Repository<BaseEntity>>(getRepositoryToken(BaseEntity));
    entityExchangeProvider = module.get<Repository<ExchangeProviderEntity>>(getRepositoryToken(ExchangeProviderEntity));
    entityExchangeRate = module.get<Repository<ExchangeRateEntity>>(getRepositoryToken(ExchangeRateEntity));
  });
  //
  it('should be defined', () => {
    expect(serviceExchange).toBeDefined();
  });

  it('should return a IRR conversion  ', async () => {

    const extractOrSaveExchangeRateDataMock = jest.spyOn<any, any>(serviceExchange, 'extractOrSaveExchangeRateData').mockResolvedValueOnce(
      {
      timeLastUpdateRate:new Date(),
      exchangeRate: 0.000024,
      base: "IRR",
      target:  "USD",
      providerId: 1
    } as ProviderDtoOut
    );

    const extractOrSaveExchangeRateDataMock2 = jest.spyOn<any, any>(serviceExchange, 'extractOrSaveExchangeRateData').mockResolvedValueOnce(
      {
      timeLastUpdateRate:new Date(),
      exchangeRate: 1.09,
      base: "EUR",
      target:  "USD",
      providerId: 1
    } as ProviderDtoOut
    );


    // (serviceExchange, 'extractOrSaveExchangeRateData').mockImplementation(
    //   (base: string,
    //    target:string,
    //    callbackProvider: (base: string, target: string) => Promise<ProviderDtoOut>
    //   ) =>
    //   {
    //   if (base === "IRR"&& target=="USD") {
    //     return  0.000024;
    //   } else if (base === "EUR"&& target=="USD")  {
    //     return 1.09;
    //   }
    // });
    const result = serviceExchange.conversionFiatCurrencies("IRR", "EUR",5);
    expect(result).toBeInstanceOf(Promise<ConversionValueDtoOut >);
  });


});

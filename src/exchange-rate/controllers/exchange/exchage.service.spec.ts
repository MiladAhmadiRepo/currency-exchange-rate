import * as path from 'path'
import { ConfigService } from "@nestjs/config";
import { ExchangeController } from "./exchange.controller";
import { ExchangeService } from "./exchange.service";
import { Test,TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { ExchangeProviderEntity } from "../../../typeorm/models/exchange_rate/exchange-providers.model";
import { ExchangeRateEntity } from "../../../typeorm/models/exchange_rate/exchange-rate.model";
import { BaseEntity } from "../../../typeorm/models/base/base.model";
import { getRepositoryToken } from "@nestjs/typeorm";

const title: any = path.dirname(__dirname)

describe('ExchangeService', () => {
  let serviceExchange: ExchangeService;
  let entityBase: Repository<BaseEntity>;
  let entityExchangeProvider: Repository<ExchangeProviderEntity>;
  let entityExchangeRate: Repository<ExchangeRateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        {
          provide: getRepositoryToken(BaseEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ExchangeProviderEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ExchangeRateEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    serviceExchange = module.get<ExchangeService>(ExchangeService);
    entityBase = module.get<Repository<BaseEntity>>(getRepositoryToken(BaseEntity));
    entityExchangeProvider = module.get<Repository<ExchangeProviderEntity>>(getRepositoryToken(ExchangeProviderEntity));
    entityExchangeRate = module.get<Repository<ExchangeRateEntity>>(getRepositoryToken(ExchangeRateEntity));
  });

  it('should be defined', () => {
    expect(serviceExchange).toBeDefined();
  });

  it('should return a Provider', async () => {
    const users = [{ id: 1, name: 'John Doe' }];
    jest.spyOn(entityExchangeProvider, 'find').mockResolvedValueOnce(users);
    jest.spyOn(entityExchangeProvider, 'find').mockResolvedValueOnce(users);

    expect(await serviceExchange.findAll()).toBe(users);
  });
});

import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, MaxLength } from 'class-validator'
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from '../base/base.model'
import { ExchangeRateEntity } from "./exchange_rate.model";

@Entity({
  name: 'exchangeRate'
})
export class ExchangeCurrencyEntity  {

  @OneToMany(() => ExchangeRateEntity, (exchangeRateEntity) => exchangeRateEntity.baseCode, { lazy: true })
  exchangeRateBase: ExchangeRateEntity[]

  @OneToMany(() => ExchangeRateEntity, (exchangeRateEntity) => exchangeRateEntity.targetCode, { lazy: true })
  exchangeRateTarget: ExchangeRateEntity[]
  // ***************************************************************** */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

}

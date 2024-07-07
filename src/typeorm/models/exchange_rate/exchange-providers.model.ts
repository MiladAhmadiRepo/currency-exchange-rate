import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, MaxLength } from 'class-validator'
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from '../base/base.model'
import { ExchangeRateEntity } from "./exchange-rate.model";

@Entity({
  name: 'exchange-provider'
})
export class ExchangeProviderEntity  {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 200, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @MaxLength(200, { message: 'address should be less than 200 characters' })
  address: string;

  // ***************************************************************** */

  @OneToMany(() => ExchangeRateEntity, (exchangeRateEntity) => exchangeRateEntity.provider, { lazy: true })
  provider : ExchangeRateEntity[]

}

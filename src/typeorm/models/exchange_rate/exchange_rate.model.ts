import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, MaxLength } from 'class-validator'
import { Column, Entity, ManyToOne, OneToOne,JoinColumn,OneToMany } from 'typeorm'
import { BaseEntity } from '../base/base.model'
import {  ExchangeCurrencyEntity } from "./exchange_currencies.model";

@Entity({
  name: 'exchangeRate'
})
export class ExchangeRateEntity extends BaseEntity {

  @ManyToOne(() => ExchangeCurrencyEntity, (exchangeCurrencyEntity) => exchangeCurrencyEntity.exchangeRateBase, {
    lazy: true,
    nullable: false
  })
  @JoinColumn()
  baseCode: Promise<ExchangeCurrencyEntity>
  @Column({type:'bigint',nullable:false})
  baseCodeId: number;

  @ManyToOne(() => ExchangeCurrencyEntity, (exchangeCurrencyEntity) => exchangeCurrencyEntity.exchangeRateTarget, {
    lazy: true,
    nullable: false
  })
  @JoinColumn()
  targetCode: Promise<ExchangeCurrencyEntity>
  @Column({type:'bigint',nullable:false})
  targetCodeId: number;
  // ***************************************************************** */

  @IsOptional()
  @Column({ type: 'date',   nullable: true })
  timeLastUpdateRate: Date

  // @Column({ type: 'varchar', length: 100, nullable: true })
  // @MaxLength(100, { message: 'Name should be less than 100 characters' })
  // baseCode: string

  // @Column({ length: 100, unique: true })
  // @MaxLength(100, { message: 'UserName should be less than 100 characters' })
  // targetCode: string

  @Column({ type: 'decimal', length: 255, nullable: true })
  conversionRate: number


}

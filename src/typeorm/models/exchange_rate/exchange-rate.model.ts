import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, MaxLength } from 'class-validator'
import { Column, Entity, ManyToOne, OneToOne,JoinColumn,OneToMany } from 'typeorm'
import { BaseEntity } from '../base/base.model'
import { ExchangeProviderEntity } from "./exchange-providers.model";

@Entity({
  name: 'exchange-rate'
})
export class ExchangeRateEntity extends BaseEntity {

  @IsOptional()
  @Column({ type: 'date',   nullable: true })
  timeLastUpdateRate: Date

  @Column({ type: 'decimal',  nullable: false })
  conversionRate: number

  @Column({ type: 'varchar', length: 100, nullable: true })
  baseCode: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  targetCode: string;

  // ***************************************************************** */
  @ManyToOne(() => ExchangeProviderEntity, (exchangeProviderEntity) => exchangeProviderEntity.provider , {
    lazy: true,
    nullable: false
  })
  @JoinColumn()
  provider : Promise<ExchangeProviderEntity>
  @Column({type:'bigint',nullable:false})
  providerId: number;

}

import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, DeleteDateColumn, Index, PrimaryGeneratedColumn } from 'typeorm'

export class BaseEntity {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('increment')
  id: number

  @Index()
  @ApiProperty({ required: false })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  insertedAt: Date

  @ApiProperty({ required: false })
  @DeleteDateColumn()
  deletedAt?: Date

}

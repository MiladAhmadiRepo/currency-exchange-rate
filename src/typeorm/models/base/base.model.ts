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

  @ApiProperty({ required: false })
  @Column({
    nullable: true
  })
  modifiedAt: Date

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  modifiedBy?: number

  @ApiProperty({ required: false })
  @Column({
    nullable: true
  })
  lockedAt: Date

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  lockedBy: number
}

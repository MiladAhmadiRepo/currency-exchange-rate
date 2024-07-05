import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, MaxLength } from 'class-validator'
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm'
import { BaseEntity } from '../base/base.model'

@Entity({
  name: 'user_base'
})
export class UserBaseEntity extends BaseEntity {


  // ***************************************************************** */

  @ApiProperty()
  @IsOptional()
  @Column({ type: 'varchar', length: 100, nullable: true })
  @MaxLength(100, { message: 'Name should be less than 100 characters' })
  firstname: string

  @ApiProperty()
  @IsOptional()
  @Column({ type: 'varchar', length: 100, nullable: true })
  @MaxLength(100, { message: 'Name should be less than 100 characters' })
  lastname: string

  @ApiProperty()
  @Column({ length: 100, unique: true })
  @MaxLength(100, { message: 'UserName should be less than 100 characters' })
  username: string

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string

  @ApiProperty()
  @Column({ type: 'timestamp', nullable: true })
  activeAt: Date

  @ApiProperty()
  @Column({ type: 'varchar', length: 200, nullable: true, unique: true })
  email: string

  @ApiProperty()
  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber: string
}

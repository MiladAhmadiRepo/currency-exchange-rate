import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from "../base/base.model";

export enum MethodType {
  Get = 'get',
  Post = 'post',
  Patch = 'patch',
  Put = 'put',
  Delete = 'delete'
}

@Entity({
  name: 'route'
})
export class RoutesEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'enum', nullable: false, enum: MethodType, enumName: 'MethodType' })
  @IsEnum(MethodType, { message: 'you should select a method_type.' })
  method: MethodType

  @ApiProperty()
  @Column({ type: 'varchar', length: 300, nullable: false })
  url: string
}

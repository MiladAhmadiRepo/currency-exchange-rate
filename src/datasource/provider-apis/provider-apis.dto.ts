import { ApiProperty } from '@nestjs/swagger'

export class ProviderDtoOut {
  @ApiProperty({required:false})
  timeLastUpdateRate: Date

  @ApiProperty()
  exchangeRate: number

  @ApiProperty()
  base: string

  @ApiProperty()
  target: string

  @ApiProperty()
  providerId: number
}


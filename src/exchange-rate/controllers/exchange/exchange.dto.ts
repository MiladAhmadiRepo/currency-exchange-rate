import { ApiProperty } from '@nestjs/swagger'

export class IrrToUsdDtoIn {
  @ApiProperty()
  amount: number

}

export class ExchangeRateAndConversionDtoOut {
  @ApiProperty()
  exchangeRate: number

  @ApiProperty()
  conversionValue: number

}

export class ExchangeRateDtoIn {
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

// export class ClinicEmbedding {
//   @ApiProperty()
//   key: string
//
//   @ApiProperty()
//   value: any
//
//   @ApiProperty({ isArray: true, type: 'decimal' })
//   vector: Array<number>
// }


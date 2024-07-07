import { ApiProperty } from '@nestjs/swagger'

export class ClinicDtoIn {
  @ApiProperty()
  clinicName: string

  @ApiProperty()
  licenseId: string

  @ApiProperty()
  logoUrl: string

  @ApiProperty()
  phoneNumber: string

  @ApiProperty()
  address: string

}

export class ClinicDtoOut {
  @ApiProperty()
  state: string
}
export class GetClinicsDtoOut {
  @ApiProperty()
  clinicId: number

  @ApiProperty()
  clinicName: string

}

export class ClinicEmbedding {
  @ApiProperty()
  key: string

  @ApiProperty()
  value: any

  @ApiProperty({ isArray: true, type: 'decimal' })
  vector: Array<number>
}

export class ClinicEmbeddingDtoIn {
  @ApiProperty({ isArray: true, type: () => ClinicEmbedding })
  items: Array<ClinicEmbedding>
}

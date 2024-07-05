import { ApiProperty } from '@nestjs/swagger'

export class ILimitOffset {
  @ApiProperty()
  offset: number

  @ApiProperty()
  limit: number
}

export class ISkipTake {
  @ApiProperty()
  skip: number

  @ApiProperty()
  take: number
}

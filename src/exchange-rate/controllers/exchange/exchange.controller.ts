import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiParam, ApiTags } from '@nestjs/swagger'
import { DataSource } from 'typeorm'
import { ClinicDtoIn, ClinicDtoOut, ClinicEmbeddingDtoIn, GetClinicsDtoOut } from './exchange.dto'
import { ExchangeService } from './exchange.service'


@ApiTags('exchange')
@Controller({
  path: 'exchange',
  version: '1'
})

export class ExchangeController {
  constructor(
    private readonly clinicService: ExchangeService,
    private dataSource: DataSource
  ) {}

  // ***************************************************************************** */
  @Post(  '/add-exchange-rate.module.ts')
  async addClinic(
    @Req() req: Request,
    @Body() body: ClinicDtoIn
  ):
    // Promise<ClinicDtoOut>
    Promise<void>
  {
    // return await this.clinicService.addClinic(req, body)
  }

  @Get( )
  async getClinics():
    // Promise<GetClinicsDtoOut>
    Promise<void>
  {
    // return await this.clinicService.getClinics()
  }

}

import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import to from 'await-to-js'
import { AxiosRequestConfig } from 'axios'
import { DataSource, Repository } from 'typeorm'
import { AppLogger } from '../../../core/logger/logger.service'
import { ClinicDtoIn, ClinicDtoOut, ClinicEmbeddingDtoIn, GetClinicsDtoOut } from './exchange.dto'

@Injectable()
export class ExchangeService {
  constructor(
    // @InjectRepository(ClinicEntity) private clinicEntity: Repository<ClinicEntity>,

    private dataSource: DataSource,
    private readonly httpService: HttpService,
    private readonly logger: AppLogger,
    private readonly config: ConfigService,
  ) {
  }


  // async getClinics(): Promise<IResponseAll<GetClinicsDtoOut>> {
  //   let clinicList = await this.getClinicList()
  //   let res = clinicList.map((item) => {
  //     return {
  //       clinicId: item.id,
  //       clinicName: item.clinicName
  //     } as GetClinicsDtoOut
  //   })
  //
  //   return {
  //     status: 200,
  //     message: 'success',
  //     count: res.length,
  //     results: res
  //   }
  // }
  // async addClinic(req: Request, body: ClinicDtoIn): Promise<IResponse<ClinicDtoOut>> {
  //   const [err1, res] = await to(
  //     this.clinicEntity.save({
  //       clinicName: body.clinicName,
  //       licenseId: body.licenseId,
  //       logoUrl: body.logoUrl,
  //       phoneNumber: body.phoneNumber,
  //       address: body.address,
  //       clinicType: ClinicType.CLINIC
  //     })
  //   )
  //   if (err1) {
  //     this.logger.error(err1)
  //     throw new HttpException(
  //       this.i18n.t('messages.ERROR_IN_DATABASE'),
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     )
  //   }
  //   return {
  //     status: 200,
  //     message: 'success',
  //     result: {
  //       state: 'success'
  //     }
  //   }
  // }


}

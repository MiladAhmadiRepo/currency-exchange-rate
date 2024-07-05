import configuration from '../config/configuration'
import { AppLogger } from '../logger/logger.service'

export const envUrl = `env/.env.${process.env.NODE_ENV || 'local'}`
export const configModuleOptions = {
  isGlobal: true,
  envFilePath: (() => {
    const logger = new AppLogger()
    logger.log('**************************' + process.env.NODE_ENV + '************************')
    return `env/.env.${process.env.NODE_ENV || 'local'}`
  })(),
  load: [configuration]
}

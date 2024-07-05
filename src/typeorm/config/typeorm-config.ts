import { config as dotenvConfig } from 'dotenv'
import { DataSourceOptions } from 'typeorm'
import { envUrl } from '../../core/constant/options'

dotenvConfig({ path: envUrl })
export const typeormConfig: DataSourceOptions | any = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  synchronize: false
}

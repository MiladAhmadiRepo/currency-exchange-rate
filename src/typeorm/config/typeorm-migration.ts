import { registerAs } from '@nestjs/config'
import { DataSource, DataSourceOptions } from 'typeorm'
// import { SnakeNamingStrategy } from '../services'
import { typeormConfig } from './typeorm-config'

const _typeormConfig = {
  ...typeormConfig,
  // namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/typeorm/models/**/*{.ts,.js}'],
  migrations: ['src/typeorm/migrations/*{.ts,.js}'],
}

export default registerAs('typeorm', () => _typeormConfig)
export const connectionSource = new DataSource(_typeormConfig as DataSourceOptions)

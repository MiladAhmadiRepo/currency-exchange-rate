import { Injectable, Scope } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { Client } from 'pg';

@Injectable({ scope: Scope.DEFAULT })
export class OrmConfigService implements TypeOrmOptionsFactory {
  constructor(private srv: ConfigService) {}
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const retVal = {
      type: 'postgres',
      host: this.srv.get('DATABASE_HOST'),
      port: this.srv.get('DATABASE_PORT'),
      username: this.srv.get('DATABASE_USER'),
      password: this.srv.get('DATABASE_PASSWORD'),
      database: this.srv.get('DATABASE_DB'),
      autoLoadEntities: true,
      synchronize: false,

    }
    await this.createDatabaseIfNotExists(retVal)
    return retVal as TypeOrmModuleOptions
  }

  private async createDatabaseIfNotExists(retVal) {
    const database = retVal.database;
    const client = new Client({
      host:retVal.host,
      port:retVal.port,
      user: retVal.username,
      password:retVal.password,
    });

    try {
      await client.connect();
      const res = await client.query(
        `SELECT 1 FROM pg_database WHERE datname = '${database}'`,
      );

      if (res.rowCount === 0) {
        await client.query(`CREATE DATABASE ${database}`);
        console.log(`Database ${database} created successfully`);
      } else {
        console.log(`Database ${database} already exists`);
      }
    } catch (error) {
      console.error('Error creating database', error);
    } finally {
      await client.end();
    }
  }
}

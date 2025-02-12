import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { CreateTables1739390843396 } from 'src/migrations/1739390843396-createTables';
import { CreateTrigger1739392301810 } from 'src/migrations/1739392301810-createTrigger';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  logging: configService.get<boolean>('DB_LOGGING'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [CreateTables1739390843396, CreateTrigger1739392301810],
});

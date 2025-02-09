import { Module } from '@nestjs/common';
import { RetraitsService } from './retraits.service';
import { RetraitsController } from './retraits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetraitEntity } from './retrait.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([RetraitEntity]), DatabaseModule],
  providers: [RetraitsService],
  controllers: [RetraitsController],
})
export class RetraitsModule {}

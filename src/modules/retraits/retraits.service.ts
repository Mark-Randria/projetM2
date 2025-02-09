import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRetrait } from './interfaces/retrait.interface';
import { RetraitEntity } from './retrait.entity';
import { Repository } from 'typeorm';
import { createRetraitDTO } from './dto/create-retrait.dto';

@Injectable()
export class RetraitsService {
  constructor(
    @InjectRepository(RetraitEntity)
    private readonly retraitRepository: Repository<RetraitEntity>,
  ) {}

  async createRetrait(retrait: createRetraitDTO): Promise<IRetrait> {
    return null;
  }
}

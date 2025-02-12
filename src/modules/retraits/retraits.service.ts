import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRetrait } from './interfaces/retrait.interface';
import { RetraitEntity } from './retrait.entity';
import { Repository } from 'typeorm';
import { CreateRetraitDTO } from './dto/create-retrait.dto';

@Injectable()
export class RetraitsService {
  constructor(
    @InjectRepository(RetraitEntity)
    private readonly retraitRepository: Repository<RetraitEntity>,
  ) {}

  async createRetrait(createRetraitDTO: CreateRetraitDTO): Promise<IRetrait> {
    const retrait = this.retraitRepository.create(createRetraitDTO);
    return await this.retraitRepository.save(retrait);
  }
}

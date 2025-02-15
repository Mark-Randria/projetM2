import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRetrait } from './interfaces/retrait.interface';
import { RetraitEntity } from './retrait.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateRetraitDTO } from './dto/create-retrait.dto';
import { UpdateRetraitDTO } from './dto/update-retrait.dto';

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

  async updateRetrait(
    numRetrait: number,
    numCompte: number,
    retrait: UpdateRetraitDTO,
  ): Promise<IRetrait> {
    const retraitToUpdate = await this.retraitRepository.findOne({
      where: { numRetrait },
      relations: ['client'],
    });

    if (!retraitToUpdate) {
      throw new NotFoundException('Retrait not found');
    }

    const { numCompte: numCompteOfClient } = retraitToUpdate.client;

    if (numCompteOfClient !== numCompte) {
      throw new NotFoundException(
        'You dont have the right to update this retrait',
      );
    }
    await this.retraitRepository.update(numRetrait, retrait);
    return await this.retraitRepository.findOne({ where: { numRetrait } });
  }

  async deleteRetrait(
    numRetrait: number,
    numCompte: number,
  ): Promise<DeleteResult> {
    const retraitToDelete = await this.retraitRepository.findOne({
      where: { numRetrait },
      relations: ['client'],
    });

    if (!retraitToDelete) {
      throw new NotFoundException('Retrait not found');
    }

    const { numCompte: numCompteOfClient } = retraitToDelete.client;

    if (numCompteOfClient !== numCompte) {
      throw new NotFoundException(
        'You dont have the right to delete this retrait',
      );
    }
    return await this.retraitRepository.delete(numRetrait);
  }

  async getAllRetraits(): Promise<IRetrait[]> {
    return await this.retraitRepository.find();
  }

  async getAllRetraitsByClient(numCompte: number): Promise<IRetrait[]> {
    return await this.retraitRepository.find({
      where: { client: { numCompte } },
    });
  }

  async getRetrait(numRetrait: number): Promise<IRetrait> {
    return await this.retraitRepository.findOne({ where: { numRetrait } });
  }

  async getRetraitByNumCheque(numCheque: string): Promise<IRetrait[]> {
    return await this.retraitRepository.find({ where: { numCheque } });
  }
}

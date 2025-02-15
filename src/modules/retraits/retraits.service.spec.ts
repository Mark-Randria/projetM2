import { Test, TestingModule } from '@nestjs/testing';
import { RetraitsService } from './retraits.service';
import { DeleteResult } from 'typeorm';
import { RetraitEntity } from './retrait.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateRetraitDTO } from './dto/create-retrait.dto';
import { UpdateRetraitDTO } from './dto/update-retrait.dto';
import { IRetrait } from './interfaces/retrait.interface';

// Create a mock repository factory that includes all methods used.
const mockRetraitRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
});

describe('RetraitsService', () => {
  let service: RetraitsService;
  let retraitRepository: ReturnType<typeof mockRetraitRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RetraitsService,
        {
          provide: getRepositoryToken(RetraitEntity),
          useFactory: mockRetraitRepository,
        },
      ],
    }).compile();

    service = module.get<RetraitsService>(RetraitsService);
    retraitRepository = module.get(getRepositoryToken(RetraitEntity));
  });

  describe('createRetrait', () => {
    it('should create and return a new retrait', async () => {
      const createRetraitDTO: CreateRetraitDTO = {
        numCheque: 'C001',
        numCompte: 1,
        montant: 1000,
      };
      const createdRetrait: IRetrait = { numRetrait: 1, ...createRetraitDTO };

      retraitRepository.create.mockReturnValue(createdRetrait);
      retraitRepository.save.mockResolvedValue(createdRetrait);

      const result = await service.createRetrait(createRetraitDTO);
      expect(retraitRepository.create).toHaveBeenCalledWith(createRetraitDTO);
      expect(retraitRepository.save).toHaveBeenCalledWith(createdRetrait);
      expect(result).toEqual(createdRetrait);
    });
  });

  describe('updateRetrait', () => {
    const numRetrait = 1;
    const validNumCompte = 123;
    const invalidNumCompte = 999;
    const updateData: UpdateRetraitDTO = { montant: 2000 };

    it('should update and return the retrait if client numCompte matches', async () => {
      // First call to findOne returns the current retrait.
      const retraitToUpdate: Partial<IRetrait> = {
        numRetrait,
        client: { numCompte: validNumCompte },
      };
      // Second call returns the updated retrait.
      const updatedRetrait: Partial<IRetrait> = {
        numRetrait,
        client: { numCompte: validNumCompte },
        ...updateData,
      };

      retraitRepository.findOne
        .mockResolvedValueOnce(retraitToUpdate) // initial retrieval with relations
        .mockResolvedValueOnce(updatedRetrait); // retrieval after update

      retraitRepository.update.mockResolvedValue(undefined); // update doesn't return a value

      const result = await service.updateRetrait(
        numRetrait,
        validNumCompte,
        updateData,
      );

      expect(retraitRepository.findOne).toHaveBeenNthCalledWith(1, {
        where: { numRetrait },
        relations: ['client'],
      });
      expect(retraitRepository.update).toHaveBeenCalledWith(
        numRetrait,
        updateData,
      );
      expect(retraitRepository.findOne).toHaveBeenNthCalledWith(2, {
        where: { numRetrait },
      });
      expect(result).toEqual(updatedRetrait);
    });

    it('should throw NotFoundException if client numCompte does not match', async () => {
      const retraitToUpdate: Partial<IRetrait> = {
        numRetrait,
        client: { numCompte: invalidNumCompte },
      };

      retraitRepository.findOne.mockResolvedValueOnce(retraitToUpdate);

      await expect(
        service.updateRetrait(numRetrait, validNumCompte, updateData),
      ).rejects.toThrow(NotFoundException);

      expect(retraitRepository.update).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException if retrait is not found', async () => {
      // Simulate the case where findOne returns null.
      retraitRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.updateRetrait(numRetrait, validNumCompte, updateData),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteRetrait', () => {
    const numRetrait = 1;
    const validNumCompte = 123;
    const invalidNumCompte = 999;

    it('should delete and return the delete result if client numCompte matches', async () => {
      const retraitToDelete: Partial<IRetrait> = {
        numRetrait,
        client: { numCompte: validNumCompte },
      };
      const deleteResult: DeleteResult = { affected: 1, raw: [] };

      retraitRepository.findOne.mockResolvedValueOnce(retraitToDelete);
      retraitRepository.delete.mockResolvedValueOnce(deleteResult);

      const result = await service.deleteRetrait(numRetrait, validNumCompte);

      expect(retraitRepository.findOne).toHaveBeenCalledWith({
        where: { numRetrait },
        relations: ['client'],
      });
      expect(retraitRepository.delete).toHaveBeenCalledWith(numRetrait);
      expect(result).toEqual(deleteResult);
    });

    it('should throw NotFoundException if client numCompte does not match', async () => {
      const retraitToDelete: Partial<IRetrait> = {
        numRetrait,
        client: { numCompte: invalidNumCompte },
      };

      retraitRepository.findOne.mockResolvedValueOnce(retraitToDelete);

      await expect(
        service.deleteRetrait(numRetrait, validNumCompte),
      ).rejects.toThrow(NotFoundException);
      expect(retraitRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException if retrait is not found', async () => {
      retraitRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.deleteRetrait(numRetrait, validNumCompte),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAllRetraits', () => {
    it('should return an array of retraits', async () => {
      const retraits: IRetrait[] = [
        { numRetrait: 1, montant: 3000, numCheque: 'C001' },
        { numRetrait: 2, montant: 6000, numCheque: 'C002' },
      ];
      retraitRepository.find.mockResolvedValueOnce(retraits);

      const result = await service.getAllRetraits();
      expect(retraitRepository.find).toHaveBeenCalled();
      expect(result).toEqual(retraits);
    });
  });

  describe('getAllRetraitsByClient', () => {
    it('should return an array of retraits for the given client', async () => {
      const numCompte = 123;
      const retraits: IRetrait[] = [
        {
          numRetrait: 1,
          montant: 3000,
          numCheque: 'C001',
          client: { numCompte },
        },
      ];
      retraitRepository.find.mockResolvedValueOnce(retraits);

      const result = await service.getAllRetraitsByClient(numCompte);
      expect(retraitRepository.find).toHaveBeenCalledWith({
        where: { client: { numCompte } },
      });
      expect(result).toEqual(retraits);
    });
  });

  describe('getRetrait', () => {
    it('should return a retrait for the given numRetrait', async () => {
      const numRetrait = 1;
      const retrait: Partial<IRetrait> = { numRetrait };
      retraitRepository.findOne.mockResolvedValueOnce(retrait);

      const result = await service.getRetrait(numRetrait);
      expect(retraitRepository.findOne).toHaveBeenCalledWith({
        where: { numRetrait },
      });
      expect(result).toEqual(retrait);
    });
  });

  describe('getRetraitByNumCheque', () => {
    it('should return an array of retraits for the given numCheque', async () => {
      const numCheque = 'C001';
      const retraits: IRetrait[] = [
        {
          numRetrait: 1,
          numCheque,
          montant: 1000,
          client: { numCompte: 123 },
        },
      ];
      retraitRepository.find.mockResolvedValueOnce(retraits);

      const result = await service.getRetraitByNumCheque(numCheque);
      expect(retraitRepository.find).toHaveBeenCalledWith({
        where: { numCheque },
      });
      expect(result).toEqual(retraits);
    });
  });
});

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RetraitsService } from './retraits.service';
import { CreateRetraitDTO } from './dto/create-retrait.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { UpdateRetraitDTO } from './dto/update-retrait.dto';

@UseGuards(JwtAuthGuard)
@Controller('retraits')
export class RetraitsController {
  constructor(private readonly retraitsService: RetraitsService) {}

  @Get()
  async getAllRetraits() {
    return await this.retraitsService.getAllRetraits();
  }

  @Get('client/:numCompte')
  async getAllRetraitsByClient(@Param('numCompte') numCompte: string) {
    return await this.retraitsService.getAllRetraitsByClient(+numCompte);
  }

  @Get('id/:numRetrait')
  async getRetrait(@Param('numRetrait') numRetrait: string) {
    const retrait = await this.retraitsService.getRetrait(+numRetrait);
    if (!retrait) {
      throw new NotFoundException('Retrait not found');
    }
    return retrait;
  }

  @Get('cheque/:numCheque')
  async getRetraitByNumCheque(@Param('numCheque') numCheque: string) {
    const retraits =
      await this.retraitsService.getRetraitByNumCheque(numCheque);
    if (!retraits || retraits.length === 0) {
      throw new NotFoundException(
        'No retrait found with the provided cheque number',
      );
    }
    return retraits;
  }

  @Post()
  async createRetrait(
    @Request() req,
    @Body() createRetraitDTO: CreateRetraitDTO,
  ) {
    const { numCompte } = req.user;
    const retrait = { client: numCompte, ...createRetraitDTO };
    return await this.retraitsService.createRetrait(retrait);
  }

  @Patch('id/:id')
  async updateRetrait(
    @Request() req,
    @Param('id') id: string,
    @Body() updateRetraitDTO: UpdateRetraitDTO,
  ) {
    const { numCompte } = req.user;
    return await this.retraitsService.updateRetrait(
      +id,
      +numCompte,
      updateRetraitDTO,
    );
  }

  @Delete('id/:id')
  async deleteRetrait(@Request() req, @Param('id') id: string) {
    const { numCompte } = req.user;
    return await this.retraitsService.deleteRetrait(+id, +numCompte);
  }
}

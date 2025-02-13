import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RetraitsService } from './retraits.service';
import { CreateRetraitDTO } from './dto/create-retrait.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { UpdateRetraitDTO } from './dto/update-retrait.dto';

@UseGuards(JwtAuthGuard)
@Controller('retraits')
export class RetraitsController {
  constructor(private retraitsService: RetraitsService) {}

  @Post()
  async createRetrait(
    @Request() req,
    @Body() createRetraitDTO: CreateRetraitDTO,
  ) {
    const { numCompte } = req.user;
    const retrait = { client: numCompte, ...createRetraitDTO };
    return await this.retraitsService.createRetrait(retrait);
  }

  @Patch(':id')
  async updateRetrait(
    @Request() req,
    @Param() params,
    @Body() updateRetraitDTO: UpdateRetraitDTO,
  ) {
    const { numCompte } = req.user;
    const { id } = params;
    return await this.retraitsService.updateRetrait(
      +id,
      +numCompte,
      updateRetraitDTO,
    );
  }

  @Delete(':id')
  async deleteRetrait(@Request() req, @Param() params) {
    const { numCompte } = req.user;
    const { id } = params;
    return await this.retraitsService.deleteRetrait(+id, +numCompte);
  }
}

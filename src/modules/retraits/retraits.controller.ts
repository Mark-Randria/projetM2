import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { RetraitsService } from './retraits.service';
import { CreateRetraitDTO } from './dto/create-retrait.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';

@Controller('retraits')
export class RetraitsController {
  constructor(private retraitsService: RetraitsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRetrait(
    @Request() req,
    @Body() createRetraitDTO: CreateRetraitDTO,
  ) {
    const { numCompte } = req.user;
    const retrait = { client: numCompte, ...createRetraitDTO };
    return await this.retraitsService.createRetrait(retrait);
  }
}

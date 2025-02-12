import { Body, Controller, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDTO } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post('sign-in')
  async createClient(@Body() createClientDTO: CreateClientDTO) {
    return await this.clientsService.createClient(createClientDTO);
  }
}

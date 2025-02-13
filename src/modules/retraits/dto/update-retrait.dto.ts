import { PartialType } from '@nestjs/swagger';
import { CreateRetraitDTO } from './create-retrait.dto';

export class UpdateRetraitDTO extends PartialType(CreateRetraitDTO) {}

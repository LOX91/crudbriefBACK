import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { AuthGuard } from '@nestjs/passport';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createProduitDto: CreateProduitDto,
    @GetUser() utilisateur: Utilisateur,
  ) {
    console.log(utilisateur);
    return this.produitService.create(createProduitDto);
  }

  @Get()
  findAll() {
    return this.produitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produitService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateProduitDto: UpdateProduitDto,
    @GetUser() utilisateur: Utilisateur,
  ) {
    console.log(utilisateur);
    return this.produitService.update(+id, updateProduitDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.produitService.remove(+id);
  }
}
// function GetUser(): (
//   target: ProduitController,
//   propertyKey: 'create',
//   parameterIndex: 1,
// ) => void {
//   throw new Error('Function not implemented.');

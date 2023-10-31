import { Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit) private produitRepository: Repository<Produit>,
  ) {}

  async create(createProduitDto: CreateProduitDto) {
    const produit = this.produitRepository.create(createProduitDto);
    const result = await this.produitRepository.save(produit);
    return result;
  }

  findAll() {
    return this.produitRepository.find();
  }

  findOne(id: number) {
    return this.produitRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateProduitDto: UpdateProduitDto) {
    await this.produitRepository.update(id, updateProduitDto);
    return this.findOne(id);
  }

  async remove(id_produit: number) {
    return this.produitRepository.delete(id_produit);

    // return { message: `LE PRODUIT ${produitToRemove.nom} est supprimé !` };
  }
}

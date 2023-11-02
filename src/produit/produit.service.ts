import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    const produit = await this.produitRepository.findOne({ where: { id: id } });
    if (!produit) {
      throw new NotFoundException(`Le produit avec l'id ${id} n'existe pas`);
    }
    return produit;
  }

  async update(id: number, updateProduitDto: UpdateProduitDto) {
    const produit = await this.findOne(id);
    const produitMisAJour = this.produitRepository.merge(
      produit,
      updateProduitDto,
    );

    const resultat = await this.produitRepository.save(produitMisAJour);
    return { message: 'Le produit a été modifié', data: resultat };
  }

  async remove(id_produit: number) {
    const produit = await this.findOne(id_produit);
    const produitSupprime = await this.produitRepository.remove(produit);
    return { message: 'Le produit a été supprimé', data: produitSupprime };
  }
}

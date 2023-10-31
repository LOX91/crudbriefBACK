import { Produit } from 'src/produit/entities/produit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categorie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @OneToMany(() => Produit, (produit) => produit.categorie)
  produit: Produit[];
}

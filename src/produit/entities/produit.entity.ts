import { Categorie } from 'src/categorie/entities/categorie.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prix: number;

  @Column()
  quantite: number;

  @Column()
  id_categorie: number;

  @ManyToOne(() => Categorie, (categorie) => categorie.produit)
  @JoinColumn({ name: 'id_categorie' })
  categorie: Categorie;
}

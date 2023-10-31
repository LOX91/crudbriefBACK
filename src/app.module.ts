import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProduitModule } from './produit/produit.module';
import { CategorieModule } from './categorie/categorie.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorie } from './categorie/entities/categorie.entity';
import { Produit } from './produit/entities/produit.entity';
import { Utilisateur } from './utilisateur/entities/utilisateur.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env`] }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Categorie, Produit, Utilisateur],
      synchronize: false,
    }),

    ProduitModule,
    CategorieModule,
    UtilisateurModule,
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

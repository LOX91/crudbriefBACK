import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { nom, prenom, email, mot_de_passe } = createAuthDto;

    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(mot_de_passe, salt);

    // création d'une entité utilisateur
    const utilisateur = this.utilisateurRepository.create({
      nom,
      prenom,
      email,

      mot_de_passe: hashedPassword,
    });

    try {
      // enregistrement de l'entité user
      const createdUtilisateur =
        await this.utilisateurRepository.save(utilisateur);
      delete createdUtilisateur.mot_de_passe;
      return createdUtilisateur;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(loginDto: LoginDto) {
    const { email, mot_de_passe } = loginDto;
    const utilisateur = await this.utilisateurRepository.findOneBy({ email });

    if (
      utilisateur &&
      (await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe))
    ) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, déso...',
      );
    }
  }
}

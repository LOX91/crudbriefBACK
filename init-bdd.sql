


create table utilisateur (

id SERIAL primary key,
nom VARCHAR(255) not null,
prenom VARCHAR(255) not null,
email VARCHAR(255) not null unique,
mot_de_passe VARCHAR(255) not null

);

create table categorie (
id SERIAL primary key,
nom VARCHAR(255) not null
);

create table produit ( 
id SERIAL primary key,
nom VARCHAR(255) not null,
prix INT not null,
quantite INT not null,
id_categorie INT not null,
foreign key (id_categorie) references categorie(id)


);



drop table utilisateur ;
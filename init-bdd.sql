create table utilisateur (

id SERIAL primary key,
nom VARCHAR(255) not null,
prenom VARCHAR(255) not null,
password char (60) not null

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
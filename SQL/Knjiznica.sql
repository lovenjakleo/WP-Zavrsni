﻿use master;
drop database if exists Knjiznica;
go
create database Knjiznica collate Croatian_CI_AS;
go
use Knjiznica;

---------------------------------------------------------------------------

create table knjiga (
	sifra int not null primary key identity (1,1),
    isbn nvarchar (50) not null ,
	naslov nvarchar (255) not null,
	autor nvarchar (100) not null,
	dostupne_kolicine int not null
);

create table clan(
	sifra int not null primary key identity (1,1),
	clan_id int not null,
	ime nvarchar (100) not null,
	adresa nvarchar (255) not null, 
	broj_clanske_iskaznice nvarchar(20) unique not null
);


create table posudba (
	sifra int not null primary key identity (1,1),
	posudba_id int not null,
	clan_id int not null,
	isbn int not null ,
	datum_posudbe date not null,
	datum_vracanja date not null,
	status_posudbe nvarchar (20) not null
);

alter table posudba add foreign key (clan_id) references clan (sifra);
alter table posudba add foreign key (isbn) references knjiga(sifra);


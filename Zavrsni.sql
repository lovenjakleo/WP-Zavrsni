create database Knjiznica collate Croatian_CI_AS;
go
use Knjiznica;

create table knjiga (
	sifra int not null primary key identity (1,1),
	isbn nvarchar (255) not null,
	naslov nvarchar (100) not null,
	autor nvarchar (100) not null,
	dostupne_kolicine int not null
);

create table clan (
	sifra int not null primary key identity (1,1),
	clan_id int not null,
	ime nvarchar (100) not null,
	adresa nvarchar (255) not null,
	broj_clanske_iskaznice nvarchar (20) unique not null
);

create table posudba (
	sifra int not null primary key identity (1,1),
	posudba_id int not null,
	clan_id int not null,
	isbn int not null,
	datum_posudbe date not null,
	datum_vracanja date not null,
	status_posudbe nvarchar (20) not null
);

alter table posudba add foreign key (clan_id) references clan (sifra);
alter table posudba add foreign key (isbn) references knjiga (sifra);


insert into knjiga (isbn, naslov, autor, dostupne_kolicine)
values 
('978-0-13-516630-3', 'Proljeæe u Parizu', 'Emily Brown', 5),
('978-1-234567-89-0', 'Tajanstveni svemir', 'Alexander Smith', 2),
('978-0-987654-32-1', 'Izgubljeni u vremenu', 'Sarah Johnson', 3),
('978-3-456789-12-3', 'Planine i oceani', 'Michael Davis', 8),
('978-2-345678-90-1', 'Snježna idila', 'Laura Wilson', 1);

insert into clan (clan_id, ime, adresa, broj_clanske_iskaznice)
values
(1, 'Mirko', 'Trg Ivana Gunduliæa 7, Zagreb', '123456'),
(2, 'Slavko', 'Ulica Franje Tuðmana 15, Split', '78901234'),
(3, 'Darko', 'Petra Preradoviæa 22, Osijek', 'LIB1001'),
(4, 'Žarko', 'Jurišiæeva 3, Rijeka', '20220023'),
(5, 'Marko', 'Augusta Cesarca 10, Zadar', '98765');

insert into posudba (posudba_id, clan_id, isbn, datum_posudbe, datum_vracanja, status_posudbe)
values
(1, 1, 2 , '2023-01-15', '2023-02-01', 'Vraæeno'),
(2, 2, 4 , '2023-02-13', '2023-02-21', 'Vraæeno'),
(3, 3, 5 , '2023-03-19', '2023-04-04', 'Posuðeno'),
(4, 4, 1 , '2023-06-05', '2023-07-01', 'Posuðeno'),
(5, 5, 3 , '2023-08-30', '2023-09-24', 'Vraæeno');

select * from posudba;
select * from knjiga;
select * from clan;


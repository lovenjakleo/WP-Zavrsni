create table knjiga(
	sifra int not null primary key identity (1,1),
	isbn varchar(255) not null,
	naslov varchar(100) not null,
	autor varchar(100) not null,
	dostupne_kolicine int not null
);

insert into knjiga (isbn, naslov, autor, dostupne_kolicine)
values 
('978-0-13-516630-3', 'Proljeæe u Parizu', 'Emily Brown', 5),
('978-1-234567-89-0', 'Tajanstveni svemir', 'Alexander Smith', 2),
('978-0-987654-32-1', 'Izgubljeni u vremenu', 'Sarah Johnson', 3),
('978-3-456789-12-3', 'Planine i oceani', 'Michael Davis', 8),
('978-2-345678-90-1', 'Snježna idila', 'Laura Wilson', 1);

select * from knjiga;
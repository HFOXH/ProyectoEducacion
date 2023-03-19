/*
- - - - - - Base de Datos - - - - - -
Este proyecto se realizó para la Prueba Técnica- .NET Web Developer
de la empresa Audisoft Consulting S.A.S para una vacante de
trabajo.

Desarrollado por: Santiago Cardenas
17/03/2023

*/

CREATE DATABASE Colegio;

USE Colegio;

-- - - - - - Creación de Tablas - - - - - 

CREATE TABLE Estudiante(
	Id INT NOT NULL PRIMARY KEY,
	Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Nota(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Nombre VARCHAR(100) NOT NULL,
	IdProfesor INT NOT NULL,
	IdEstudiante INT NOT NULL,
	Valor DECIMAL
);

CREATE TABLE Profesor(
	Id INT NOT NULL PRIMARY KEY,
	Nombre VARCHAR(100) NOT NULL
);

-- - - - - - FORÁNEAS - - - - - 

ALTER TABLE Nota ADD FOREIGN KEY (IdProfesor) REFERENCES Profesor(Id);
ALTER TABLE Nota ADD FOREIGN KEY (IdEstudiante) REFERENCES Estudiante(Id);

-- - - - - - - INSERCIÓN DE DATOS - - - - - -

INSERT INTO Estudiante VALUES(1000735692,'Santiago Cardenas');
INSERT INTO Estudiante VALUES(443640278, 'Isaac Odom');
INSERT INTO Estudiante VALUES(106092902, 'Kiara Thornton');
INSERT INTO Estudiante VALUES(528832704, 'Michael Mcmillan');
INSERT INTO Estudiante VALUES(159571667, 'Michael Sims');
INSERT INTO Estudiante VALUES(253246661, 'Christopher Hunter');

INSERT INTO Profesor VALUES(534275722, 'Stephanie Taylor');
INSERT INTO Profesor VALUES(181713757, 'Kyle Jones');
INSERT INTO Profesor VALUES(338517297, 'Donna Chavez');
INSERT INTO Profesor VALUES(646048117, 'Patricia Lara');
INSERT INTO Profesor VALUES(461695830, 'Kayla Stone');

INSERT INTO Nota VALUES('matematicas',534275722,1000735692,'5.0');
INSERT INTO Nota VALUES('espanol',181713757,443640278,'5.0');
INSERT INTO Nota VALUES('ingles',338517297,106092902,'5.0');
INSERT INTO Nota VALUES('biologia',646048117,159571667,'5.0');
INSERT INTO Nota VALUES('matematicas',534275722,106092902,'5.0');
INSERT INTO Nota VALUES('biologia',646048117,1000735692,'5.0');

-- - - - - - COMPROBACIÓN - - - - -

SELECT * FROM Profesor;
SELECT * FROM Estudiante;
SELECT * FROM Nota;

-- - - - - Recordatorio: Al eliminar estudiante o profesor, 
-- - - - - como son foraneas en Nota, tener cuidado! 
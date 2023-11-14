--Modelo para el body de postman
{
  "slug": 
  "category":
  "creator":
  "effect":
  "hand":
  "image":
  "incantation":
  "light":
  "name":
  "wiki"
}





use freedb_module4_exam;

CREATE TABLE `spells` (
  `idSpell` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `slug` varchar(60) NOT NULL,
  `category` varchar(60) NOT NULL,
  `creator` varchar(60) DEFAULT NULL,
  `effect` varchar(60) NOT NULL,
  `hand` varchar(60) DEFAULT NULL,
  `image` varchar(150) DEFAULT NULL,
  `incantation` varchar(60) DEFAULT NULL,
  `light` varchar(60) NOT NULL
);

ALTER TABLE `freedb_module4_exam`.`spells` 
ADD COLUMN `name` VARCHAR(60) NOT NULL AFTER `light`,
ADD COLUMN `wiki` VARCHAR(150) NULL DEFAULT NULL AFTER `name`;

-- Prueba 1 para introducir datos en la tabla

INSERT INTO `spells` (`slug`, `category`, `creator`, `effect`, `hand`, `image`,`incantation`, `light`, `name`,`wiki`) VALUES ("age-line","Charm",null,"Prevents people above or below a certain age from access to a target",  null,"https://static.wikia.nocookie.net/harrypotter/images/e/e5/Age_Line_surrounding_the_Goblet_of_Fire_PM.jpg", null, "Blue","Age Line","https://harrypotter.fandom.com/wiki/Age_Line");

-- Amplio VARCHAR porque habia sobrepasado los 60 caracteres

ALTER TABLE `freedb_module4_exam`.`spells` 
CHANGE COLUMN `effect` `effect` VARCHAR(150) NOT NULL ;

--Prueba 2 OK, se añaden las dos filas nuevas correctamente

INSERT INTO `spells` (`slug`, `category`, `creator`, `effect`, `hand`, `image`,`incantation`, `light`, `name`,`wiki`) VALUES ("alarte-ascendare","Charm",null,"Rockets target upward","Brandish wand","https://static.wikia.nocookie.net/harrypotter/images/c/c4/Alarte_Ascendare.gif","Alarte Ascendare(a-LAR-tay a-SEN-der-ay)","Red","Alarte Ascendare","https://harrypotter.fandom.com/wiki/Alarte_Ascendare");

INSERT INTO `spells` (`slug`, `category`, `creator`, `effect`, `hand`, `image`,`incantation`, `light`, `name`,`wiki`) VALUES ("amplifying-charm","Charm",null,"Loudens target","Direct at target","https://static.wikia.nocookie.net/harrypotter/images/2/29/Sonorous_GOF_Dumbledore_1.jpg","Sonorus(soh-NOHR-us)","None","Amplifying Charm","https://harrypotter.fandom.com/wiki/Amplifying_Charm");

SELECT * FROM spells;

-- Prueba 3 OK, actualizar un solo campo. Cambio creator = Null por creator = Unknown.

UPDATE spells 
SET slug ='amplifying-charm',
    category ='Charm',
    creator ='Unknown',
    effect ='Loudens target',
    hand ='Direct at target',
    image ='https://static.wikia.nocookie.net/harrypotter/images/2/29/Sonorous_GOF_Dumbledore_1.jpg', 
    incantation ='Sonorus(soh-NOHR-us)',
    light ='None',
    name ='Amplifying Charm',
    wiki ='https://harrypotter.fandom.com/wiki/Amplifying_Charm'
WHERE idSpell = 4;

-- Prueba 4 OK,  cambio varios campos por Test.

UPDATE spells 
SET slug ='Test',
    category ='Test',
    creator ='Unknown',
    effect ='test',
    hand ='Direct at target',
    image ='https://static.wikia.nocookie.net/harrypotter/images/2/29/Sonorous_GOF_Dumbledore_1.jpg', 
    incantation ='Sonorus(soh-NOHR-us)',
    light ='Test',
    name ='Amplifying Charm',
    wiki ='https://harrypotter.fandom.com/wiki/Amplifying_Charm'
WHERE idSpell = 4;




--------BONUS----------


CREATE TABLE `users`(
 `idUser`int NOT NULL AUTO_INCREMENT PRIMARY KEY,
 `email` VARCHAR(60) NOT NULL UNIQUE,
 `name` VARCHAR(60) NOT NULL,
 `password` VARCHAR(60) NOT NULL
);

SELECT * FROM users;

INSERT INTO users(`name`, `email`, `password`) VALUES ("Ysabel", "ysaval@gmail.com", "12345678")
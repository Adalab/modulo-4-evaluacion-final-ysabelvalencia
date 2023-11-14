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


INSERT INTO `spells` (`slug`, `category`, `creator`, `effect`, `hand`, `image`,`incantation`, `light`, `name`,`wiki`) VALUES ("age-line","Charm",null,"Prevents people above or below a certain age from access to a target",  null,"https://static.wikia.nocookie.net/harrypotter/images/e/e5/Age_Line_surrounding_the_Goblet_of_Fire_PM.jpg", null, "Blue","Age Line","https://harrypotter.fandom.com/wiki/Age_Line");

ALTER TABLE `freedb_module4_exam`.`spells` 
CHANGE COLUMN `effect` `effect` VARCHAR(150) NOT NULL ;

INSERT INTO `spells` (`slug`, `category`, `creator`, `effect`, `hand`, `image`,`incantation`, `light`, `name`,`wiki`) VALUES ("alarte-ascendare","Charm",null,"Rockets target upward","Brandish wand","https://static.wikia.nocookie.net/harrypotter/images/c/c4/Alarte_Ascendare.gif","Alarte Ascendare(a-LAR-tay a-SEN-der-ay)","Red","Alarte Ascendare","https://harrypotter.fandom.com/wiki/Alarte_Ascendare");

INSERT INTO `spells` (`slug`, `category`, `creator`, `effect`, `hand`, `image`,`incantation`, `light`, `name`,`wiki`) VALUES ("amplifying-charm","Charm",null,"Loudens target","Direct at target","https://static.wikia.nocookie.net/harrypotter/images/2/29/Sonorous_GOF_Dumbledore_1.jpg","Sonorus(soh-NOHR-us)","None","Amplifying Charm","https://harrypotter.fandom.com/wiki/Amplifying_Charm");

SELECT * FROM spells;

-- prueba actualizando un solo campo: creator = Null por creator = Unknown, OK

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

-- prueba cambiado varios campos por Test, OK

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

use freedb_module4_exam;

CREATE TABLE `spells` (
   `idSpell` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(60) NOT NULL,
  `category` varchar(60) NOT NULL,
  `effect` varchar(150) NOT NULL,
  `hand_movement` varchar(200) DEFAULT NULL,
  `image` varchar(150) DEFAULT NULL,
  `incantation` varchar(60) DEFAULT NULL,
  `light` varchar(60) NOT NULL,
  `wiki` varchar(150) DEFAULT NULL,
);

-- Introducir datos en la tabla

INSERT INTO `spells` (`name`,`category`, `effect`,`hand_movement`,`image`,`incantation`, `light`,`wiki`) VALUES ("Arania Exumai","Charm","Repelled spiders", "https://static.wikia.nocookie.net/harrypotter/images/9/9b/AraniaExumaiGesture.png/revision/latest?cb=20210128170908", "https://static.wikia.nocookie.net/harrypotter/images/3/3e/Arania_Exumai_HM_Spell_Icon.png","Arania Exumai(ah-RAHN-ee-a EX-oo-may)","Blue",   "https://harrypotter.fandom.com/wiki/Arania_Exumai");

INSERT INTO `spells` (`name`,`category`, `effect`,`hand_movement`,`image`,`incantation`, `light`,`wiki`) VALUES ("Ascension Charm", "Charm", "Lifted caster in air", "https://static.wikia.nocookie.net/harrypotter/images/7/78/Ascendio_wand_movement_HM.png/revision/latest?cb=20210914072559",  "https://static.wikia.nocookie.net/harrypotter/images/1/1b/NewtAscendio.gif", "Ascendio(ah-SEN-dee-oh)", "None or blue", "https://harrypotter.fandom.com/wiki/Ascendio");

INSERT INTO `spells` (`name`,`category`, `effect`,`hand_movement`,`image`,`incantation`, `light`,`wiki`) VALUES ("Animation Charm", "Charm", "Animated target", null, "https://static.wikia.nocookie.net/harrypotter/images/e/e5/Piertotum_Locomotor.gif", "Piertotum Locomotor(peer-TOH-tuhm loh-kuh-MOH-tor)", "None, or green", "https://harrypotter.fandom.com/wiki/Piertotum_Locomotor");

SELECT * FROM spells;

INSERT INTO `spells` (`name`,`category`, `effect`,`hand_movement`,`image`,`incantation`, `light`,`wiki`) VALUES ("test", "test","test","test","test","test","test","test");

SELECT * FROM spells;

UPDATE spells 
SET name ="testUpdate",
    category ="test",
    effect ="test",
    hand_movement = "testUpdate",
    image ="test",
    light ="test",
    wiki = "test"
WHERE idSpell = 9;

DELETE FROM `freedb_module4_exam`.`spells` WHERE (`idSpell` = '21');



--------BONUS----------
CREATE TABLE `users`(
 `idUser`int NOT NULL AUTO_INCREMENT PRIMARY KEY,
 `email` VARCHAR(60) NOT NULL UNIQUE,
 `name` VARCHAR(60) NOT NULL,
 `password` VARCHAR(60) NOT NULL
);

SELECT * FROM users;

INSERT INTO users(`name`, `email`, `password`) VALUES ("Ysabel", "ysaval@gmail.com", "12345678")

DELETE FROM `freedb_module4_exam`.`users` WHERE (`idUser` = '3');
DELETE FROM `freedb_module4_exam`.`users` WHERE (`idUser` = '5');
DELETE FROM `freedb_module4_exam`.`users` WHERE (`idUser` = '6');
DELETE FROM `freedb_module4_exam`.`users` WHERE (`idUser` = '9');
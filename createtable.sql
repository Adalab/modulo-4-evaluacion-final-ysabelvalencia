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
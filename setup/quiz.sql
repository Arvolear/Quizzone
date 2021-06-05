-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: quiz
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Animal_Quiz_Test`
--

DROP TABLE IF EXISTS `Animal_Quiz_Test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Animal_Quiz_Test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Animal_Quiz_Test`
--

LOCK TABLES `Animal_Quiz_Test` WRITE;
/*!40000 ALTER TABLE `Animal_Quiz_Test` DISABLE KEYS */;
INSERT INTO `Animal_Quiz_Test` VALUES (1,'Which animal changes wool 2 times a year?','Dog','Rabbit','Cat','Sheep',1),(2,'How many zoos are in the world?','800','700','600','500',1),(3,'How is chicken baby called?','Turkey','Egg','Chick','Rooster',2),(4,'Monkeys which are considered the closest relatives of human?','Macaque','Orangutan','Gorilla','Chimpanzee',1),(5,'Which animal predicts the future best of all?','Dog','Octopus','Marmot','Hamster',2),(6,'Which animal has blue blood?','Snake','Cancer','Crab','Lobster',1),(7,'How many families of deer exist that contain a modern species and live in the Tyumen region?','55','52','51','50',2),(8,'What animal can retract its claws?','Hamster','Dog','Ferret','Cat',1),(9,'What cats love to eat?','Chocolate','Fruits','Vegetables','Sour cream',1),(10,'Which animal does not have vocal cords?','Giraffe','Lion','Squirrel','Beaver',4),(11,'Which animal was first tamed by a human?','Elephant','Cat','Horse','Dog',1),(12,'How many legs do spiders have?','8','7','10','6',4),(13,'Do fish close their eyes when they sleep?','only one eye','No','Yes','Some types of fish',3),(14,'Which animal has teeth in its stomach?','Whale','Crab','Horse','Lizard',3),(15,'Which bird can fly backwards?','None','Hummingbird','Crane','Eagle',3),(16,'What breed of dog has a blue tongue?','Poodle','Chow-chow','Beagle','Pug',3),(17,'Which animal has a rectangular pupil?','Otter','Deer','Octopus','Owl',2),(18,'Which animal shows its child at the sight of danger?','Possum','Zebra','Beaver','Otter',1),(19,'Which animal does not get sick?','Panda','Giraffe','Shark','Badger',2),(20,'How long can snail sleep for?','3 months','3 years','A month','10 minutes',3),(21,'How many hearts does an octopus have?','6','4','1','3',1),(22,'What is a fear of spiders called?','Autophobia','Hydrophobia','Arachnophobia','Acrophobia',2),(23,'Which bird lays the largest egg?','Bird of paradise','Penguin','Ostrich','Parrot',2),(24,'What part of the body do snakes use to smell?','Tongue','Feet','Ears','Nose',4),(25,'How many teeth will sharks grow and lose in heir lifetime?','2','50 000','54','3 500',3),(26,'What color is skin of polar bear?','Dark blue','Grey','Black','White',2),(27,'Where would you find a prawn’s heart?','Bum','Head','Chest','Feet',3),(28,'How many noses does a slug have?','6','4','2','0',3),(29,'When can a newborn horse start walking?','after about a year','18 months later','a couple of hours after birth','2 weeks after birth',2),(30,'What is the dolphin\'s body temperature?','25.8°C','36.6°C','30°C','45.4°C',3);
/*!40000 ALTER TABLE `Animal_Quiz_Test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Capital_Cities_World`
--

DROP TABLE IF EXISTS `Capital_Cities_World`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Capital_Cities_World` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Capital_Cities_World`
--

LOCK TABLES `Capital_Cities_World` WRITE;
/*!40000 ALTER TABLE `Capital_Cities_World` DISABLE KEYS */;
INSERT INTO `Capital_Cities_World` VALUES (1,'Suva is the Capital of which Island ?','Canary Islands','Faroe Islands','Hawaii','Fiji Islands',1),(2,'What is the capital of Argentina ?','Buenos Aires','Rio De Jeneiro','Santiago','Lima',4),(3,'What is the Capital of Afghanistan ?','Afgan','Kabul','Istanbul','Islambad',3),(4,'What is the Capital of Morocco','Casablanca','Fes','Rabat','Marrakesh',2),(5,'Asuncion is the capital of which country ?','El Salvador','Bolivia','Peru','Paraguay',1),(6,'What is the capital of Malaysia ?','Soul','Penang','Kuala Lumpur','Nuuk',2),(7,'What is the capital of Moldova','Chisinau','Vaduz','Baku','Yerevan',4),(8,'Vientiane is the capital of which country ?','Singapore','Austria','Vietnam','Loas',1),(9,'What is the capital of Algeria ?','Algiers','Akentoup','Tunis','Algeria City',4),(10,'What is the capital of Romania ?','Sofia','Belgrade','Bucharest','Budapest',2),(11,'What is the capital of Mexico ?','Sinaloa','Mexico City','Los Angeles','Guadalajara',3),(12,'Tripoli is the capital of which country ?','Somalia','Syria','Libya','Sudan',2),(13,'What is the capital of Cyprus?','Rhodes','Crete','Athens','Nicosia',1),(14,'Abu Dhabi is the capital of which country ?','United Arab Emirates','Saudi Arabia','Eygpt','Quatar',4),(15,'What is the capital of Taiwan ?','Kaohsiung','Taichung','Taiwan City','Taipei',1);
/*!40000 ALTER TABLE `Capital_Cities_World` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `General_Sports`
--

DROP TABLE IF EXISTS `General_Sports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `General_Sports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `General_Sports`
--

LOCK TABLES `General_Sports` WRITE;
/*!40000 ALTER TABLE `General_Sports` DISABLE KEYS */;
INSERT INTO `General_Sports` VALUES (1,'How many times has the Pittsburgh Stealers won the super bowl ?','4','6','1','0',3),(2,'How many goals has Wayne Rooney scored for England ?','30','15','53','50',2),(3,'How many Master Tournaments has Tiger Woods Won ?','10','1','15','5',1),(4,'How many professional boxing fights has Floyd Mayweather Jr won ?','30','55','50','40',2),(5,'What is the nickname for the New Zealand National Rugby Team ?','All Blacks','Black Panthers','Black Crows','Black Hawks',4),(6,'How many seasons did Michael Jordan play in the NBA ?','10','15','16','13',3),(7,'Who has won the most Wimbledon titles ever ?','Rafael Nadal','Novak Djokovic','Rod Laver','Roger Federer',1),(8,'Who did Conor McGregor beat to become double champ ?','Jose Aldo','John Jones','Eddie Alvarez','Nate Diaz',2),(9,'How many English Premier League titles has Manchester United won ?','13','17','22','20',4),(10,'Who has won the most Stanley Cups in NHL ?','Red Bull Mississippi','Detroit Red Wings','Chicago Blackhawks','Montreal Canadiens',3),(11,'What number is Cristiano Ronaldo for Juventus ?','1','10','9','7',3),(12,'In the Rugby Union how many players are there on each team ?','10','20','13','15',1),(13,'What sport is played with a Shuttlecock ?','Squash','Cricket','Badminton','Tennis',2),(14,'Which stadium is host to the Atlanta Falcons ?','Mercedes-Benz Stadium','Amazon Stadium','Atlanta City Stadium','Atlanta Stadium',4),(15,'Who has the all time record for most points within a game in the NBA ?','Lebron James','Larry Bird','Michael Jordan','Wilt Chamberlain',1);
/*!40000 ALTER TABLE `General_Sports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tech_quiz_launch`
--

DROP TABLE IF EXISTS `Tech_quiz_launch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tech_quiz_launch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tech_quiz_launch`
--

LOCK TABLES `Tech_quiz_launch` WRITE;
/*!40000 ALTER TABLE `Tech_quiz_launch` DISABLE KEYS */;
INSERT INTO `Tech_quiz_launch` VALUES (1,'How many pounds the first 5MB hard drive approximately weighed?','Over 2000','500','Under 250','1000',4),(2,'Up to what height (m) can you build in a 2x2 DCL parcel plot?','60m','46m','52m','40m',3),(3,'What does \"FOMO\" mean?','Fear Of Missed Opportunity','Fear Of Massive Orders','Fear Of Missing Out','Fear of Mortgage Originators',2),(4,'Cryptocurrencies market capitalization is approximately …','200B dollars','600B dollars','300B dollars','500B dollars',1),(5,'How much MANA was spent in the first land auction?','Less then 10 mln usd','Not known exactly','Not more then 1 mln usd','More than 10 mln usd',1),(6,'What of these is the token standard for NFT?','ERC-725','ERC-731','ERC-720','ERC-1155',1),(7,'What was the highest price a DCL wearable sold for in ETH?','70','20','33','150',2),(8,'When was the first MANA transaction?','More than three years ago','2.5 years ago','Yesterday','Two years ago',4),(9,'What was the highest price paid for estate in DCL in Mana?','4 230 000','999 000','1 658 000','2 772 000',1),(10,'Who invented the World Wide Web?','Mark Zuckerberg','Tim Berners-Lee','Al Gore','Vint Cerf',3),(11,'What is POS?','Post scriptum','Picture of sun','Proof of stake','Point of sales',2),(12,'When was MANA smart contract published?','December 2017','October 2017','June 2017','August 2017',1),(13,'When was the official DCL launch?','9 months ago','More then year ago','Year ago','2 years ago',4),(14,'DCL team head office is located in ...','Moscow','Genesis plaza','Argentina','New York',2),(15,'QR codes, first created in 1994, were used as a way to track what?','FedEx packages at shipping facilities','Website URLs','Vehicles as they were manufactured','Phone calls using robots',2),(16,'How many land parcels total are there in DCL?','150000','120000','100000','90000',1),(17,'What does \"DEFI\" mean?','Crypto Currency','Decentralized Finance','Type Of Ethermon','Decentralization Fundamentals',3),(18,'What does \"SAFU\" mean?','Soap opera','Safe','Miso soup','Super',3),(19,'Which car company made the humanoid robot ASIMO?','Nissan','Mitsubishi','Honda','Toyota',2),(20,'How much BTC were paid for those 2 pizzas?','5000','100000','50000','10000',1),(21,'Roughly how many computer languages are known in the world?','5000','50','2000','600',2),(22,'How much MANA was the prize pool for the 1st Game Jame In DCL?','2.5 millions MANA','500k MANA','1 million MANA','5 millions MANA',4),(23,'What % of BTC has been mined yet?','100','76','88','91',2),(24,'Which of these items is not considered as a collectible?','There is no right answer','Virtual Clothing','Cigarette Packets','Bottle Caps',4),(25,'In which city Bill Gates and Paul Allen found Microsoft?','Los Altos','Seattle','Salt Lake City','Albuquerque',1),(26,'Which was the first NFT project?','Crypo Punks','Gods Unchained','Crypto Kitties','Decentraland',4),(27,'What does the acronym URL stand for?','Unit Return Location','Unified Reference Link','Universal Resource Locator','Universal Resource Location',2),(28,'The term \"Bull Market\" means?','A Group Of Three Or More Bulls','Marketplace To Buy Bulls','Butchers Shop (Meat Market)','A Market That Is On The Rise',1),(29,'What was the initial shape of the land plot?','Parallelogram','Octagon','Hexagon','Triangle',2),(30,'What is X Æ A-12?','Someone\'s son','Video-game','Fighter aircraft','Token standart in EOS',4);
/*!40000 ALTER TABLE `Tech_quiz_launch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Video_Game_Quiz`
--

DROP TABLE IF EXISTS `Video_Game_Quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Video_Game_Quiz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Video_Game_Quiz`
--

LOCK TABLES `Video_Game_Quiz` WRITE;
/*!40000 ALTER TABLE `Video_Game_Quiz` DISABLE KEYS */;
INSERT INTO `Video_Game_Quiz` VALUES (1,'What year was the Decentraland beta launched ?','2019','2017','2016','2020',1),(2,'Which blockchain powers Decentraland?','Dogecoin','Dragoncoin','Ethereum','Bitcoin',2),(3,'Which of the following is an art gallerys In Decentraland?','Makers Place','Genesis Plaza','Decentraland Report','The Broad',4),(4,'Which crypto currency is used within Decentraland casinos?','Litecoin','Mana','Bitcoin Cash','Xrp',3),(5,'Which of the following games can you play in Decentraland?','Super Smash Bros','Clue','Dragon Rush','Crash',2),(6,'In total how many Decentraland wearable Atari hats were relesead?','5000','10000','500','1000',4),(7,'What year was the Atari console first released?','1970','1980','1977','1967',2),(8,'What is the best selling Atari game of all time?','Pac-man','Mario Kart','Donkey Kong','Space Invaders',4),(9,'What year was Nintendo founded?','1902','1918','1989','1889',1),(10,'What is the best selling video game of all time?','Minecraft','Tetris','Mario Party 8','Gta 5',4),(11,'What does Mario jump on after completing a level?','Coin','Star','Flag Pole','Mushroom',2),(12,'What is the highest selling games console to date?','Playstation 4','Playstation 2','Game Boy','Xbox 360',3),(13,'Exo Suits were introduced in which call of duty series ?','World At War','Modern Warefare','Black Ops','Advanced Warefare',1),(14,'How many total units\' of Minecraft have been sold?','150 Million','205 Million','100 Million','200 Million',1),(15,'Which of the following was a game exclusively available on Wii Sports Resort ?','Darts','Canoeing','Sky Diving','Boxing',3),(16,'Which of the following is not a playable Grand Theft Auto Character ?','Huang Lee','Tommy Vercetti','Victor Vance','Michael Da Santos',1),(17,'Which of the following games were made by Rockstar Games?','Bully','Street Fighter','Watch Dogs','Need For Speed',4),(18,'What is the best-selling hand held gaming system to date?','Gameboy','Nintendo Switch','PSP','Nintendo DS',1),(19,'Who was on the cover of Madden 19 ?','Odel Beckham Jr','Antonio Brown','Lemar Jackson','Tom Brady',3),(20,'Who founded Nintendo?','Fusajiro Yamauchi','Bill Gates','Akio Morita','Masaru Ibuka',4),(21,'When was the first ever Call Of Duty released?','2002','2001','3004','2003',1),(22,'What is the best selling Call Of Duty game to date?','Black Ops','Black Ops 2','Modern Warefare 3','Cold War',4),(23,'V-Bucks are the currency in which video game?','Minecraft','Skyrim','GTA 5','Fortnite',1),(24,'Who is on the cover of Fifa 14?','Messi','Ronaldo','Hazard','Mbappe',4),(25,'How many units of the Gameboy have been sold to date?','98 Million','118 Million','88 Million','108 Million',3),(26,'On average how many grenades are thrown in Call of Duty every 5 years ?','700 Billion','100 Million','300 Billion','170 Billion',2),(27,'Which character has appeared in all but one Mario Party Game?','Wario','Bowser','Yoshi','Luigi',4),(28,'How many fingers does Mario have ?','4','6','10','8',1),(29,'Which of the following games were not made by Activision?','Battlefield 4','Black Ops 2','Modern Marefare 2','COD WW1',4),(30,'Nintendo began as a company selling what product?','Cameras','Clothes','Playing cards','Game consoles',2);
/*!40000 ALTER TABLE `Video_Game_Quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ai`
--

DROP TABLE IF EXISTS `ai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai`
--

LOCK TABLES `ai` WRITE;
/*!40000 ALTER TABLE `ai` DISABLE KEYS */;
INSERT INTO `ai` VALUES (1,'Artificial Intelligence will solve ...','Everything','Animal rescue problems','Deforestation problems','Social inequality problems',1),(2,'Artificial Intelligence will replace ...','Schooling','Machine learning','Water training','Army training',3),(3,'Chatbots use AI ...','To respond slowly','To chat','To attract customers','To sort customers requests',1),(4,'An android takes the form of ...','An insect','Binocular vision','A human body','A simple robot arm',2),(5,'Which of these does NOT use AI?','Siri/Alexa','Wireless speakers','Facial recognition on phones','Driverless cars',3),(6,'Is AI self-taught?','Yes','Only some types of AI','No','Sometimes',4),(7,'Which one of these is NOT an area of AI?','Web design','Robotics','Voice recognition','Computer vision',4),(8,'People use Cogito to ...','Shop','Identify people who suffer from depression','People don\'t use Cogito','Avoid traffic jams',3),(9,'Find 1 extra (Artificial Intelligence can be found in our daily life as):','Siri','Word autocorrection','Graphics card','Refrigerator',1),(10,'Software, designed to facilitate a conversation between a computer and a human, is called ...','An interactive voice response','A Walkie Talkie','A chatbot','A real time messaging',2),(11,'The term AI introduced:','John Horton Conway','Steve Jobs','John McCarthy','James Gosliu',2),(12,'What served as a model for an artificial neural network?','Telephone network','Brain processes','Computer network','Spider web',3),(13,'What was recently accused of the creators of the FaceApp selfie editing app?','In discrimination against women','None of the above','In racist inclinations','In rights violation of the LGBT community',2),(14,'AI-System \"Deep Blue\" won the chess player ...','Garry Kasparov','Magnus Carlsen','Paul Morphy','Bobby Fischer',4),(15,'Where was Sophia, the robot, developed?','Hong Kong','Tokyo','Singapore','Seoul',4),(16,'Which company developed Alexa?','Apple','Google','Yandex','Amazon',1),(17,'Does Artificial intelligence have a conscience?','It depends on the situation','No','Yes','Partly',3),(18,'What triggered the crisis of the second winter of artificial intelligence?','Expert systems market collapse','Book of Minsky and Papert','The emergence of personal computers','The emergence of Windows',4),(19,'Machines can\'t ...','Talk','Learn','Be afraid','Respond',3),(20,'AI-System \"MYCIN\" can ...','Recognise voice','Analyse text','Diagnose a set of diseases','Calculate',2),(21,'Moore\'s law predicts ... ?','Deterioration in AI','Machines computing power','Improvement in AI','Emergence of super intelligence',3),(22,'In what year was Artificial Intelligence found as an academic discipline?','1909','1956','1990','1912',3),(23,'First AI research focused on solving the problems in?','Calculations','Relationship','Ecology','Medicine',4),(24,'Moore\'s law is ...','It\'s not a law at all','A chemical law','A physical law','An empirical relationship',1),(25,'What caused appearance of fuzzy logic?','Criticism of Rosenblatt\'s work','Insufficiency of finite state machines','Development of neural networks','Assumptions in human thinking',1),(26,'To what time does the first mention of artificially created humanoid beings belong?','Nowadays','XX century','Period BC','Renaissance period',3),(27,'What year does futurist Ray Kurzweil believe AI will meet an adult human intelligence?','2029','2024','2035','2082',4),(28,'Most AI\'s (like Google Now, Siri) are?','Men','Robots','Women','Children',3),(29,'AI displaces people from ...','Earth','Home','Labor market','Exchange',2),(30,'What is to make an Artificial Intelligence?','Program with your own intelligence','Put your intelligence into a computer','Make a machine intelligent','Play a game',2);
/*!40000 ALTER TABLE `ai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animals`
--

DROP TABLE IF EXISTS `animals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animals`
--

LOCK TABLES `animals` WRITE;
/*!40000 ALTER TABLE `animals` DISABLE KEYS */;
INSERT INTO `animals` VALUES (1,'How many zoos are in the world?','800','700','600','500',1),(2,'How is chicken baby called?','Turkey','Egg','Chick','Rooster',2),(3,'Which animal changes wool 2 times a year?','Sheep','Rabbit','Cat','Dog',4),(4,'A unique animal of Australia with a leathery beak planted on its hairy head?','Ostrich','Platypus','Kangaroo','Koala',3),(5,'Monkeys which are considered the closest relatives of human?','Macaque','Orangutan','Gorilla','Chimpanzee',1),(6,'Which animal predicts the future best of all?','Dog','Octopus','Marmot','Hamster',2),(7,'Which animal has blue blood?','Snake','Cancer','Crab','Lobster',1),(8,'How many families of deer exist that contain a modern species and live in the Tyumen region?','51','52','55','50',4),(9,'What animal can retract its claws?','Hamster','Cat','Ferret','Dog',3),(10,'What cats love to eat?','Chocolate','Fruits','Vegetables','Sour cream',1),(11,'Which animal does not have vocal cords?','Giraffe','Lion','Squirrel','Beaver',4),(12,'Which animal was first tamed by a human?','Elephant','Cat','Horse','Dog',1),(13,'How many legs do spiders have?','8','7','10','6',4),(14,'Do fish close their eyes when they sleep?','only one eye','No','Yes','Some types of fish',3),(15,'Which animal has teeth in its stomach?','Whale','Crab','Horse','Lizard',3);
/*!40000 ALTER TABLE `animals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animals2`
--

DROP TABLE IF EXISTS `animals2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animals2`
--

LOCK TABLES `animals2` WRITE;
/*!40000 ALTER TABLE `animals2` DISABLE KEYS */;
INSERT INTO `animals2` VALUES (1,'What is the dolphin\'s body temperature?','25.8°C','36.6°C','30°C','45.4°C',3),(2,'How many noses does a slug have?','6','0','2','4',1),(3,'Where would you find a prawn’s heart?','Bum','Head','Chest','Feet',3),(4,'What color is skin of polar bear?','Dark blue','Grey','Black','White',2),(5,'How many teeth will sharks grow and lose in heir lifetime?','2','50 000','54','3 500',3),(6,'What part of the body do snakes use to smell?','Tongue','Feet','Ears','Nose',4),(7,'Which bird lays the largest egg?','Bird of paradise','Penguin','Parrot','Ostrich',1),(8,'What is a fear of spiders called?','Autophobia','Hydrophobia','Arachnophobia','Acrophobia',2),(9,'How many hearts does an octopus have?','6','4','1','3',1),(10,'How long can snail sleep for?','3 months','3 years','A month','10 minutes',3),(11,'Which animal does not get sick?','Panda','Giraffe','Shark','Badger',2),(12,'Which animal shows its child at the sight of danger?','Possum','Zebra','Beaver','Otter',1),(13,'Which animal has a rectangular pupil?','Otter','Deer','Octopus','Owl',2),(14,'What breed of dog has a blue tongue?','Poodle','Chow-chow','Beagle','Pug',3),(16,'Which bird can fly backwards?','Hummingbird','None','Crane','Eagle',4);
/*!40000 ALTER TABLE `animals2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `art1`
--

DROP TABLE IF EXISTS `art1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `art1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `art1`
--

LOCK TABLES `art1` WRITE;
/*!40000 ALTER TABLE `art1` DISABLE KEYS */;
INSERT INTO `art1` VALUES (4,'Which picture was NOT painted by Salvador Dali?','\"Melting Watch\"','\"The birth of Venus\"','\"The Face of War\"','\"The Persistence of memory\"',3),(5,'Were the Teenage Mutant Ninja Turtles named after famous Renaissance artists?','No','Only some of them','Yes','Not after Renaissance artists',2),(6,'Where is Vincent Van Gogh\'s','The Musee d\'Orsay in Paris','The Museum of Modern Art in New York','The Van Gogh Museum in Amsterdam','The Louvre Museum in Paris',3),(7,'Who painted \"The Starry Night\"?','Paul Gaugin','Marc Chagall','Vincent van Gogh','Amedeo Modigliani',2),(8,'Who are the two gentlemen arguing in the middle of \"The School of Athens\"?','Aristotle and Plato','Plato and Socrates','Raphael and Michelangelo','Michelangelo and Leonardo da Vinci',4),(9,'Who painted \"Fuck All Y\'all\"?','Raphael','Spaced Painter','Hackatao','Katy Arrington',1),(10,'How many keys are there in the piano?','88','102','56','64',4),(11,'Which digital art marketplaces have their own tokens?','Super Rare','All of these','Rarible','Makersplace',3),(12,'Pablo Picasso is a representative of ... art style','Post-Impressionism','Expressionism','Impressionism','Cubism',1),(13,'Which of the following is not a digital art marketplace?','KnownOrigin','Rarible','ArtZone','MakersPlace',2),(14,'Van Gogh was ... artist','Modernist','Realist','Impressionist','Post-impressionist',1),(15,'Which painting was stolen by an employee of the Louvre Museum in 1911?','\"The Scream\"','\"Mona Lisa\"','\"The birth of Venus\"','\"The Starry Night\"',3),(16,'What animal often symbolises peace in art?','Deer','Duck','Dove','Dog',2),(17,'How many wives did Salvador Dali have?','3','he had a husband','only one','no one',2),(18,'Which crypto artist paints in a Doodle art style?','Hackatao','Primal Cypher','Stina Jones','Josie',4);
/*!40000 ALTER TABLE `art1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `art2`
--

DROP TABLE IF EXISTS `art2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `art2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `art2`
--

LOCK TABLES `art2` WRITE;
/*!40000 ALTER TABLE `art2` DISABLE KEYS */;
INSERT INTO `art2` VALUES (1,'When did Salvador Dali pass away?','In 1069','In 1879','He is still alive','In 1989',1),(2,'Which instrument is the largest in the world?','Harpsichord','Grand piano','Organ','Harp',2),(3,'How many tones are there in a newt?','3','1','2','7',4),(4,'DCL has a partnership with ...','SuperRare','KnownOrigin','All of them','MakersPlace',2),(5,'What was the first musical instrument?','Moroccas','Guitar','Drum','Pipe',1),(6,'Which of the following is one of biggest crypto art collectors?','John Smith','Whale Shark','Sam Hamilton','Elon Musk',3),(7,'His favourite models were dancers. The painter\'s name was ...','Pissarro','Sisley','Edgar Degas','Vincent Van Gogh',2),(8,'What is the name the most famous Tchaikovsky ballet?','\"Eugene Onegin\"','\"The Queen of Spades\"','\"Swan Lake\"','\"Iolanta\"',2),(9,'What geometric shape became a musical instrument?','Cone','Triangle','Cube','Parallelepiped',3),(10,'How is the musical group of three performers called?','Duet','Trinity','Quartet','Trio',1),(11,'Picture that is depicting nature is called ...','Still life','Portrait','Landscape','Wildlife',2),(12,'The NFT music file standard is','ERC20','It doesn\'t exist','ERC007','ERC721',1),(13,'Jose Delbo\'s work is a representation of which artistic style?','Comics art','Vaporwave art','Impressionism','Doodle art',4),(14,'What musical instrument did Sherlock Holmes like to play?','Violin','Watson\'s nerves','Guitar','Cello',4),(15,'Is fashion an art?','Yes, indeed','No','Only in France','It\'s a negotiatable question',1);
/*!40000 ALTER TABLE `art2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `art_and_crypto`
--

DROP TABLE IF EXISTS `art_and_crypto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `art_and_crypto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `art_and_crypto`
--

LOCK TABLES `art_and_crypto` WRITE;
/*!40000 ALTER TABLE `art_and_crypto` DISABLE KEYS */;
INSERT INTO `art_and_crypto` VALUES (1,'How many keys are there in the piano?','56','88','102','64',3),(2,'Jose Delbo\'s work is a representation of which artistic style?','Doodle art','Vaporwave art','Impressionism','Comics art',1),(3,'Were the Teenage Mutant Ninja Turtles named after famous Renaissance artists?','No','Only some of them','Yes','Not after Renaissance artists',2),(4,'Which of the following is not a digital art marketplace?','MakersPlace','Rarible','ArtZone','KnownOrigin',2),(5,'DCL has a partnership with ...','MakersPlace','KnownOrigin','SuperRare','All of them',1),(6,'Picture that is depicting nature is called ...','Landscape','Still life','Wildlife','Portrait',4),(7,'What is the name the most famous Tchaikovsky ballet?','\"The Queen of Spades\"','\"Iolanta\"','\"Eugene Onegin\"','\"Swan Lake\"',1),(8,'Pablo Picasso is a representative of ... art style','Post-Impressionism','Cubism','Impressionism','Expressionism',3),(9,'Which instrument is the largest in the world?','Grand piano','Harp','Harpsichord','Organ',1),(10,'Who painted \"Fuck All Y\'all\"?','Hackatao','Katy Arrington','Spaced Painter','Raphael',3),(11,'What geometric shape became a musical instrument?','Cone','Cube','Triangle','Parallelepiped',2),(12,'Is fashion an art?','It\'s a negotiatable question','No','Yes, indeed','Only in France',4),(13,'Who are the two gentlemen arguing in the middle of \"The School of Athens\"?','Raphael and Michelangelo','Plato and Socrates','Aristotle and Plato','Michelangelo and Leonardo da Vinci',2),(14,'Van Gogh was ... artist','Modernist','Impressionist','Realist','Post-impressionist',1),(15,'The NFT music file standard is ...','ERC20','It doesn\'t exist','ERC721','ERC007',2),(16,'Who painted \"The Starry Night\"?','Marc Chagall','Vincent van Gogh','Amedeo Modigliani','Paul Gaugin',3),(17,'Which digital art marketplaces have their own tokens?','All of these','Rarible','Makersplace','Super Rare',4),(18,'Which picture was NOT painted by Salvador Dali?','\"The Face of War\"','\"The Persistence of memory\"','\"Melting Watch\"','\"The birth of Venus\"',1),(19,'What animal often symbolises peace in art?','Dog','Dove','Deer','Duck',3),(20,'What musical instrument did Sherlock Holmes like to play?','Violin','Guitar','Cello','Watson\'s nerves',4),(21,'Which painting was stolen by an employee of the Louvre Museum in 1911?','\"The birth of Venus\"','\"The Starry Night\"','\"The Scream\"','\"Mona Lisa\"',1),(22,'When did Salvador Dali pass away?','He is still alive','In 1879','In 1069','In 1989',1),(23,'What was the first musical instrument?','Guitar','Pipe','Drum','Moroccas',3),(24,'How many tones are there in a newt?','3','2','1','7',4),(25,'His favourite models were dancers. The painter\'s name was ...','Pissarro','Edgar Degas','Sisley','Vincent Van Gogh',3),(26,'How many wives did Salvador Dali have?','Three','He had a husband','None','Only one',1),(27,'How is the musical group of three performers called?','Trio','Quartet','Trinity','Duet',4),(28,'Which crypto artist paints in a Doodle art style?','Hackatao','Stina Jones','Josie','Primal Cypher',4),(29,'Where is Vincent Van Gogh\'s \"The Starry Night\" displayed?','The Musée d\'Orsay in Paris','The Louvre Museum in Paris','The Museum of Modern Art in New York','The Van Gogh Museum in Amsterdam',2),(30,'Which of the following is one of biggest crypto art collectors?','Elon Musk','Whale Shark','Sam Hamilton','John Smith',3);
/*!40000 ALTER TABLE `art_and_crypto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cinema`
--

DROP TABLE IF EXISTS `cinema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cinema` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinema`
--

LOCK TABLES `cinema` WRITE;
/*!40000 ALTER TABLE `cinema` DISABLE KEYS */;
INSERT INTO `cinema` VALUES (3,'In how many nominations did the Titanic receive an Oscar?','5','20','7','11',1),(4,'What is the name of the famous film with R. Gere and J. Roberts?','\"Cinderella\"','\"Molodka\"','\"Pretty Woman\"','\"Darling\"',2),(5,'Braveheart: Which country does this story take place?','England','Ireland','Wales','Scotland',1),(6,'What is the name of the author whose story became the basis for the film \"The Shawshank Redemption\"?','Stephen King','Margaret Mitchell','Joanne Rowling','Ray Bredbury',4),(7,'What\'s the first Disney film?','Alice in Wonderland','Sleeping Beauty','Cinderella','Snow White',1),(8,'Back to the Future: To which year does Marty McFly travel back in time?','1955','1985','1919','1966',4),(9,'What is the title of Sergio Leone\'s film?','\"Sometimes in Europe\"','\"Once Upon a Time in America\"','\"Once in Africa\"','\"Once Upon a Time in Antarctica\"',3),(10,'Which US President gives Kevin McAllister directions in Home Alone 2?','Barack Obama','George Bush','George W. Bush','Donald Trump',1),(11,'Which film was the first in the cinema history to gross 1 billion $?','Avengers: Endgame','Avatar','Titanic','Jurassic Park',2),(12,'What was the name of the main character in Titanic?','Jack','John','Jim','Jason',4),(13,'Which city in Europe hosts the most prestigious film festival?','Kiev','London','Paris','Cannes',1),(14,'Where was Peter Jackson\'s Lord of the Rings trilogy filmed?','USA','Ireland','England','New Zealand',1),(15,'Who played the main role in the movie \"Evita\"?','Madonna','Jennifer Lawrence','Angelina Jolie','Lady Gaga',4),(16,'Willy Wonka & The Chocolate Factory: How many \"golden tickets\" were hidden inside Wonka\'s bars?','5','3','8','10',4),(17,'Which French actor played in the films \"Leon\" and \"Crimson Rivers\"?','Jean Reno','Gerard Depardieu','Jean-Paul Belmondo','Alain Delon',4),(18,'Who directed Avatar, Titanic and The Terminator?','David Fincher','Ridley Scott','Steven Spielberg','James Cameron',1),(19,'Who of the greatest comedians made a bowler hat and a cane an integral part of his image?','Buster Keaton','Charlie Chaplin','Harold Lloyd','Max Linder',3),(20,'What year was the first Toy Story film released in cinemas?','1995','1998','2005','2000',4),(21,'What\'s the name of Simba\'s nasty uncle?','Mustafa','Scar','Jafar','Mufasa',3),(22,'How many friends did Ocean have at total?','33','36','11','26',3),(23,'Who played the main role in American movie \"The Bodyguard\"?','Leonardo DiCaprio','Johnny Depp','Kevin Costner','Brad Pitt',2),(24,'How many main characters are there in Friends?','2','4','6','8',2),(25,'Where was the world\'s first cinema opened?','New York','London','Berlin','Paris',1),(26,'What was the name of the platfrom from which the train to the Hogwarts departed?','10 1/4','9 3/4','9 1/4','7 3/4',3),(27,'What is the name of the Star Wars production director?','Luke Skywalker','George Lucas','James Cameron','James Wood',3),(28,'What hobbie did Belle, the protagonist of Beauty and the Beast, have?','Reading','Gardening','Painting','Knitting',4),(29,'What was Kevin\'s mother name in the \"Home alone\" movie?','Leslie','Kate','Megan','Linnie',3),(30,'What was the name of the main character of the movie \"Gone with the Wind\"?','Wafer','Prissie','Scarlett','Melanie',2),(31,'Which American actor played in \"The Patriot\", \"Braveheart\" and \"Ransom\"?','Mel Gibson','Leonardo DiCaprio','Johnny Depp','Brad Pitt',4),(32,'What was the first movie made in color?','La Cucaracha','Flowers and Trees','Becky Sharp','Cupid Angling',1);
/*!40000 ALTER TABLE `cinema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cinema1`
--

DROP TABLE IF EXISTS `cinema1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cinema1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinema1`
--

LOCK TABLES `cinema1` WRITE;
/*!40000 ALTER TABLE `cinema1` DISABLE KEYS */;
INSERT INTO `cinema1` VALUES (1,'What was Kevin\'s mother name in the \"Home alone\" movie?','Leslie','Kate','Linnie','Megan',3),(2,'Who directed Avatar, Titanic and The Terminator?','David Fincher','Steven Spielberg','Ridley Scott','James Cameron',1),(3,'What year was the first Toy Story film released in cinemas?','2005','2000','1995','1998',2),(4,'What hobbie did Belle, the protagonist of Beauty and the Beast, have?','Knitting','Gardening','Painting','Reading',1),(5,'What\'s the name of Simba\'s nasty uncle?','Mustafa','Scar','Mufasa','Jafar',3),(6,'Where was Peter Jackson\'s Lord of the Rings trilogy filmed?','New Zealand','Ireland','USA','England',4),(7,'Which US President gives Kevin McAllister directions in Home Alone 2?','George Bush','Barack Obama','Donald Trump','George W. Bush',2),(8,'What was the name of the main character in Titanic?','John','Jack','Jim','Jason',3),(9,'What was the first movie made in color?','Becky Sharp','Cupid Angling','Flowers and Trees','La Cucaracha',3),(10,'Who of the greatest comedians made a bowler hat and a cane an integral part of his image?','Charlie Chaplin','Buster Keaton','Harold Lloyd','Max Linder',4),(11,'What is the title of Sergio Leone\'s film?','\"Once Upon a Time in Antarctica\"','\"Sometimes in Europe\"','\"Once Upon a Time in America\"','\"Once in Africa\"',2),(12,'How many main characters are there in Friends?','6','8','2','4',4),(13,'How many friends did Ocean have at total?','26','33','11','36',1),(14,'What was the name of the main character of the movie \"Gone with the Wind\"?','Scarlett','Prissie','Melanie','Wafer',4),(15,'What is the name of the famous film with R. Gere and J. Roberts?','\"Molodka\"','\"Pretty Woman\"','\"Cinderella\"','\"Darling\"',3);
/*!40000 ALTER TABLE `cinema1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cinema2`
--

DROP TABLE IF EXISTS `cinema2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cinema2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinema2`
--

LOCK TABLES `cinema2` WRITE;
/*!40000 ALTER TABLE `cinema2` DISABLE KEYS */;
INSERT INTO `cinema2` VALUES (1,'What\'s the first Disney film?','Snow White','Cinderella','Sleeping Beauty','Alice in Wonderland',4),(2,'Braveheart: Which country does this story take place?','England','Ireland','Wales','Scotland',1),(3,'Willy Wonka & The Chocolate Factory: How many \"golden tickets\" were hidden inside Wonka\'s bars?','5','8','3','10',4),(4,'What was the name of the platfrom from which the train to the Hogwarts departed?','7 3/4','9 3/4','10 1/4','9 1/4',3),(5,'Back to the Future: To which year does Marty McFly travel back in time?','1966','1985','1919','1955',1),(6,'Which film was the first in the cinema history to gross 1 billion $?','Jurassic Park','Titanic','Avengers: Endgame','Avatar',3),(7,'In how many nominations did the Titanic receive an Oscar?','11','20','5','7',4),(8,'Who played the main role in the movie \"Evita\"?','Angelina Jolie','Lady Gaga','Madonna','Jennifer Lawrence',2),(9,'What is the name of the author whose story became the basis for a film','Ray Bredbury','Stephen King','Margaret Mitchell','Joanne Rowling',3),(10,'Who played the main role in American movie \"The Bodyguard\"?','Brad Pitt','Johnny Depp','Kevin Costner','Leonardo DiCaprio',2),(11,'Which city in Europe hosts the most prestigious film festival?','Kiev','Paris','London','Cannes',1),(12,'Where was the world\'s first cinema opened?','Berlin','London','Paris','New York',2),(13,'Which American actor played in \"The Patriot\", \"Braveheart\" and \"Ransom\"?','Mel Gibson','Johnny Depp','Brad Pitt','Leonardo DiCaprio',4),(14,'Which French actor played in the films \"Leon\" and \"Crimson Rivers\"?','Gerard Depardieu','Jean-Paul Belmondo','Jean Reno','Alain Delon',2),(15,'What is the name of the Star Wars production director?','James Cameron','Luke Skywalker','James Wood','George Lucas',1);
/*!40000 ALTER TABLE `cinema2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fashion`
--

DROP TABLE IF EXISTS `fashion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fashion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fashion`
--

LOCK TABLES `fashion` WRITE;
/*!40000 ALTER TABLE `fashion` DISABLE KEYS */;
INSERT INTO `fashion` VALUES (1,'Which of the following is NOT a fashion magazine?','Volo','Elle','Harper’s Bazaar','Vogue',4),(2,'Who is Anna Wintour?','A photographer','A designer','A model','An editor-in-chief of Vogue',1),(3,'Coco Chanel dressed women in trousers, but who invented a trouser suit?','Louis Vuitton','Yves Saint Laurent','Jean-Paul Gaultier','Gucci',3),(4,'What is a primer?','Foundation','Makeup base','A cleanser that prepares skin for an even makeup','Base for mascara',3),(5,'Due to what type of clothing model gait appeared?','Long dress','Skinny jeans','High heels','Pencil skirt',1),(6,'What accessory started Coco Chanel\'s career?','Scarves','Rings','Hats','Gloves',2),(7,'What primer color should you use to hide redness?','Green','Yellow','Violet','Peach',4),(8,'What fabric was considered the most fashionable in Europe in the 15th century?','Silk','Velvet','Polyester','Cotton',3),(9,'What was one of the main inspiration sources for Dior when he was creating women\'s dresses sketches?','Literature','Painting','Theater','Architecture',1),(10,'What was the name of the first perfume created by Dior?','Miss Dior','Jadore','Dolce Vita','Star',4),(11,'What was the favorite Coco Chanel\'s number?','2','10','7','5',1),(12,'Where was the first official Fashion Week held?','Milan','New York','Paris','London',3),(13,'Who is the leader in the global cosmetics market?','L\'Oréal','Max factor','Avon','Pantene',4),(14,'Which term describes a dress with a triangular silhouette?','Shift','A-line','Macaroni dress','Ball gown',3),(15,'Who is the creator of the New look style?','Christian Dior','Pierre Cardin','Yves Henri Donat Mathieu-Saint-Laurent','Gucci',4),(16,'Who did Christian Dior believed in?','Vampires','Psychics','Fashion gods','Elfs',3),(17,'What reduces eye puffiness?','Chamomile','Avocado pulp','Lemon','Hemorrhoid cream',1),(18,'Which of the following names is NOT a clothing brand name?','Giorgio Armani','Brunes','Gucci','Prada',3),(19,'What nickname does Valentino Garavani have?','Valentino Blue','Valentino Black','Valentino White','Valentino Red',1),(20,'What is the unique sign of Christian Louboutin shoes?','Self-tying laces','A red sole','Sharp toe','A 15 cm heel',3),(21,'What are meteorites?','Powder in balls','Bath bombs','Large meteoric bodies that fall to Earth','Eyeshadow brush names',4),(22,'What color of soles did Christian Louboutin create especially for brides?','Orange','Red','Pink','Blue',1),(23,'How much lipstick does an average woman \"eat\" during her life?','0.35 kg','0.27 kg','0.44 kg','1.7 kg',4),(24,'Who was the standard of beauty of the 50s?','Kate Moss','Sophia Loren','Lesley Lawson','Coco Chanel',3),(25,'Why do you need a beauty blender sponge?','For applying face cream','For applying tone, concealer, and blending','It replaces all makeup brushes','To refresh your makeup during the day',3),(26,'What is the name of the brush used to apply powder / bronzer / blush?','Kabuki','Calico','Coco','Kaluki',4),(27,'How often should you wash your makeup brushes?','Once a week','They aren\'t needed to be washed','Once a month','Every time after use',4),(28,'How did fashion designers demonstrate their clothes in 1500s?','On models','On animals','On miniature dolls','On mannequins',2),(29,'What is the best skin area to use for checking the makeup base?','Forehead','Neck','Arm','Chin',1),(30,'Who invented a \"little black dress\"?','Yves Saint Laurent','Coco Chanel','Oscar de la Renta','Christian Dior',3);
/*!40000 ALTER TABLE `fashion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fashion_coin_1`
--

DROP TABLE IF EXISTS `fashion_coin_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fashion_coin_1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fashion_coin_1`
--

LOCK TABLES `fashion_coin_1` WRITE;
/*!40000 ALTER TABLE `fashion_coin_1` DISABLE KEYS */;
INSERT INTO `fashion_coin_1` VALUES (1,'How to get a grant from CypherBank to produce NFT?','Bribe FSHN community manager','Negotiate with Cypher Chi','Fill out the form and describe your cool project','To persuade Anna Karenina',2),(2,'How many fashion coins are there in circulation?','1,000,000,000,001','1,000,000,000','1,000,000','1000',4),(3,'What national currencies does CypherBank want to release in a trendy crypto form?','Euro','Chinese yuan','All national currencies of the world','U.S. Dollars',2),(4,'Who is the creator of valuemojies?','Elon Mask','Satoshi Nakamoto','Vinklevoss Brothers','Anna Karenina',1),(5,'Who was the first economist to come up with the idea of introducing private money?','Donald Trump','Friedrich von Hayek','John Keynes','Milton Friedman',3),(6,'What jurisdiction does CypherBank have?','Decentraland','Estonia','USA','Cayman islands',4),(7,'How to create your own valuable?','Graduate from the art academy','Release a product on the Proof-of-Love platform','Pay 1 BTC for this right','Buy valuable',3),(8,'What is bad money?','Money printed on bad paper','Central Bank money on a broken computer','Governmental money that cause inflation','Dollars, because they exclude BLM',2),(9,'Why do I need a crypto name?','To hide public keys','To use many blockchains at once','To show off to friends','To make transactions easier',3),(10,'What does Gresham\'s Law say?','Bad mood drives out good mood','Good will always triumph over evil','Bad money drives good money out of circulation','The best is the enemy of the good',2),(11,'Who started issuing bad money?','Almost all governments and kings','Adolf Gitler','USA','Caesar',4),(12,'What is valuemoji based on?','On Tesla shares','On CypherBank promotions','On emojis, because they belong to everyone','On US dollars',2),(13,'How to assign creative value to my valuable?','Calculate how much money I need','Ask friends','Explore the catalog of contemporary art','Give an estimate (maximum x100 the nominal price)',1),(14,'What is the starting capital for CypherBank?','$ 10 million','$ 1M NFT Collection','0','10 billion FSHN',1),(15,'What money are the best from the personal perspective?','Large gold coins','Money issued by the person himself','U.S. dollars','Chinese yuan',3),(16,'What is the SDR stable currency, which CypherBank is going to release?','Average of all national currencies in the world','Hidden Reserve Masonic Lodge','Reserve of the International Monetary Fund','Super Design Rarity',2),(17,'How to create a crypto-name and open an account on the Proof-of-Love network?','Go to coin.fashion website and create it','Buy it on the secondary market','Pass KYC','Pay $ 1000 to Cypher Bank',4),(18,'How does bad money differ from good money?','We pay with bad money and keep good money','Bad money come with coercion and inflation','Good money are always backed by gold','There are more bad money than good money',3),(19,'Who is the owner of CypherBank?','Everyone who owns valuemoji','Pool of US investors','Elon Musk','Cypher Chi and Anna Karenina',4),(20,'How to become a member of DAO CypherBank?','Complete the whole quest','Set up a node on the Proof-of-Love blockchain','Buy valuemoji','Pass this quiz',1);
/*!40000 ALTER TABLE `fashion_coin_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fashion_coin_2`
--

DROP TABLE IF EXISTS `fashion_coin_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fashion_coin_2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fashion_coin_2`
--

LOCK TABLES `fashion_coin_2` WRITE;
/*!40000 ALTER TABLE `fashion_coin_2` DISABLE KEYS */;
INSERT INTO `fashion_coin_2` VALUES (1,'What is a creative value of a valemoji?','Creative power of the author','The price assigned by its author','The value CypherBank assigns to a valuemoji','The ghost of Joseph Beuys',3),(2,'Who owns emoji?','Google','Apple','Nobody','Samsung',2),(3,'Which emoji increased in use the most in recent years?','🦠','💀','♻','💰',2),(4,'Which NFT platform doesn’t coerce you to pay gas?','Sorare','Open Sea','Rarible','Proof-of-Love',1),(5,'What is Valuemoji?','Valuable emoji','Valentine','Valuable mojo','Valium emotion',4),(6,'How many emojis are in circulation today?','678','Less than 100','52000','More than 3000',1),(7,'With which kind of valuemoji one can issue fashioned international currencies?','🦄','🕹','🇱🇷','💵',2),(8,'What is NFT?','Noble foundation territory','Nano figure tip','Never feel terrible','Non-fungible token',1),(9,'What is the unit currency of account on Proof-of-Love?','Fashion Coin','Bitcoin','Ethereum','Dogecoin',4),(10,'Who is the author of valuemojis?','Anna Karenina','Vitalik Buterin','Justin Sun','Pavel Durov',4),(11,'Which emoji is used the most as for today?','💩','❤️','😂','🍎',2),(12,'Which token is fungible?','Valuemoji','Erc20 token','Valuable','Dollar',3),(13,'Who issues valuemojis?','Federal Reserve System','DAO CypherBank','Facebook','JP Morgan',3),(14,'Which valuemoji grants you a membership in Proof-of-Love board?','🗝','❄️','❤️','📒',2),(15,'What where the first NFTs?','Crypto Kitties','Valuemojis','Crypto Punks','The land in Decentraland',4),(16,'Which token is non fungible?','Valuemoji','Bitcoin','Any Ethereum token','Casino token',4),(17,'What is the face value of a valuemoji?','The price I need to pay when buying it','Nominal price backed by crypto assets','The face of the author','Fake value',3),(18,'What is the name of NFTs on Proof-of-Love dAPP?','Sharables','Downloadables','Collectibles','Valuables',1),(19,'Which valuemoji gives you a privilegein DAO?','🥋','🎁','🤪','⚙',2),(20,'Which % per year (APY) is rewarded for every valuemoji?','12%','100%','0%','10%',4);
/*!40000 ALTER TABLE `fashion_coin_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `football`
--

DROP TABLE IF EXISTS `football`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `football` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `football`
--

LOCK TABLES `football` WRITE;
/*!40000 ALTER TABLE `football` DISABLE KEYS */;
INSERT INTO `football` VALUES (1,'Which club did Barcelona play against when Leo Messi made his debut?','\"Español\"','\"Celta Vigo\"','\"Real Madrid\"','\"Athletic Bilbao\"',4),(2,'Which famous football player recently changed his sport contract from Nike to Puma?','Carlos Tevez','Neymar Jr','Kün Aguero','Paul Pogba',3),(3,'Which is the world\'s most expensive football transfer?','Kylian Mbappe (Monaco -> PSG)','Romelu Lukaku (M. United -> Inter Milan)','Cristiano Ronaldo (M. United -> Real Madrid)','Neymar Jr (Barcelona -> PSG)',1),(4,'Which footballer has a lion tattoo on his entire back?','Memphis Depay','Virgil Van Dijk','Adama Traore','Zlatan Ibrahimovic',4),(5,'Which team won the first Premier League title?','\"Derby County\"','\"Liverpool\"','\"Manchester United\"','\"Everton\"',2),(6,'Which football player tattooed on his body the names of 50 strangers suffering from food shortages?','Zlatan Ibrahimovic','Manor Solomon','Leo Messi','Sergio Ramos',4),(7,'Which football club in 1920 got the \"royal\" title?','Real Madrid','\"Dynamo Kiyv\"','\"PSV\"','\"AJAX\"',4),(8,'Which club is sometimes referred to as FC Hollywood?','\"Bayer Leverkusen\"','\"FC Dallas\"','\"Bayern München\"','\"Atlanta United\"',2),(9,'Which of these stadiums is the largest in the world in terms of capacity?','\"Camp Nou\", Barcelona','\"Rungrado May Day Stadium\", Pyongyang','\"Wembley\", London','\"Luzhniki\", Moscow',3),(10,'Which football player scored 5 goals in 9 minutes?','Alexandre Lacazette','Robert Lewandowski','Mario Götze','Marcus Rashford',3),(11,'Which team won the first UEFA Nations League tournament?','Italy','Germany','Portugal','Spain',2),(12,'Where and Who was the first football mascot?','\"Fuleco\", Brazil','Lion \"Willy\", England','Boys \"Tip and Top\", Germany','\"Pique\", Mexico',3),(13,'Who am I? If as a football player my nickname was \"killer with babyface\"?','Ole Gunnar Solskjær','Erick Cantona','Jadon Sancho','Zlatan Ibrahimovic',4),(14,'Who am I? My career road is Chelsea -> Juventus -> Inter Miami','Blaise Matuidi','Nani','Nelson Semedo','Gonzalo Higuain',1),(15,'Which team has won the most Serie A titles?','\"Juventus\"','\"Internazionale\"','\"Genoa\"','\"AC Milan\"',4),(16,'For which team has Memphis Depay never played in his life?','\"Lyon\"','\"Manchester United\"','\"PSV\"','\"Barcelona\"',1),(17,'How long is a football (soccer) field?','110m','125m','150m','100m',3),(18,'Who am I? My career road is Alaves -> Stock City -> Montreal','Pato','Yao Karifa','Nani','Bojan Krkič',1),(19,'What happened on February 6, 1958?','World Championship in Japan and Korea','Roman Abramovich\'s acquisition of \"Chelsea\"','The Munich Air Disaster','UEFA Cup Final \"Sporting\" - \"CSKA\"',2),(20,'Who is the Champions League\'s top goalscorer of all time?','Cavani','Robert Lewandowski','Leo Messi','Cristiano Ronaldo',1),(21,'Which football club does David Beckham own?','\"Inter Milan\"','\"Milan\"','\"Inter Miami\"','\"Los Angeles Galaxy\"',2),(22,'Which national football team did Mesut Özil play for?','Germany','Albania','Ukraine','Turkey',4),(23,'Which countries hosted \"Euro-2012\"?','Ukraine-Poland','England-Scotland','Spain-Portugal','Russia-Kazakhstan',4),(24,'What is \"Calciopoli\"?','\"offside\" in Italian language','Derby of two italian teams','A scandal of football match fixing','\"goal\" in Italian language',2),(25,'Who am I? My new team nicknamed me \"King of the North\"','Erling Haaland','Artem Dzyuba','Alexander Sørloth','Zlatan Ibrahimovic',2),(26,'Which young footballer at the age of 17 became the best player in Liga BBVA in September?','Ansu Fati','Martin Ødegaard','Andrey Lunin','Bojan Krkič',4),(27,'Which club is confused with the Portuguese national team due to the number of portuguese players?','\"Chelsea\"','\"Leeds United\"','\"Wolves\"','\"Manchester City\"',2),(28,'What animal predicted the results of football matches?','Frog \"Mendy\"','Octopus \"Paul\"','Rabbit \"Dunya\"','Cat \"Garfield\"',3),(29,'In video game FIFA 20, which real-life team does Piemonte Calcio represent?','\"Rayo Vallecano\"','\"Español\"','\"Milan\"','\"Juventus\"',1),(30,'Messi has won a record number of Ballon d\'Or awards, but how many?','6','8','3','5',4);
/*!40000 ALTER TABLE `football` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guinness`
--

DROP TABLE IF EXISTS `guinness`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guinness` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guinness`
--

LOCK TABLES `guinness` WRITE;
/*!40000 ALTER TABLE `guinness` DISABLE KEYS */;
INSERT INTO `guinness` VALUES (1,'What is the height of the tallest tree?','110m','140m','10m','115m',1),(2,'The oldest cat ever was ... years old','27','38','50','20',3),(3,'What\'s the biggest number of children born by one mother?','10','21','38','69',1),(4,'How long did it take to complete the fastest world roundtrip by bicycle?','80 days','155 days','123 days','141 days',2),(5,'In which country was the most expensive chocolate created?','Belgium','Switzerland','Ethiopia','Ecuador',1),(6,'Which of this has not been recorded in the Guinness Book yet?','100m race with fins','Putting masks on the face','The largest number of butterflies on a human body','Chainsaw juggling',2),(7,'What is the record time for a man to run 100m?','9.44s','9.58s','9.71s','10.01s',3),(8,'Maximum number of tricks performed by a pig in 1 minute ...?','13','10','5','17',4),(9,'Who is the most frequently shown character in films and TV?','Hamlet','Dracula','James Bond','Sherlock Holmes',1),(10,'The highest hat is ... tall','30 meters','1 meter','2.7 meters','4.8 meters',1),(11,'What\'s the longest time a man has ever held his breath?','24 minutes','17 minutes','35 minutes','8 minutes',4),(12,'Which strength record has NOT been set yet?','Holding concrete blocks with hair','Pulling the truck with ears','Elephant car ride','Holding the car on the head',4),(13,'What is the longest human nail in the world?','151cm','303cm','55cm','91cm',1),(14,'Which of this has not yet been eaten competitively?','Caterpillars','Live scorpions','Metal','Glass',3),(15,'All these races were marked in the Guinness Book of Records, except one:','Pancake run','Somersault racing','Jogging with tied legs','Lap races',1),(16,'How fast was Felix Baumgartner falling after jumping from 39km altitude?','1350km/h','775km/h','1010km/h','1425km/h',4),(17,'What is the most stolen book in the world?','Bible','Guinness World Records','The Da Vinci code','Harry Potter',3),(18,'The biggest number of Big Macs consumed by one person in a lifetime is ...','121 763','12 543','28 788','9 000',2),(19,'How long was the largest hoop that one could spin at their waist?','6.2 meters','7.1 meters','8.4 meters','8 meters',4),(20,'Which of these dexterity records does not exist?','Juggling with included chainsaws','Throwing rubber boots at a distance','Cherry bone spitting','Juggling with live hedgehogs',1),(21,'What year was the first Guinness Book of Records published?','1955','1940','1964','1890',4),(22,'What is the weight of the heaviest man in the world?','466kg','635kg','561kg','732kg',3),(23,'Where did the tallest man in history live?','China','South Africa','Singapore','U.S.',1),(24,'Which celebrity has not been included in the Guinness World Records yet?','Johnny Depp','Eminem','Madonna','Shakira',4),(25,'What is the longest bicycle in the world?','25 m','35m','80m','12m',3),(26,'Whom did Jim Arrington become at the age of 83 years?','The world\'s oldest underwear model','The world\'s oldest astronaut','The world\'s oldest bodybuilder','The world\'s oldest surfer',2),(27,'In Great Britain, the oldest man in the world died, he was ... old','113 years','115 years','117 years','120 years',4),(28,'What\'s the weight of the biggest onion?','12kg','3kg','9kg','30kg',2),(29,'The largest collection of transformers consists of ...','2 111 items','3 002 items','1 506 items','100 items',4),(30,'The Guinness Book of Records mentions a wide variety of collections. Which one is not?','Packages for motion sickness from airplanes','Adhesive plaster collection','Collection of passports','Tombstone collection',1);
/*!40000 ALTER TABLE `guinness` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guinness1`
--

DROP TABLE IF EXISTS `guinness1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guinness1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guinness1`
--

LOCK TABLES `guinness1` WRITE;
/*!40000 ALTER TABLE `guinness1` DISABLE KEYS */;
INSERT INTO `guinness1` VALUES (1,'Who is the most frequently shown character in films and TV?','Sherlock Holmes','Hamlet','James Bond','Dracula',4),(2,'Which of these dexterity records does not exist?','Juggling with included chainsaws','Juggling with live hedgehogs','Throwing rubber boots at a distance','Cherry bone spitting',3),(3,'In Great Britain, the oldest man in the world died, he was ... old','113 years','115 years','117 years','120 years',4),(4,'Whom did Jim Arrington become at the age of 83 years?','The world\'s oldest astronaut','The world\'s oldest underwear model','The world\'s oldest surfer','The world\'s oldest bodybuilder',1),(5,'Which of this has not yet been eaten competitively?','Live scorpions','Glass','Metal','Caterpillars',4),(6,'The Guinness Book of Records mentions a wide variety of collections. Which one is not?','Packages for motion sickness from airplanes','Tombstone collection','Collection of passports','Adhesive plaster collection',3),(7,'What year was the first Guinness Book of Records published?','1890','1964','1940','1955',1),(8,'Maximum number of tricks performed by a pig in 1 minute ...?','5','17','13','10',2),(9,'The biggest number of Big Macs consumed by one person in a lifetime is ...','12 543','9 000','121 763','28 788',1),(10,'How long was the largest hoop that one could spin at their waist?','8.4 meters','7.1 meters','8 meters','6.2 meters',1),(11,'Where did the tallest man in history live? Singapore','3','U.S.','China','South Africa',2),(12,'What\'s the longest time a man has ever held his breath?','24 minutes','17 minutes','35 minutes','8 minutes',4),(13,'The largest collection of transformers consists of ...','2 111 items','1 506 items','3 002 items','100 items',4),(14,'All these races were marked in the Guinness Book of Records, except one:','Jogging with tied legs','Lap Races','Pancake Run','Somersault racing',3),(15,'The highest hat is ... tall','30 meters','1 meter','4.8 meters','2.7 meters',2);
/*!40000 ALTER TABLE `guinness1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guinness2`
--

DROP TABLE IF EXISTS `guinness2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guinness2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guinness2`
--

LOCK TABLES `guinness2` WRITE;
/*!40000 ALTER TABLE `guinness2` DISABLE KEYS */;
INSERT INTO `guinness2` VALUES (1,'How fast was Felix Baumgartner falling after jumping from 39km altitude?','1425km/h','775km/h','1010km/h','1350km/h',1),(2,'In which country was the most expensive chocolate created?','Ethiopia','Switzerland','Belgium','Ecuador',1),(3,'The oldest cat ever was ... years old','27','38','20','50',3),(4,'What is the record time for a man to run 100m?','9.7s','10.01s','9.58s','9.4s',2),(5,'What\'s the biggest number of children born by one mother?','69','10','21','38',4),(6,'What is the height of the tallest tree?','10m','120m','115m','110m',2),(7,'Which celebrity has not been included in the Guinness World Records yet?','Johnny Depp','Eminem','Shakira','Madonna',4),(8,'Which strength record has NOT been set yet?','Elephant car ride','Holding the car on the head','Holding concrete blocks with hair','Pulling the truck with ears',2),(9,'What is the most stolen book in the world?','Bible','The Da Vinci code','Harry Potter','Guinness World Records',1),(10,'Which of this has not been recorded in the Guinness Book yet?','The largest number of butterflies on a human body','100m race with fins','Putting masks on the face','Chainsaw juggling',4),(11,'What is the weight of the heaviest man in the world?','561kg','732kg','466kg','635kg',1),(12,'How long did it take to complete the fastest world roundtrip by bicycle?','80 days','155 days','123 days','141 days',2),(13,'What is the longest bicycle in the world?','25 m','35m','80m','12m',3),(14,'What is the longest human nail in the world?','91cm','55cm','151cm','303cm',4),(15,'What\'s the weight of the biggest onion?','3kg','12kg','9kg','30kg',2);
/*!40000 ALTER TABLE `guinness2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lifetime_best`
--

DROP TABLE IF EXISTS `lifetime_best`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lifetime_best` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nick` varchar(100) DEFAULT NULL,
  `score` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lifetime_best`
--

LOCK TABLES `lifetime_best` WRITE;
/*!40000 ALTER TABLE `lifetime_best` DISABLE KEYS */;
INSERT INTO `lifetime_best` VALUES (66,'Guest-3665e1',0),(67,'Guest-c89a95',15),(68,'BOT',52),(69,'Guest-483335',0),(70,'AshKetchum',17),(71,'Arvolear',0),(72,'Guest-eda7d6',0),(73,'Guest-2b51a2',0),(74,'Guest-1cc6b8',4),(75,'Guest-b37ed9',10),(76,'Guest-168931',44),(77,'Nhine',19),(78,'ManaMania',115),(79,'tweetious',185),(80,'Josep',129),(81,'Mobster',53),(82,'Guest-a83605',15),(83,'Guest-58babb',5),(84,'pablo',0),(85,'Eibriel',19),(86,'vrlandlord',57),(87,'Osaka',9),(88,'ALINA',89),(89,'Alx',36),(90,'RudolphFenz',20),(91,'DCLMedia',0),(92,'Guest-b31d6b',18),(93,'Bernie2020',26),(94,'Guest-5b1201',17),(95,'juxton',84),(96,'Hina',21),(97,'Guest-3fecd0',25),(98,'Saul',33),(99,'MrCartographer',0),(100,'JudasJudas',5),(101,'Marc',1),(102,'davidlionfish',16),(103,'BitcoinRich',10),(104,'Brohan',109),(105,'DannyKass',16),(106,'low808',24),(107,'Kat',15),(108,'CarlFravel',19),(109,'Noor',22),(110,'yakiki',17),(111,'Pigeon-db06ff',19),(112,'LionelMessi',46),(113,'Acidsun',21),(114,'Maxwellington',21),(115,'FundsAreSafu',17),(116,'beeple',21),(117,'lePoint#cbe6',24),(118,'Viber#c1bb',22),(119,'Meyer',8),(120,'SatoshiDCL',23),(121,'LuckyNumber9',6),(122,'Antknee',24),(123,'Khalid',6),(124,'Elal#1950',16),(125,'BIackJack',7),(126,'Kowski',40),(127,'Unikname',16),(128,'Ottakringer',15),(129,'Jessie',4),(130,'JoeTessitore',0),(131,'LlBRA',12),(132,'Penguin#ffa7',8),(133,'Geoffrey',44),(134,'IamTroll',5),(135,'PinDuoDuo',15),(136,'lePoint',8),(137,'Dimebag',18),(138,'Hioranth#1950',19),(139,'Djataki87#48e7',13),(140,'Dennis',2),(141,'JessicaGross#81ca',7),(142,'Swan#3f52',12),(143,'Raduga#dfba',5),(144,'Liuva#a3ce',10),(145,'Manamac#d3cc',38),(146,'jaf0#ef17',7),(147,'Oleksii#8323',0),(148,'Yackinlines#43b4',4),(149,'stinkysock#89d7',0),(150,'Lemur#12ed',0),(151,'Alliscollage#5130',12),(152,'SpartyBJones#7821',26),(153,'Grapenut#bc76',13),(154,'crusader#98c4',18),(155,'SailorSchmet#5ac9',12),(156,'Yione#3f52',0),(157,'Lera#7cdc',14),(158,'Anna#ab92',11),(159,'LulyM#015e',13),(160,'KevinOnEarth',15),(161,'decentralized#c8e2',2),(162,'DaveDude#6f43',10),(163,'AnnaKarenina#4bcb',3),(164,'Orchid',14),(165,'TheRezinator#9346',23),(166,'QuizMaster',26),(167,'DrGreenthumb',15),(168,'Litecoin#1e3f',0);
/*!40000 ALTER TABLE `lifetime_best` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `random_categories`
--

DROP TABLE IF EXISTS `random_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `random_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) DEFAULT NULL,
  `alias` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `random_categories`
--

LOCK TABLES `random_categories` WRITE;
/*!40000 ALTER TABLE `random_categories` DISABLE KEYS */;
INSERT INTO `random_categories` VALUES (19,'religion','Religion 1'),(20,'religion2','Religion 2'),(22,'animals','Animals 1'),(23,'animals2','Animals 2'),(24,'space1','Space 1'),(25,'space2','Space 2'),(26,'art1','Art, crypto & stuff 1'),(27,'art2','Art, crypto & stuff 2'),(28,'cinema1','Cinema & movies 1'),(29,'cinema2','Cinema & movies 2'),(30,'guinness1','Guinness records 1'),(31,'guinness2','Guinness records 2'),(32,'tech1','Tech 1'),(33,'tech2','Tech 2');
/*!40000 ALTER TABLE `random_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `random_categories_edit`
--

DROP TABLE IF EXISTS `random_categories_edit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `random_categories_edit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `random_categories_edit`
--

LOCK TABLES `random_categories_edit` WRITE;
/*!40000 ALTER TABLE `random_categories_edit` DISABLE KEYS */;
/*!40000 ALTER TABLE `random_categories_edit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `random_constants`
--

DROP TABLE IF EXISTS `random_constants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `random_constants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `max_playing_size` int DEFAULT NULL,
  `start_game_threshold` int DEFAULT NULL,
  `start_timeout` int DEFAULT NULL,
  `question_duration` int DEFAULT NULL,
  `answer_duration` int DEFAULT NULL,
  `end_timeout` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `random_constants`
--

LOCK TABLES `random_constants` WRITE;
/*!40000 ALTER TABLE `random_constants` DISABLE KEYS */;
INSERT INTO `random_constants` VALUES (1,20,2,30,20,10,30);
/*!40000 ALTER TABLE `random_constants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `religion`
--

DROP TABLE IF EXISTS `religion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `religion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `religion`
--

LOCK TABLES `religion` WRITE;
/*!40000 ALTER TABLE `religion` DISABLE KEYS */;
INSERT INTO `religion` VALUES (1,'Which of the following is NOT a major Christian nation?','India','Brazil','The Philippines','United States',4),(2,'Which religion requires men of that faith to wear turbans?','Christianity','Buddhism','Islam','Sikhism',1),(3,'An atheist is a person who:','Is indifferent to the existence of a god or gods','Believes in multiple gods','Is angry at their god','Does not believe in a god or gods',1),(4,'All of the following religions teach the existence of a creator god except:','Buddhism','Judaism','Islam','Christianity',4),(5,'Women who practice Islam often wear a:','Belt','Corset','Turban','Hijab',1),(6,'Which city are Muslims generally required to visit at least once in a lifetime?','Baghdad','Jakarta','Mecca','Cairo',2),(7,'In Islam  Mohammad is regarded as:','An angel','The messiah','A prophet','A god',2),(8,'Jewish dietary law is known as:','Halal','Mardi Gras','Kosher','Lent',2),(9,'Buddhism teaches that suffering is caused by:','Desire','Aversion','Hunger','Sex',4),(10,'Who led the Hebrew slaves out of Egypt in Jewish and Christian and Muslim belief?','Pharaoh','Moses','Cain','Noah',3),(11,'How many commandments are in the Bible?','10','9','8','7',4),(12,'What is the oldest religion?','Catholicism','Buddhism','Christianity','Islam',3),(13,'The world religion is...','Shintoism','Islam','Judaism','Buddhism',1),(14,'The division of the Christian church into western and eastern took place in...','1554','1054','1254','554',3),(15,'The sacred book of Muslims is...','They have no holy book','Bible','Quran','Talmud',2);
/*!40000 ALTER TABLE `religion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `religion2`
--

DROP TABLE IF EXISTS `religion2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `religion2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `religion2`
--

LOCK TABLES `religion2` WRITE;
/*!40000 ALTER TABLE `religion2` DISABLE KEYS */;
INSERT INTO `religion2` VALUES (1,'What is the name of the teaching on the transmigration of souls?','Biology','Soulification','Reincarnation','Synchronization',2),(2,'Who according to biblical texts was the first person on Earth?','Avel','Adam','Noah','Eva',3),(3,'Who was the founder of Buddhism?','Princess','Queen','King','Prince',1),(4,'Where did Confucianism first appear?','In Africa','In America','In Asia','In Europe',2),(5,'On which day of the week it is forbidden for Jews to work?','On Sunday','On Saturday','On Friday','On Monday',3),(6,'What is the name of the devil in Islam?','Muhammad','John','Tom','Iblis',1),(7,'Which world religion has the largest number of believers?','Judaism','Christianity','Buddhism','Islam',3),(8,'What is the name of the Buddhist architectural place of worship?','Baba','Mosque','Stupa','Church',2),(9,'How many times did Jesus fall on the way to Calvary?','0','1','2','3',1),(10,'Which of the following religions believe in reincarnation?','Judaism','Christianity','Buddhism','Islam',2),(11,'Which religion believes that God came to Earth as Jesus Christ?','Judaism','Christianity','Buddhism','Islam',3),(12,'Who betrayed Jesus?','Devil','John','Peter','Judas',1),(13,'Who was the first to discover that Jesus had risen?','Joseph','Simon','Mary Magdalene','Veronica',2),(14,'What is the name of the country which main religion is Judaism?','Russia','USA','Ukraine','Israel',1),(15,'Allah is a God in...','Judaism','Buddhism','Islam','Christianity',2);
/*!40000 ALTER TABLE `religion2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space`
--

DROP TABLE IF EXISTS `space`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `space` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space`
--

LOCK TABLES `space` WRITE;
/*!40000 ALTER TABLE `space` DISABLE KEYS */;
INSERT INTO `space` VALUES (2,'Which scientist invented the space rocket?','Alexei Leonov','Yuri Gagarin','Konstantin Tsiolkovsky','Edward White',2),(3,'How many tonnes of space debris orbiting the Earth?','27500','8200','150','100',3),(4,'How many kilometres does the Earth fly every minute ?','12 400','19 300','56 000','20 000',3),(5,'What colour is a sunset on Mars?','Blue','Green','Red','Brown',4),(6,'How long is one year on Venus ?','Just like on Earth','224 Earth days','140 Earth days','501 Earth days',3),(7,'99.4% of the mass of the Solar System is the mass of...','Sun','Earth','Jupiter','Neptune',4),(8,'How much does it cost to buy a small piece of land on the moon?','$10 thousand','$50 thousand','$100 thousand','$4 thousand',1),(9,'What is the smallest planet in the Solar System by mass?','Earth','Mars','Mercury','Jupiter',2),(10,'What do Venus and Mercury have in common?','Nothing','They do not rotate','They are both the surnames of pop stars','They have no moons',1),(11,'What will happen to tears if we cry in space?','They will fly','You can\'t cry in space','They will leak in the nose','They\'ll stay on the eyes and face',1),(12,'Yuri Gagarin made the first flight into space on April 1961. What was the name of the ship?','“South”','“West”','“East”','“North”',2),(13,'How big can a black hole be?','The size of Mars','The size of London','The size of several million suns','The size of a football field',2),(14,'Who invented the telescope?','Galileo','Johannes Kepler','Hypatia','Hans Lippershey',1),(15,'What two motions do all planets have?','Twist and shout','Orbit and spin','Wiggle and wobble','Rock and roll',3),(16,'How many years does it take to fly from Earth to Pluto?','5 years','12 years','2 years','1 year',3),(17,'Which country launched the first satellite?','USA','Italy','USSR','Australia',2),(18,'Which planet has the most satellites?','Earth','Saturn','Mercury','Jupiter',1),(19,'What is the hottest planet in the Solar System?','Saturn','Venus','Mars','Earth but only during August',3),(20,'What was the name of the person who first landed on the moon?','Neil Armstrong','Yuri Gagarin','Harrison Schmitt','Alexei Leonov',4),(21,'Who was the first to go into outer space?','Alexei Leonov','Edward White','German Titov','Yuri Gagarin',1),(22,'What is the name of the planet closest to the Sun?','Mercury','Earth','Jupiter','Pluto',4),(23,'What is the name of the first space tourist?','Dennis Tito','Edward White','Jeff Bezos','Richard Branson',4),(24,'The Milky Way Galaxy is on its ... existence','Middle','End','Early','This galaxy doesn\'t exist',4),(25,'How many planets with the size as the planet Earth can Jupiter contain?','50','200','1000','1',2),(26,'What surrounds a black hole?','Tiny planets','A ring of bright light','No one knows','Space dust, stars and galaxies',1),(27,'The name of first woman astronaut is ...','Peggy Whitson','Svetlana Savitskaya','Jessica Ulrika Meir','Valentina Tereshkova',1),(28,'How is a black hole formed?','When the fabric of the universe tears','When a star explodes at the end of its cycle','When a small planet explodes','They just appear',3),(29,'What is the comet nucleus made of?','Ice, dust and organic materials','Fire','Radio waves','Helium and water',4),(30,'In space there\'s no ...','Sound','Taste','Sensations','Colors',4),(31,'What unites all these planets (Jupiter, Saturn, Uranus, Neptune)?','They are near Sun','They have one satellite','They don\'t have a solid surface','They are the same area',2);
/*!40000 ALTER TABLE `space` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space1`
--

DROP TABLE IF EXISTS `space1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `space1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space1`
--

LOCK TABLES `space1` WRITE;
/*!40000 ALTER TABLE `space1` DISABLE KEYS */;
INSERT INTO `space1` VALUES (1,'How many tonnes of space debris orbiting the Earth?','100','150','27500','8200',1),(2,'How long is one year on Venus ?','501 earth days','224 earth days','Just like on earth','140 days',3),(3,'What colour is a sunset on Mars?','Red','Brown','Blue','Green',2),(4,'What is the comet nucleus made of?','Fire','Ice and dust and organic materials','Radio waves','Helium and water',3),(5,'How much does it cost to buy a small piece of land on the moon?','$100 thousand','$10 thousand','$50 thousand','$4 thousand',1),(6,'How many years does it take to fly from Earth to Pluto?','12 years','2 years','5 years','1 year',4),(7,'In space there\'s no...','Colors','Taste','Sensations','Sound',1),(8,'What is the smallest planet in the solar system by mass?','Mercury','Earth','Jupiter','Mars',4),(9,'What two motions do all planets have?','Wiggle and wobble','Twist and shout','Orbit and spin','Rock and roll',2),(10,'What unites all these planets (Jupiter, Saturn, Uranus, Neptune)?','They are near Sun','They have one satellite','They don\'t have a solid surface','They are the same area',2),(11,'What will happen to tears if we cry in space?','They will fly','They\'ll stay on the eyes and face','You can\'t cry in space','They will leak in the nose',3),(12,'The Milky Way Galaxy is on its ... existence','Early','This galaxy doesn\'t exist','Middle','End',2),(13,'Who invented the telescope?','Hans Lippershey','Johannes Kepler','Galileo','Hypatia',4),(14,'How many planets with the size as the planet Earth can Jupiter contain?','1','50','200','1000',1),(15,'How many kilometres does the Earth fly every minute ?','19 300','12 400','56 000','20 000',4);
/*!40000 ALTER TABLE `space1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space2`
--

DROP TABLE IF EXISTS `space2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `space2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space2`
--

LOCK TABLES `space2` WRITE;
/*!40000 ALTER TABLE `space2` DISABLE KEYS */;
INSERT INTO `space2` VALUES (1,'99.4% of the mass of the solar system is the mass of ...','Neptune','Sun','Earth','Jupiter',3),(2,'What is the name of the first space tourist?','Richard Branson','Edward White','Dennis Tito','Jeff Bezos',2),(3,'Which country launched the first satellite?','USSR','USA','Australia','Italy',4),(4,'Who was the first to fly into outer space?','German Titov','Yuri Gagarin','Alexei Leonov','Edward White',3),(5,'How big can a black hole be?','The size of several million suns','The size of London','The size of a football field','The size of Mars',4),(6,'Which scientist invented the space rocket?','Yuri Gagarin','Edward White','Alexei Leonov','Konstantin Tsiolkovsky',1),(7,'Which planet has the most satellites?','Jupiter','Mercury','Saturn','Earth',4),(8,'What surrounds a black hole?','No one knows','Tiny planets','A ring of bright light','Space dust and stars and galaxies',1),(9,'The name of first woman astronaut is ...','Valentina Tereshkova','Svetlana Savitskaya','Jessica Ulrika Meir','Peggy Whitson',4),(10,'What is the name of the planet closest to the Sun?','Pluto','Mercury','Jupiter','Earth',3),(11,'What do Venus and Mercury have in common?','They are both the surnames of pop stars','Nothing','They have no moons','They do not rotate',2),(12,'What was the name of the person who first landed on the moon?','Harrison Schmitt','Neil Armstrong','Yuri Gagarin','Alexei Leonov',3),(13,'How is a black hole formed?','When the fabric of the universe tears','They just appear','When a small planet explodes','When a star explodes at the end of its cycle',1),(14,'Yuri Gagarin made the first flight into space on April 1961. What was the name of the ship?','“South”','“East”','“West”','“North”',3),(15,'What is the hottest planet in the Solar System?','Earth but only during August','Venus','Mars','Saturn',3);
/*!40000 ALTER TABLE `space2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tech1`
--

DROP TABLE IF EXISTS `tech1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tech1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tech1`
--

LOCK TABLES `tech1` WRITE;
/*!40000 ALTER TABLE `tech1` DISABLE KEYS */;
INSERT INTO `tech1` VALUES (1,'What is POS?','Picture of sun','Post scriptum','Proof of stake','Point of sales',2),(2,'Which car company made the humanoid robot ASIMO?','Toyota','Mitsubishi','Nissan','Honda',1),(3,'How much MANA was spent in the first land auction?','Less then 10 mln usd','More than 10 mln usd','Not more then 1 mln usd','Not known exactly',3),(4,'Who invented the World Wide Web?','Mark Zuckerberg','Al Gore','Tim Berners-Lee','Vint Cerf',2),(5,'When was the first MANA transaction?','Yesterday','More than three years ago','2.5 years ago','Two years ago',3),(6,'What % of BTC has been mined yet?','100','88','76','91',3),(7,'How many pounds the first 5MB hard drive approximately weighed?','Over 2000','500','Under 250','1000',4),(8,'Up to what height (m) can you build in a 2х2 DCL parcel plot?','60m','40m','46m','52m',2),(9,'What does the acronym URL stand for?','Universal Resource Location','Unit Return Location','Unified Reference Link','Universal Resource Locator',1),(10,'What does \"SAFU\" mean?','Miso soup','Soap opera','Safe','Super',2),(11,'How much BTC were paid for those 2 pizzas?','5000','10000','50000','100000',3),(12,'What is X Æ A-12?','Video-game','Token standart in EOS','Fighter aircraft','Someone\'s son',1),(13,'What of these is the token standard for NFT?','ERC-1155','ERC-720','ERC-731','ERC-725',4),(14,'How many land parcels total are there in DCL?','120000','90000','100000','150000',3),(15,'Roughly how many computer languages are known in the world?','2000','5000','600','50',4);
/*!40000 ALTER TABLE `tech1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tech2`
--

DROP TABLE IF EXISTS `tech2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tech2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tech2`
--

LOCK TABLES `tech2` WRITE;
/*!40000 ALTER TABLE `tech2` DISABLE KEYS */;
INSERT INTO `tech2` VALUES (1,'What was the highest price paid for estate in DCL in Mana?','4 230 000','2 772 000','1 658 000','999 000',3),(2,'What does \"FOMO\" mean?','Fear of Mortgage Originators','Fear Of Missed Opportunity','Fear Of Missing Out','Fear Of Massive Orders',2),(3,'In which city Bill Gates and Paul Allen found Microsoft?','Albuquerque','Salt Lake City','Seattle','Los Altos',4),(4,'When was MANA smart contract published?','October 2017','Аugust 2017','December 2017','June 2017',3),(5,'What was the highest price a DCL wearable sold for in ETH?','70','20','33','150',2),(6,'What was the initial shape of the land plot?','Hexagon','Octagon','parallelogram','Triangle',4),(7,'When was the official DCL launch?','2 years ago','9 months ago','Year ago','More then year ago',3),(8,'What does \"DEFI\" mean?','Crypto Currency','Type Of Ethermon','Decentralized Finance','Decentralization Fundamentals',2),(9,'The term \"Bull Market\" means?','A Market That Is On The Rise','Butchers Shop (Meat Market)','A Group Of Three Or More Bulls','Marketplace To Buy Bulls',4),(10,'Which of these items is not considered as a collectible?','Cigarette Packets','Virtual Clothing','Bottle Caps','There is no right answer',1),(11,'Cryptocurrencies market capitalization is approximately …','600B dollars','300B dollars','500B dollars','200B dollars',2),(12,'How much MANA was the prize pool for the 1st Game Jame In DCL?','500k MANA','5 millions MANA','1 million MANA','2.5 millions MANA',1),(13,'DCL team head office is located in ...','Argentina','Moscow','New York','Genesis plaza',4),(14,'Which was the first NFT project?','Crypto Kitties','Decentraland','Crypo Punks','Gods Unchained',2),(15,'QR codes, first created in 1994, were used as a way to track what?','Phone calls using robots.','Website URLs','Vehicles as they were manufactured','FedEx packages at shipping facilities',2);
/*!40000 ALTER TABLE `tech2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test1`
--

DROP TABLE IF EXISTS `test1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test1`
--

LOCK TABLES `test1` WRITE;
/*!40000 ALTER TABLE `test1` DISABLE KEYS */;
/*!40000 ALTER TABLE `test1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timed_categories`
--

DROP TABLE IF EXISTS `timed_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timed_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) DEFAULT NULL,
  `alias` varchar(100) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timed_categories`
--

LOCK TABLES `timed_categories` WRITE;
/*!40000 ALTER TABLE `timed_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `timed_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timed_categories_edit`
--

DROP TABLE IF EXISTS `timed_categories_edit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timed_categories_edit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timed_categories_edit`
--

LOCK TABLES `timed_categories_edit` WRITE;
/*!40000 ALTER TABLE `timed_categories_edit` DISABLE KEYS */;
INSERT INTO `timed_categories_edit` VALUES (88,'ai'),(92,'test1'),(97,'Capital_Cities_World'),(98,'General_Sports');
/*!40000 ALTER TABLE `timed_categories_edit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timed_categories_finished`
--

DROP TABLE IF EXISTS `timed_categories_finished`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timed_categories_finished` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) DEFAULT NULL,
  `alias` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timed_categories_finished`
--

LOCK TABLES `timed_categories_finished` WRITE;
/*!40000 ALTER TABLE `timed_categories_finished` DISABLE KEYS */;
INSERT INTO `timed_categories_finished` VALUES (13,'Animal_Quiz_Test','Animal Quiz Demo'),(16,'Tech_quiz_launch','Tech (duplicate)'),(18,'space','Space'),(20,'art_and_crypto','Art, crypto & stuff'),(21,'cinema','Cinema & movies'),(22,'guinness','Guinness Records'),(23,'football','Football (soccer)'),(24,'fashion','Fashion & cosmetics'),(26,'fashion_coin_1','Proof of Love'),(27,'fashion_coin_2','Fashion Coin'),(28,'vogue','Vogue Themed'),(31,'Video_Game_Quiz','Video Game Quiz');
/*!40000 ALTER TABLE `timed_categories_finished` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timed_constants`
--

DROP TABLE IF EXISTS `timed_constants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timed_constants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `max_playing_size` int DEFAULT NULL,
  `block_other_parties_timeout` int DEFAULT NULL,
  `start_game_threshold` int DEFAULT NULL,
  `start_timeout` int DEFAULT NULL,
  `question_duration` int DEFAULT NULL,
  `answer_duration` int DEFAULT NULL,
  `end_timeout` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timed_constants`
--

LOCK TABLES `timed_constants` WRITE;
/*!40000 ALTER TABLE `timed_constants` DISABLE KEYS */;
INSERT INTO `timed_constants` VALUES (1,250,1800,2,300,20,10,60);
/*!40000 ALTER TABLE `timed_constants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vogue`
--

DROP TABLE IF EXISTS `vogue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vogue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vogue`
--

LOCK TABLES `vogue` WRITE;
/*!40000 ALTER TABLE `vogue` DISABLE KEYS */;
INSERT INTO `vogue` VALUES (1,'Which model has appeared on the cover of Vogue magazine most often?','Gigi Hadid','Kendall Jenner','Kate Moss','Jean Shrimpton',2),(2,'When did the world see the first issue of Vogue magazine?','June 13 in 1991','November 24 in 1915','December 17 in 1892','March 1 in 1980',2),(3,'At what age did Vogue first write about Fashion Coin creator Anna K?','When she was 16','When she was 21','When she was 18','When she was 20',4),(4,'How many pages are in the largest issue of Vogue magazine?','1007','916','813','890',3),(5,'How often are Vogue issues released?','Monthly','Yearly','Weekly','Semesterly',4),(6,'Who is the editor-in-chief of the American edition of Vogue?','Alexandra Shulman','Carine Roitfeld','Julia pelipas','Anna Wintour',1),(7,'In how many countries is Vogue published?','In 24','In 19','In 22','In 20',2),(8,'Which Vogue eco-friendly release was the first?','Vogue India','Vogue USA','Vogue Paris','Vogue Italia',2),(9,'What Vogue issue is considered the most important of the year?','October','January','March','September',1),(10,'How many dogs appeared on the cover of Vogue magazine?','13','90','110','34',3);
/*!40000 ALTER TABLE `vogue` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-30 16:43:03

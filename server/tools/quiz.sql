-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: quiz
-- ------------------------------------------------------
-- Server version	8.0.21-0ubuntu0.20.04.4

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
-- Table structure for table `Sans_family`
--

DROP TABLE IF EXISTS `Sans_family`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sans_family` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `variant4` varchar(50) DEFAULT NULL,
  `variant3` varchar(50) DEFAULT NULL,
  `variant2` varchar(50) DEFAULT NULL,
  `variant1` varchar(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sans_family`
--

LOCK TABLES `Sans_family` WRITE;
/*!40000 ALTER TABLE `Sans_family` DISABLE KEYS */;
INSERT INTO `Sans_family` VALUES (1,'Does Sam have kids?','Only in DCL','>10','Yes','No',2),(2,'Does Sam\'s wife speak Russian?','Definitely not','A little bit','No','Very well',1),(3,'What is Sam\'s last name?','Avatarov','Hamilton','Ivanov','Sammich',3),(4,'When did Sam live in London?','90s','80s','2020','2010',4),(5,'Is Sam\'s grandpa Ukrainian?','Father is Ukrainian','Grandma is Ukrainian','No','Yes',2);
/*!40000 ALTER TABLE `Sans_family` ENABLE KEYS */;
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
  `variant4` char(50) DEFAULT NULL,
  `variant3` char(50) DEFAULT NULL,
  `variant2` char(50) DEFAULT NULL,
  `variant1` char(50) DEFAULT NULL,
  `answer` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai`
--

LOCK TABLES `ai` WRITE;
/*!40000 ALTER TABLE `ai` DISABLE KEYS */;
INSERT INTO `ai` VALUES (4,'Most AIs (like Alexa, Siri) are ...','Women','Men','Robots','Children',2),(5,'AI displaces people from ...','Exchange','Earth','Labor market','Home',2),(6,'Which company developed Alexa?','Amazon','Apple','Google','Yandex',4);
/*!40000 ALTER TABLE `ai` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lifetime_best`
--

LOCK TABLES `lifetime_best` WRITE;
/*!40000 ALTER TABLE `lifetime_best` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `random_categories`
--

LOCK TABLES `random_categories` WRITE;
/*!40000 ALTER TABLE `random_categories` DISABLE KEYS */;
INSERT INTO `random_categories` VALUES (4,'religion','Religion'),(5,'ai','AI');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
INSERT INTO `random_constants` VALUES (1,10,1,10,5,3,10);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `religion`
--

LOCK TABLES `religion` WRITE;
/*!40000 ALTER TABLE `religion` DISABLE KEYS */;
INSERT INTO `religion` VALUES (1,'What is the name of the devil in Islam?','Iblis','Tom','John','Muhammad',4),(2,'Who, according to the Bible, was the first person on Earth?','Eva','Noah','Adam','Avel',2),(3,'What is the oldest religion?','Islam','Christianity','Buddhism','Catholicism',2);
/*!40000 ALTER TABLE `religion` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space`
--

LOCK TABLES `space` WRITE;
/*!40000 ALTER TABLE `space` DISABLE KEYS */;
INSERT INTO `space` VALUES (2,'Which two motions do all planets have?','Twist and shout','Orbit and spin','Rock and roll','Wiggle and wobble',3),(3,'What is the hottest planet in the Solar System?','Mars','Earth, but only in August','Venus','Saturn',2),(5,'In space, there\'s no ...','Colors','Sensations','Taste','Sound',1);
/*!40000 ALTER TABLE `space` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timed_categories_edit`
--

LOCK TABLES `timed_categories_edit` WRITE;
/*!40000 ALTER TABLE `timed_categories_edit` DISABLE KEYS */;
INSERT INTO `timed_categories_edit` VALUES (44,'space'),(52,'Sans_family');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timed_categories_finished`
--

LOCK TABLES `timed_categories_finished` WRITE;
/*!40000 ALTER TABLE `timed_categories_finished` DISABLE KEYS */;
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
INSERT INTO `timed_constants` VALUES (1,100,60,1,20,10,5,20);
/*!40000 ALTER TABLE `timed_constants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-11 15:14:52

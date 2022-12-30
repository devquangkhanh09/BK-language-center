-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: language_center
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `course_curriculum`
--

DROP TABLE IF EXISTS `course_curriculum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_curriculum` (
  `course_id` char(5) COLLATE utf8mb4_general_ci NOT NULL,
  `lecture` int NOT NULL DEFAULT '1',
  `description` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`course_id`,`lecture`),
  CONSTRAINT `course_curriculum_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `course_curriculum_chk_1` CHECK ((`lecture` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_curriculum`
--

LOCK TABLES `course_curriculum` WRITE;
/*!40000 ALTER TABLE `course_curriculum` DISABLE KEYS */;
INSERT INTO `course_curriculum` VALUES ('FD-01',1,'Noun'),('FD-01',2,'Verd'),('FD-01',3,'Adjentive'),('FD-01',4,'Adverb'),('FD-01',5,'Sentences'),('FD-01',6,'Linking verb'),('FD-01',7,'Greeting'),('FD-01',8,'Tag question'),('FD-01',9,'Conjunction'),('FD-01',10,'WH-question'),('FD-02',1,'Present simple'),('FD-02',2,'Present continous'),('FD-02',3,'Present perfect'),('FD-02',4,'Past simple'),('FD-02',5,'Past continous'),('FD-02',6,'Past perfect'),('FD-02',7,'Future simple'),('FD-02',8,'Future continous'),('FD-02',9,'Future perfect'),('FD-02',10,'WH-question'),('JR-01',1,'Tense'),('JR-01',2,'Idiom'),('JR-01',3,'Phrasel verb'),('JR-01',4,'Tag question'),('JR-01',5,'Paragraph'),('JR-01',6,'Speaking about hobby'),('JR-01',7,'Reading sample article'),('JR-01',8,'Speaking with foreign'),('JR-01',9,'Test SP-WR'),('JR-01',10,'Test LC-RC'),('JR-02',1,'Reading'),('JR-02',2,'Listening'),('JR-02',3,'Writing'),('JR-02',4,'Speaking'),('JR-02',5,'Test 1'),('JR-02',6,'Test 2'),('LS-01',1,'111'),('LS-01',2,'222'),('LS-01',3,'333'),('LS-01',4,'444'),('LS-01',5,'555'),('RD-01',1,'abc'),('RD-01',2,'def'),('RD-01',3,'xyz');
/*!40000 ALTER TABLE `course_curriculum` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-31  0:13:13

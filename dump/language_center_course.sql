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
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` char(5) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'OVERALL',
  `requirement` float NOT NULL DEFAULT '0',
  `target` float NOT NULL DEFAULT '0',
  `cost` float DEFAULT NULL,
  `numOfLecture` int DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  CONSTRAINT `course_chk_1` CHECK (regexp_like(`course_id`,_utf8mb4'[A-Z]{2}-[0-9]{2}')),
  CONSTRAINT `course_chk_2` CHECK ((`type` in (_utf8mb4'OVERALL',_utf8mb4'LISTENING',_utf8mb4'READING',_utf8mb4'WRITING',_utf8mb4'SPEAKING'))),
  CONSTRAINT `course_chk_3` CHECK ((`requirement` in (0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9))),
  CONSTRAINT `course_chk_4` CHECK ((`target` in (0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9))),
  CONSTRAINT `course_chk_5` CHECK ((`target` > `requirement`)),
  CONSTRAINT `course_chk_6` CHECK ((`cost` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('FD-01','IELTS Foundation 1','OVERALL',0,3,5000000,10),('FD-02','IELTS Foundation 2','OVERALL',3,4,5000000,10),('JR-01','IELTS Junior','OVERALL',4,5,7500000,10),('JR-02','IELTS Junior 2','OVERALL',5,6,10000000,6),('LS-01','IELTS Listening 1','LISTENING',0,3,2500000,10),('SR-01','IELTS Senior','OVERALL',6,7,10000000,10);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-16 22:30:28

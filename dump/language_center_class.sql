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
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `course_id` char(5) COLLATE utf8mb4_general_ci NOT NULL,
  `class_id` char(7) COLLATE utf8mb4_general_ci NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `form` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `branch_id` char(4) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `room` char(3) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `time` int DEFAULT NULL,
  `teacher_id` char(9) COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `numOfStudent` int DEFAULT NULL,
  `maxStudent` int DEFAULT '20',
  PRIMARY KEY (`course_id`,`class_id`),
  KEY `branch_id` (`branch_id`,`room`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `class_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `class_ibfk_2` FOREIGN KEY (`branch_id`, `room`) REFERENCES `classroom` (`branch_id`, `room`),
  CONSTRAINT `class_ibfk_3` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`),
  CONSTRAINT `class_chk_1` CHECK (regexp_like(`class_id`,_utf8mb4'[0-9]{4}-[0-9]{2}')),
  CONSTRAINT `class_chk_2` CHECK ((`start_date` >= _utf8mb4'2022-09-01')),
  CONSTRAINT `class_chk_3` CHECK ((`start_date` < `end_date`)),
  CONSTRAINT `class_chk_4` CHECK ((`form` in (_utf8mb4'online',_utf8mb4'offline'))),
  CONSTRAINT `class_chk_5` CHECK (((`time` >= 1) and (`time` <= 6))),
  CONSTRAINT `class_chk_6` CHECK ((`numOfStudent` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES ('FD-02','2022-04','2022-11-07','2023-01-09','online',NULL,NULL,1,'TC-010999','',0,20),('FD-02','2022-05','2022-11-07','2023-01-09','offline','SG01','101',1,'TC-010355','',0,20),('FD-02','2022-06','2022-11-01','2023-01-03','offline','BD01','102',2,'TC-010355','',7,20),('FD-02','2022-07','2022-11-03','2023-01-05','offline','SG01','201',4,'TC-010999','',0,20),('LS-01','2023-01','2023-01-04','2023-03-08','offline','SG02','101',3,'TC-201033','incoming',0,20),('LS-01','2023-02','2022-10-19','2022-12-21','online',NULL,NULL,3,'TC-201033','current',0,20);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-16 22:30:27

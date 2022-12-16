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
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `course_id` char(5) COLLATE utf8mb4_general_ci NOT NULL,
  `class_id` char(7) COLLATE utf8mb4_general_ci NOT NULL,
  `student_id` char(9) COLLATE utf8mb4_general_ci NOT NULL,
  `lecture` int NOT NULL,
  `status` varchar(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `note` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`course_id`,`class_id`,`student_id`,`lecture`),
  KEY `course_id` (`course_id`,`lecture`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`course_id`, `class_id`, `student_id`) REFERENCES `student_class` (`course_id`, `class_id`, `student_id`),
  CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`course_id`, `lecture`) REFERENCES `course_curriculum` (`course_id`, `lecture`),
  CONSTRAINT `attendance_chk_1` CHECK ((`status` in (_utf8mb4'A',_utf8mb4'P')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES ('FD-02','2022-06','SD-000492',1,'P',''),('FD-02','2022-06','SD-000492',2,'P',''),('FD-02','2022-06','SD-000492',3,'P',''),('FD-02','2022-06','SD-000494',1,'P',''),('FD-02','2022-06','SD-000494',2,'P',''),('FD-02','2022-06','SD-000494',3,'P',''),('FD-02','2022-06','SD-000495',1,'P',''),('FD-02','2022-06','SD-000495',2,'P',''),('FD-02','2022-06','SD-000495',3,'P',''),('FD-02','2022-06','SD-000496',1,'A','sick'),('FD-02','2022-06','SD-000496',2,'A','sick'),('FD-02','2022-06','SD-000496',3,'P',''),('FD-02','2022-06','SD-000497',1,'P',''),('FD-02','2022-06','SD-000497',2,'P',''),('FD-02','2022-06','SD-000497',3,'P',''),('FD-02','2022-06','SD-000498',1,'P',''),('FD-02','2022-06','SD-000498',2,'P',''),('FD-02','2022-06','SD-000498',3,'P',''),('FD-02','2022-06','SD-000499',1,'A','work'),('FD-02','2022-06','SD-000499',2,'P',''),('FD-02','2022-06','SD-000499',3,'P','  ');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
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

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
-- Table structure for table `student_class`
--

DROP TABLE IF EXISTS `student_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_class` (
  `course_id` char(5) COLLATE utf8mb4_general_ci NOT NULL,
  `class_id` char(7) COLLATE utf8mb4_general_ci NOT NULL,
  `student_id` char(9) COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `grade_overall` float DEFAULT NULL,
  `grade_listening` float DEFAULT NULL,
  `grade_reading` float DEFAULT NULL,
  `grade_writing` float DEFAULT NULL,
  `grade_speaking` float DEFAULT NULL,
  `register_date` date DEFAULT NULL,
  PRIMARY KEY (`course_id`,`class_id`,`student_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `student_class_ibfk_1` FOREIGN KEY (`course_id`, `class_id`) REFERENCES `class` (`course_id`, `class_id`),
  CONSTRAINT `student_class_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  CONSTRAINT `student_class_chk_1` CHECK ((`status` in (_utf8mb4'paid',_utf8mb4'unpaid'))),
  CONSTRAINT `student_class_chk_2` CHECK ((`grade_overall` in (0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9))),
  CONSTRAINT `student_class_chk_3` CHECK ((`grade_listening` in (0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9))),
  CONSTRAINT `student_class_chk_4` CHECK ((`grade_reading` in (0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9))),
  CONSTRAINT `student_class_chk_5` CHECK ((`grade_writing` in (0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9))),
  CONSTRAINT `student_class_chk_6` CHECK ((`grade_speaking` in (0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9))),
  CONSTRAINT `student_class_chk_7` CHECK ((`register_date` >= _utf8mb4'2022-09-01'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_class`
--

LOCK TABLES `student_class` WRITE;
/*!40000 ALTER TABLE `student_class` DISABLE KEYS */;
INSERT INTO `student_class` VALUES ('FD-02','2022-06','SD-000492','paid',6.5,7,5.5,5.5,7,'2022-09-01'),('FD-02','2022-06','SD-000494','paid',7,6.5,9,4.5,7.5,'2022-09-05'),('FD-02','2022-06','SD-000495','unpaid',3.5,0,7.5,1.5,4.5,'2022-09-15'),('FD-02','2022-06','SD-000496','paid',2,0,6,0.5,1,'2022-09-30'),('FD-02','2022-06','SD-000497','unpaid',2.5,4,6.5,0,0,'2022-10-01'),('FD-02','2022-06','SD-000498','unpaid',5,6.5,4,6.5,3.5,'2022-10-02'),('FD-02','2022-06','SD-000499','unpaid',4.5,0,7,8.5,3,'2022-11-01');
/*!40000 ALTER TABLE `student_class` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `updateAttendants` AFTER INSERT ON `student_class` FOR EACH ROW UPDATE class SET numOfStudent = numOfStudent + 1 WHERE
        course_id = NEW.course_id
            AND class_id = NEW.class_id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `updateLevelStudent` AFTER UPDATE ON `student_class` FOR EACH ROW BEGIN
    UPDATE student 
    SET level_overall = calculate_overall(NEW.grade_listening, NEW.grade_reading, NEW.grade_writing, NEW.grade_speaking) , level_listening = NEW.grade_listening , level_reading = NEW.grade_reading , level_writing = NEW.grade_writing , level_speaking = NEW.grade_speaking 
    WHERE id = NEW.student_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-31  0:13:13

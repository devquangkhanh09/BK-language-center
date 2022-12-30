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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` char(9) COLLATE utf8mb4_general_ci NOT NULL,
  `ssn` varchar(12) COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` char(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `user_chk_1` CHECK (regexp_like(`id`,_utf8mb4'(TC|SD)-[0-9]{6}')),
  CONSTRAINT `user_chk_2` CHECK (regexp_like(`ssn`,_utf8mb4'[0-9]{9}|[0-9]{12}')),
  CONSTRAINT `user_chk_3` CHECK (regexp_like(`username`,_utf8mb4'[a-zA-Z0-9]+')),
  CONSTRAINT `user_chk_4` CHECK (regexp_like(`password`,_utf8mb4'[a-zA-Z0-9]+')),
  CONSTRAINT `user_chk_5` CHECK (regexp_like(`phone_number`,_utf8mb4'[0-9]{10}')),
  CONSTRAINT `user_chk_6` CHECK ((`email` like _utf8mb4'%@%'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('SD-000492','042905305333','Pham Huyen Khanh','khanh123','bc22','0938887051','khanh2002@gmail.com','Dong Hoa ward, Di An district, Binh Duong'),('SD-000493','261000107','Tran Van Tuan','tuankute','aaaa','0943494094','toitentuan@gmail.com','Dong Hoa ward, Di An district, Binh Duong'),('SD-000494','042905305391','Nguyen Thi Kim Vu','vuuukim','coss10','0934280008','vunguyenthikim@gmail.com','Dong Hoa ward, Di An district, Binh Duong'),('SD-000495','042905305449','Pham Xuan Khai','khai','123','0929672965','aiki@gmail.com','Dong Hoa ward, Di An district, Binh Duong'),('SD-000496','042905305507','Le Quang Anh','lqaaaaa','ff92','0925065922','youknowwho@gmail.com','Dong Hoa ward, Di An district, Binh Duong'),('SD-000497','042905305565','Huynh Tan Phat','phatne09','valophat','0920458879','testingmm@gmail.com','Dong Hoa ward, Di An district, Binh Duong'),('SD-000498','261592118','Tran Thi Kieu Duong','vv1','duong','0915851836','duongtran02@gmail.com','Dong Hoa ward, Di An district, Binh Duong'),('SD-000499','261588031','Ngo Ba Kha','khabanh','30113','0911244793','khabanh@gmail.com','Dong Hoa ward, Di An district, Binh Duong'),('SD-000500','261583944','Tran Quoc Hung','hunggg1','tttttt','0906637750','totoro@gmail.com','Dong Hoa ward, Di An district, Binh Duong'),('SD-000501','261579857','Nguyen Quang Khanh','khanhnq','bkqk','0902030707','khanhnguyen@gmail.com','Dong Hoa ward, Di An district, Binh Duong'),('TC-010355','068202111999','Nguyen Thi Thu Huong','huongntt','123','0123456789','thuhuong@gmail.com','Linh Trung ward, Thu Duc city, Ho Chi Minh'),('TC-010999','068201459088','Nguyen Van Hung','hungnv','9202','0706880704','hungnguyen@gmail.com','Ward 4, District 8, Ho Chi Minh'),('TC-201033','261592320','Nguyen Thanh Hoang','hoangnt','1999','0982555801','thanhhoang@gmail.com','Ward 14, District 10, Ho Chi Minh');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-31  0:13:14

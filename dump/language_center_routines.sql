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
-- Dumping routines for database 'language_center'
--
/*!50003 DROP FUNCTION IF EXISTS `calculate_meet_requirement` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `calculate_meet_requirement`(
	`_course_id` CHAR(5)
) RETURNS int
BEGIN
	DECLARE `_result` INT;
    DECLARE `_type` VARCHAR(10);
    DECLARE `_target` FLOAT;
    
    SELECT `type`, `target`
    INTO `_type`, `_target`
    FROM `course`
    WHERE `course_id` = `_course_id`;
    
    SELECT count(*)
    INTO `_result`
    FROM `student_class`
    WHERE (
		`course_id` = `_course_id` AND
        ((`_type` = 'OVERALL' AND `grade_overall` >= `_target`) OR
        (`_type` = 'LISTENING' AND `grade_listening` >= `_target`) OR
        (`_type` = 'READING' AND `grade_reading` >= `_target`) OR
        (`_type` = 'WRITING' AND `grade_writing` >= `_target`) OR
        (`_type` = 'SPEAKING' AND `grade_speaking` >= `_target`))
    );
    
    RETURN `_result`;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `calculate_overall` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `calculate_overall`(
	`_listening` FLOAT,
    `_reading` FLOAT,
    `_writing` FLOAT,
    `_speaking` FLOAT
) RETURNS float
    DETERMINISTIC
BEGIN
	DECLARE `_overall` FLOAT;
    SET `_overall` := (`_listening` + `_reading` + `_writing` + `_speaking`) / 4;
    SET `_overall` := floor(`_overall` * 2  + 0.5) / 2;
    RETURN `_overall`;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `get_new_start_date` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `get_new_start_date`(
	`_start_date` DATE,
    `_time` INT
) RETURNS date
    DETERMINISTIC
BEGIN
	DECLARE `_day_of_week`, `_interval` INT;
    SET `_day_of_week` = dayofweek(`_start_date`) - 1;
    SET `_interval` = (((`_time` - `_day_of_week`) % 7) + 7) % 7;
    RETURN adddate(`_start_date`, `_interval`);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_class` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_class`(
	`_course_id` CHAR(5),
    `_class_id` CHAR(7),
    `_start_date` DATE,
    `_form` VARCHAR(10),
    `_branch_id` CHAR(4),
    `_room` CHAR(3),
    `_time` INT,
    `_teacher_id` CHAR(9)
)
BEGIN

	DECLARE `_end_date` DATE;
    DECLARE `_teacher_requirement`, `_level_overall`, `_level_listening`, `_level_reading`, `_level_writing`, `_level_speaking` FLOAT;
    DECLARE `_type` VARCHAR(10);
	
	IF EXISTS (SELECT * FROM `class` WHERE `course_id` = `_course_id` AND `class_id` = `_class_id`) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: course_id and class_id must be unique";
	ELSEIF NOT EXISTS (SELECT * FROM `course` WHERE `course_id` = `_course_id`) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: course_id must exists in course";
	ELSEIF (`_branch_id` IS NOT NULL) AND (`_room` IS NOT NULL) AND NOT EXISTS (SELECT * FROM `classroom` WHERE `branch_id` = `_branch_id` AND `room` = `_room`) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: branch_id, room must exists in classroom";
	ELSEIF NOT EXISTS (SELECT * FROM `teacher` WHERE `id` = `_teacher_id`) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: teacher_id must exists in teacher";
	ELSEIF NOT (`_class_id` REGEXP '[0-9]{4}-[0-9]{2}') THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: class_id has invalid syntax";
	ELSEIF NOT (`_start_date` >= '2022-09-01') THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: start_date must be greater than 2022-09-01";
	ELSEIF NOT (`_form` IN ('online', 'offline')) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: form must be online or offline";
	ELSEIF NOT (`_time` >= 1 AND `_time` <= 6) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: time must be between 1 and 6";
	END IF;
    
    SET `_start_date` = get_new_start_date(`_start_date`, `_time`);
    SET `_end_date` = adddate(`_start_date`, 7 * ((SELECT `numOfLecture` FROM `course` WHERE `course_id` = `_course_id`) - 1));
    
    IF EXISTS (
		SELECT * 
		FROM `class` 
		WHERE ((`start_date` <= `_start_date` AND `end_date` >= `_start_date`) OR (`start_date` <= `_end_date` AND `end_date` >= `_end_date`)) AND `branch_id` = `_branch_id` AND `room` = `_room` AND `time` = `_time`
    ) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: duplicate use of room";
	END IF;
    
    SELECT `type`, `teacher_requirement`
    INTO `_type`, `_teacher_requirement`
    FROM `course`
    WHERE `course_id` = `_course_id`;
    
    SELECT `level_overall`, `level_listening`, `level_reading`, `level_writing`, `level_speaking`
    INTO `_level_overall`, `_level_listening`, `_level_reading`, `_level_writing`, `_level_speaking`
    FROM `teacher`
    WHERE `id` = `_teacher_id`;
    
    IF (
		(`_type` = "OVERALL" AND `_level_overall` < `_teacher_requirement`) OR
        (`_type` = "LISTENING" AND `_level_listening` < `_teacher_requirement`) OR
        (`_type` = "READING" AND `_level_reading` < `_teacher_requirement`) OR
        (`_type` = "WRITING" AND `_level_writing` < `_teacher_requirement`) OR
        (`_type` = "SPEAKING" AND `_level_speaking` < `_teacher_requirement`)
	) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: level of teacher does not meet requirement";
	END IF;
    
    IF EXISTS (
		SELECT *
        FROM `class`
        WHERE ((`start_date` <= `_start_date` AND `end_date` >= `_start_date`) OR (`start_date` <= `_end_date` AND `end_date` >= `_end_date`)) AND `teacher_id` = `_teacher_id` AND `time` = `_time`
    ) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: duplicate schedule of teacher";
	END IF;
    
    INSERT INTO `class` 
	VALUES (
		`_course_id`, 
		`_class_id`, 
		`_start_date`,
		`_end_date`,
		`_form`,
		`_branch_id`,
		`_room`,
		`_time`,
		`_teacher_id`,
        0,
        20
    );
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_student_class` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_student_class`(
	`_course_id` CHAR(5),
    `_class_id` CHAR(7),
    `_student_id` CHAR(9)
)
BEGIN
	DECLARE `_start_date`, `_end_date` DATE;
    DECLARE `_time` INT;
    DECLARE `_requirement`, `_level_overall`, `_level_listening`, `_level_reading`, `_level_writing`, `_level_speaking` FLOAT;
    DECLARE `_type` VARCHAR(10);
	
	IF EXISTS (SELECT * FROM `student_class` WHERE `course_id` = `_course_id` AND `class_id` = `_class_id` AND `student_id` = `_student_id`) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: course_id, class_id and student_id must be unique";
	ELSEIF NOT EXISTS (SELECT * FROM `class` WHERE `course_id` = `_course_id` AND `class_id` = `_class_id`) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: course_id and class_id must exists in class";
	ELSEIF NOT EXISTS (SELECT * FROM `student` WHERE `id` = `_student_id`) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: student_id must exists in student";
	END IF;
    
    SELECT `type`, `requirement`
    INTO `_type`, `_requirement`
    FROM `course`
    WHERE `course_id` = `_course_id`;
    
    SELECT `level_overall`, `level_listening`, `level_reading`, `level_writing`, `level_speaking`
    INTO `_level_overall`, `_level_listening`, `_level_reading`, `_level_writing`, `_level_speaking`
    FROM `student`
    WHERE `id` = `_student_id`;
    
    IF (
		(`_type` = "OVERALL" AND `_level_overall` < `_requirement`) OR
        (`_type` = "LISTENING" AND `_level_listening` < `_requirement`) OR
        (`_type` = "READING" AND `_level_reading` < `_requirement`) OR
        (`_type` = "WRITING" AND `_level_writing` < `_requirement`) OR
        (`_type` = "SPEAKING" AND `_level_speaking` < `_requirement`)
	) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: level of student does not meet requirement";
	END IF;
    
    SELECT `start_date`, `end_date`, `time`
    INTO `_start_date`, `_end_date`, `_time`
    FROM `class`
    WHERE `course_id` = `_course_id` AND `class_id` = `_class_id`;
    
    IF (`_start_date` <= curdate()) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: cannot register a class which has already started";
	END IF;
    
    IF EXISTS (
		SELECT *
        FROM `student_class` JOIN `class` USING (`course_id`, `class_id`)
        WHERE ((`start_date` <= `_start_date` AND `end_date` >= `_start_date`) OR (`start_date` <= `_end_date` AND `end_date` >= `_end_date`)) AND `student_id` = `_student_id` AND `time` = `_time`
    ) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: duplicate schedule of student";
	END IF;
    
    INSERT INTO `student_class` 
	VALUES (
		`_course_id`,
		`_class_id`,
		`_student_id`,
		'unpaid',
        NULL,
		NULL,
        NULL,
        NULL,
        NULL,
        curdate()
    );
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CREATEStudent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CREATEStudent`(_ssn varchar(12), _full_name varchar(30), _username varchar(30), _password varchar(30), _phone_number varchar(10), _email varchar(30), _address varchar(100),
								_level_overall float, _level_listening float, _level_reading float, _level_writing float, _level_speaking float)
BEGIN
	DECLARE flag int;
    DECLARE num int;
    DECLARE rep int;
    DECLARE var varchar(6);
    DECLARE id varchar(12);
	SET flag := (SELECT COUNT(*) FROM user WHERE username=_username);
    IF (flag = 1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Existing username', MYSQL_ERRNO = 12121;
    ELSE
		SET num := (SELECT COUNT(*) FROM student) + 1;
        SET var := CONCAT(num);
		SET rep := (9 - CHAR_LENGTH(var));
		SET id := CONCAT(RPAD('SD-',rep,'0'), var);
		INSERT INTO `user` (`id`, `ssn`, `full_name`, `username`, `password`, `phone_number`, `email`, `address`) 
			VALUES (id, _ssn, _full_name, _username, _password, _phone_number, _email, _address);
		INSERT INTO `student` (`id`, `level_overall`,`level_listening`, `level_reading`, `level_writing`, `level_speaking`) 
			VALUES (id, _level_overall, _level_listening, _level_reading, _level_writing,  _level_speaking);
    END IF;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CREATETeacher` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CREATETeacher`(_ssn varchar(12), _full_name varchar(30), _username varchar(30), _password varchar(30), _phone_number varchar(10), _email varchar(30), _address varchar(100),
								_start_date date, _exp_year int , _level_overall float, _level_listening float, _level_reading float, _level_writing float, _level_speaking float, _type int)
BEGIN
	DECLARE flag int;
    DECLARE num int;
    DECLARE rep int;
    DECLARE var varchar(6);
    DECLARE id varchar(12);
	SET flag := (SELECT COUNT(*) FROM user WHERE username=_username);
    IF (flag = 1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Existing username', MYSQL_ERRNO = 12121;
    ELSE
		SET num := (SELECT COUNT(*) FROM teacher) + 1;
        SET var := CONCAT(num);
		SET rep := (9 - CHAR_LENGTH(var));
		SET id := CONCAT(RPAD('TC-',rep,'0'), var);
		INSERT INTO `user` (`id`, `ssn`, `full_name`, `username`, `password`, `phone_number`, `email`, `address`) 
			VALUES (id, _ssn, _full_name, _username, _password, _phone_number, _email, _address);
		INSERT INTO `teacher` (`id`, `start_date`,`exp_year`,`level_overall`,`level_listening`, `level_reading`, `level_writing`, `level_speaking`, `type`) 
			VALUES (id, _start_date, _exp_year, _level_overall, _level_listening, _level_reading, _level_writing,  _level_speaking, _type);
    END IF;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_class` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_class`( _course_id CHAR(9), _class_id CHAR(9))
BEGIN
	DELETE FROM `attendance` WHERE course_id = _course_id and class_id = _class_id;
    DELETE FROM `student_class` WHERE course_id = _course_id and class_id = _class_id;
	DELETE FROM `class` WHERE course_id = _course_id and class_id = _class_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_course` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_course`( _course_id CHAR(9))
BEGIN
	DELETE FROM `attendance` WHERE course_id = _course_id;
    DELETE FROM `student_class` WHERE course_id = _course_id;
	DELETE FROM `class` WHERE course_id = _course_id;
    DELETE FROM `course_curriculum` WHERE course_id = _course_id;
	DELETE FROM `course` WHERE course_id = _course_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_schedule` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `show_schedule`(
	`_id` CHAR(9)
)
BEGIN
    IF NOT EXISTS (SELECT * FROM `student` WHERE `id` = `_id`) AND NOT EXISTS (SELECT * FROM `teacher` WHERE `id` = `_id`) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: _id must be a valid id of teacher or student";
	END IF;
    
    IF EXISTS (SELECT * FROM `student` WHERE `id` = `_id`) THEN
		SELECT adddate(`start_date`, 7 * (`lecture` - 1)) AS `date`, `student_class`.`course_id`, `name`, `student_class`.`class_id`, `lecture`, `description`
        FROM ((`student_class` JOIN `course` USING (`course_id`)) JOIN `course_curriculum` USING (`course_id`)) JOIN `class` USING (`class_id`)
        WHERE `student_id` = `_id` AND adddate(`start_date`, 7 * (`lecture` - 1)) >= curdate();
	ELSE
		SELECT adddate(`start_date`, 7 * (`lecture` - 1)) AS `date`, `class`.`course_id`, `name`, `class_id`, `lecture`, `description`
        FROM (`class` JOIN `course` USING (`course_id`)) JOIN `course_curriculum` USING (`course_id`)
        WHERE `teacher_id` = `_id` AND adddate(`start_date`, 7 * (`lecture` - 1)) >= curdate();
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `statistic_register` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `statistic_register`(
	`_from` DATE,
    `_to` DATE
)
BEGIN
	IF (`_from` > `_to`) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: start date must not be greater than end date";
	END IF;
    
    SELECT `course_id`, `name`, count(DISTINCT `class_id`) AS `total_class`, count(`student_id`) AS `total_student`
    FROM `course` LEFT JOIN `student_class` USING (`course_id`)
    WHERE `class_id` IS NULL OR(`register_date` >= `_from` AND `register_date` <= `_to`)
    GROUP BY `course_id`;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateAttendance` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateAttendance`(_course_id char(5), _class_id char(7), _student_id char(9), _lecture int, _status varchar(1), _note varchar(50))
BEGIN
	DECLARE flag INT;
	SET flag := (SELECT COUNT(*) FROM student WHERE course_id = _course_id and class_id = _class_id and student_id=_student_id and lecture = _lecture);
    IF (flag = 1) THEN
		UPDATE attendance
        SET status = _status, note = _note
        WHERE course_id = _course_id and class_id = _class_id and student_id=_student_id and lecture = _lecture;
    ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid Input', MYSQL_ERRNO = 12121;
    END IF;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateCourse` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCourse`(_course_id CHAR(5), _name VARCHAR(50), _type VARCHAR(10), _requirement float, _target float, _cost float, _teacher_requirement float, _numOfLecture int)
BEGIN
    UPDATE course
    SET name = _name, type = _type, requirement = _requirement, target = _target, cost = _cost, teacher_requirement = _teacher_requirement, numOfLecture = _numOfLecture
    WHERE course_id = _course_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateScoreStudent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateScoreStudent`(_id char(9),_level_overall float, _level_listening float, _level_reading float, _level_writing float, _level_speaking float)
BEGIN
	DECLARE flag INT;
	SET flag := (SELECT COUNT(*) FROM student WHERE id=_id);
    IF (flag = 1) THEN
		UPDATE student
        SET level_overall = _level_overall, level_listening = _level_listening, level_reading = _level_reading,
			level_writing = _level_writing, level_speaking = _level_speaking
        WHERE id = _id;
    ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No student', MYSQL_ERRNO = 12121;
    END IF;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateScoreStudentClass` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateScoreStudentClass`(_course_id char(5), _class_id char(7), _student_id char(9),_level_overall float, _level_listening float, _level_reading float, _level_writing float, _level_speaking float)
BEGIN
	DECLARE flag INT;
	SET flag := (SELECT COUNT(*) FROM student WHERE course_id = _course_id and class_id = _class_id and student_id=_student_id);
    IF (flag = 1) THEN
		UPDATE student
        SET level_overall = _level_overall, level_listening = _level_listening, level_reading = _level_reading,
			level_writing = _level_writing, level_speaking = _level_speaking
        WHERE course_id = _course_id and class_id = _class_id and student_id=_student_id;
    ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No student', MYSQL_ERRNO = 12121;
    END IF;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateScoreTeacher` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateScoreTeacher`(_id char(9),_level_overall float, _level_listening float, _level_reading float, _level_writing float, _level_speaking float)
BEGIN
	DECLARE flag INT;
	SET flag := (SELECT COUNT(*) FROM teacher WHERE id=_id);
    IF (flag = 1) THEN
		UPDATE teacher
        SET level_overall = _level_overall, level_listening = _level_listening, level_reading = _level_reading,
			level_writing = _level_writing, level_speaking = _level_speaking
        WHERE id = _id;
    ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No teacher', MYSQL_ERRNO = 12121;
    END IF;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateTypeTeacher` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateTypeTeacher`(_id char(9), _type int)
BEGIN
	DECLARE flag INT;
	SET flag := (SELECT COUNT(*) FROM teacher WHERE id=_id);
    IF (flag = 1) THEN
		UPDATE teacher
        SET type = _type
        WHERE id = _id;
    ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No teacher', MYSQL_ERRNO = 12121;
    END IF;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateYearTeacher` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateYearTeacher`(_id char(9), _exp_year int)
BEGIN
	DECLARE flag INT;
	SET flag := (SELECT COUNT(*) FROM teacher WHERE id=_id);
    IF (flag = 1) THEN
		UPDATE teacher
        SET exp_year = _exp_year
        WHERE id = _id;
    ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No teacher', MYSQL_ERRNO = 12121;
    END IF;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_class` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_class`(
	`_course_id` CHAR(5),
    `_class_id` CHAR(7),
    `_start_date` DATE,
    `_form` VARCHAR(10),
    `_branch_id` CHAR(4),
    `_room` CHAR(3),
    `_time` INT,
    `_teacher_id` CHAR(9)
)
BEGIN

	DECLARE `_end_date` DATE;
    DECLARE `_teacher_requirement`, `_level_overall`, `_level_listening`, `_level_reading`, `_level_writing`, `_level_speaking` FLOAT;
    DECLARE `_type` VARCHAR(10);
	
	IF NOT EXISTS (SELECT * FROM `class` WHERE `course_id` = `_course_id` AND `class_id` = `_class_id`) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: course_id and class_id must exist";
	ELSEIF (`_branch_id` IS NOT NULL) AND (`_room` IS NOT NULL) AND NOT EXISTS (SELECT * FROM `classroom` WHERE `branch_id` = `_branch_id` AND `room` = `_room`) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: branch_id, room must exists in classroom";
	ELSEIF NOT EXISTS (SELECT * FROM `teacher` WHERE `id` = `_teacher_id`) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: teacher_id must exists in teacher";
	ELSEIF NOT (`_start_date` >= '2022-09-01') THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: start_date must be greater than 2022-09-01";
	ELSEIF NOT (`_form` IN ('online', 'offline')) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: form must be online or offline";
	ELSEIF NOT (`_time` >= 1 AND `_time` <= 6) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: time must be between 1 and 6";
	END IF;
    
    SET `_start_date` = get_new_start_date(`_start_date`, `_time`);
    SET `_end_date` = adddate(`_start_date`, 7 * ((SELECT `numOfLecture` FROM `course` WHERE `course_id` = `_course_id`) - 1));
    
    IF EXISTS (
		SELECT * 
		FROM `class` 
		WHERE (`course_id` <> `_course_id` OR `class_id` <> `_class_id`) AND ((`start_date` <= `_start_date` AND `end_date` >= `_start_date`) OR (`start_date` <= `_end_date` AND `end_date` >= `_end_date`)) AND `branch_id` = `_branch_id` AND `room` = `_room` AND `time` = `_time`
    ) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: duplicate use of room";
	END IF;
    
    SELECT `type`, `teacher_requirement`
    INTO `_type`, `_teacher_requirement`
    FROM `course`
    WHERE `course_id` = `_course_id`;
    
    SELECT `level_overall`, `level_listening`, `level_reading`, `level_writing`, `level_speaking`
    INTO `_level_overall`, `_level_listening`, `_level_reading`, `_level_writing`, `_level_speaking`
    FROM `teacher`
    WHERE `id` = `_teacher_id`;
    
    IF (
		(`_type` = "OVERALL" AND `_level_overall` < `_teacher_requirement`) OR
        (`_type` = "LISTENING" AND `_level_listening` < `_teacher_requirement`) OR
        (`_type` = "READING" AND `_level_reading` < `_teacher_requirement`) OR
        (`_type` = "WRITING" AND `_level_writing` < `_teacher_requirement`) OR
        (`_type` = "SPEAKING" AND `_level_speaking` < `_teacher_requirement`)
	) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: level of teacher does not meet requirement";
	END IF;
    
    IF EXISTS (
		SELECT *
        FROM `class`
        WHERE (`course_id` <> `_course_id` OR `class_id` <> `_class_id`) AND ((`start_date` <= `_start_date` AND `end_date` >= `_start_date`) OR (`start_date` <= `_end_date` AND `end_date` >= `_end_date`)) AND `teacher_id` = `_teacher_id` AND `time` = `_time`
    ) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: duplicate schedule of teacher";
	END IF;
    
    UPDATE `class`
    SET `start_date` = `_start_date`, `end_date` = `_end_date`, `form` = `_form`, `branch_id` = `_branch_id`, `room` = `_room`, `time` = `_time`, `teacher_id` = `_teacher_id`
    WHERE `course_id` = `_course_id` AND `class_id` = `_class_id`;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_status`(
	`_course_id` CHAR(5),
    `_class_id` CHAR(7),
    `_student_id` CHAR(9),
    `_status` VARCHAR(10)
)
BEGIN
	IF NOT EXISTS (SELECT * FROM `student_class` WHERE `course_id` = `_course_id` AND `class_id` = `_class_id` AND `student_id` = `_student_id`) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: course_id, class_id and student_id must exist";
	ELSEIF NOT (`_status` IN ('paid', 'unpaid')) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: status must be paid or unpaid";
	END IF;
    
    UPDATE `student_class`
	SET `status` = `_status`
    WHERE `course_id` = `_course_id` AND `class_id` = `_class_id` AND `student_id` = `_student_id`;
    
END ;;
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

-- Dump completed on 2022-12-31  0:13:14

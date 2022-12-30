USE `language_center`;

delimiter $$
DROP PROCEDURE IF EXISTS CREATETeacher $$
CREATE PROCEDURE CREATETeacher(_ssn varchar(12), _full_name varchar(30), _username varchar(30), _password varchar(30), _phone_number varchar(10), _email varchar(30), _address varchar(100),
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
end$$
delimiter ;

delimiter $$
DROP PROCEDURE IF EXISTS CREATEStudent $$
CREATE PROCEDURE CREATEStudent(_ssn varchar(12), _full_name varchar(30), _username varchar(30), _password varchar(30), _phone_number varchar(10), _email varchar(30), _address varchar(100),
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
end$$
delimiter ;

delimiter $$
DROP PROCEDURE IF EXISTS UpdateScoreTeacher $$
CREATE PROCEDURE UpdateScoreTeacher(_id char(9),_level_overall float, _level_listening float, _level_reading float, _level_writing float, _level_speaking float)
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
end$$
delimiter ;

delimiter $$
DROP PROCEDURE IF EXISTS UpdateYearTeacher $$
CREATE PROCEDURE UpdateYearTeacher(_id char(9), _exp_year int)
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
end$$
delimiter ;

delimiter $$
DROP PROCEDURE IF EXISTS UpdateTypeTeacher $$
CREATE PROCEDURE UpdateTypeTeacher(_id char(9), _type int)
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
end$$
delimiter ;

delimiter $$
DROP PROCEDURE IF EXISTS UpdateScoreStudent $$
CREATE PROCEDURE UpdateScoreStudent(_id char(9),_level_overall float, _level_listening float, _level_reading float, _level_writing float, _level_speaking float)
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
end$$
delimiter ;

DELIMITER $$
DROP PROCEDURE IF EXISTS add_class $$
CREATE PROCEDURE add_class (
	`_course_id` CHAR(5),
    `_class_id` CHAR(7),
    `_start_date` DATE,
    `_form` VARCHAR(10),
    `_branch_id` CHAR(4),
    `_room` CHAR(3),
    `_time` INT,
    `_teacher_id` CHAR(9),
    `_status` VARCHAR(30)
) 
BEGIN

	DECLARE `_end_date` DATE;
	
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
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: start_date must be smaller than 2022-09-01";
	ELSEIF NOT (`_start_date` < `_end_date`) THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Invalid: start_date must be smaller than end_date";
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
		`_status`
    );
    
END $$

DROP PROCEDURE IF EXISTS add_student_class $$
CREATE PROCEDURE add_student_class (
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
    
END $$


delimiter $$
DROP PROCEDURE IF EXISTS UpdateScoreStudentClass $$
CREATE PROCEDURE UpdateScoreStudentClass(_course_id char(5), _class_id char(7), _student_id char(9),_level_overall float, _level_listening float, _level_reading float, _level_writing float, _level_speaking float)
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
end$$
delimiter ;
-- TO-DO: update attendance

delimiter $$
DROP PROCEDURE IF EXISTS UpdateAttendance $$
CREATE PROCEDURE UpdateAttendance(_course_id char(5), _class_id char(7), _student_id char(9), _lecture int, _status varchar(1), _note varchar(50))
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
end$$
delimiter ;



DELIMITER $$
DROP PROCEDURE IF EXISTS `update_status` $$
CREATE PROCEDURE `update_status` (
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
    
END $$

DELIMITER $$
DROP PROCEDURE IF EXISTS `statistic_register` $$
CREATE PROCEDURE `statistic_register` (
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
    
END $$

DELIMITER $$
DROP PROCEDURE IF EXISTS `show_schedule` $$
CREATE PROCEDURE `show_schedule` (
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
END $$

DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `delete_class` $$
CREATE PROCEDURE `delete_class` ( _course_id CHAR(9), _class_id CHAR(9)) 
BEGIN
    DELETE FROM `student_class` WHERE course_id = _course_id and class_id = _class_id;
	DELETE FROM `class` WHERE course_id = _course_id and class_id = _class_id;
END $$

DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `delete_course` $$
CREATE PROCEDURE `delete_course` ( _course_id CHAR(9)) 
BEGIN
	DELETE FROM `attendance` WHERE course_id = _course_id;
    DELETE FROM `student_class` WHERE course_id = _course_id;
	DELETE FROM `class` WHERE course_id = _course_id;
    DELETE FROM `course_curriculum` WHERE course_id = _course_id;
	DELETE FROM `course` WHERE course_id = _course_id;
END $$

DELIMITER ;


DELIMITER $$
DROP PROCEDURE IF EXISTS `updateCourse` $$
CREATE PROCEDURE `updateCourse` (_course_id CHAR(5), _name VARCHAR(50), _type VARCHAR(10), _requirement float, _target float, _cost float, _teacher_requirement float, _numOfLecture int) 
BEGIN
    UPDATE course
    SET name = _name, type = _type, requirement = _requirement, target = _target, cost = _cost, teacher_requirement = _teacher_requirement, numOfLecture = _numOfLecture
    WHERE course_id = _course_id;
END $$

DELIMITER ;



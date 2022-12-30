DROP DATABASE IF EXISTS `language_center`;
CREATE DATABASE `language_center`;
USE `language_center`;

DROP TABLE IF EXISTS `branch`;
CREATE TABLE `branch` (
	`branch_id` CHAR(4) NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`branch_id`),
    CHECK (`branch_id` REGEXP '[A-Z]{2}[0-9]{2}')
);

DROP TABLE IF EXISTS `classroom`;
CREATE TABLE `classroom` (
	`branch_id` CHAR(4) NOT NULL,
    `room` CHAR(3) NOT NULL,
    PRIMARY KEY (`branch_id`, `room`),
    FOREIGN KEY (`branch_id`) REFERENCES `branch`(`branch_id`),
    CHECK (`room` REGEXP '[0-9]{3}')
);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`id` CHAR(9) NOT NULL,
    `ssn` VARCHAR(12) NOT NULL,
    `full_name` VARCHAR(30),
    `username` VARCHAR(30) NOT NULL,
    `password` VARCHAR(30) NOT NULL,
    `phone_number` CHAR(10),
    `email` VARCHAR(30) UNIQUE,
    `address` VARCHAR(100),
    PRIMARY KEY (`id`),
    CHECK (`id` REGEXP '(TC|SD)-[0-9]{6}'),
    CHECK (`ssn` REGEXP '[0-9]{9}|[0-9]{12}'),
    CHECK (`username` REGEXP '[a-zA-Z0-9]+'),
    CHECK (`password` REGEXP '[a-zA-Z0-9]+'),
    CHECK (`phone_number` REGEXP '[0-9]{10}'),
    CHECK (`email` LIKE '%@%')
);

DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
	`id` CHAR(9) NOT NULL,
    `start_date` DATE,
    `exp_year` INT,
    `level_overall` FLOAT,
    `level_listening` FLOAT,
    `level_reading` FLOAT,
    `level_writing` FLOAT,
    `level_speaking` FLOAT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id`) REFERENCES `user`(`id`),
    CHECK (`start_date` >= '2022-09-01'),
    CHECK (`exp_year` >= 1),
    CHECK (`level_overall` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`level_listening` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`level_reading` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`level_writing` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`level_speaking` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9))
);

DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
	`id` CHAR(9) NOT NULL,
    `level_overall` FLOAT,
    `level_listening` FLOAT,
    `level_reading` FLOAT,
    `level_writing` FLOAT,
    `level_speaking` FLOAT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id`) REFERENCES `user`(`id`),
    CHECK (`level_overall` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`level_listening` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`level_reading` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`level_writing` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`level_speaking` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9))
);

DROP TABLE IF EXISTS `course`;
CREATE TABLE course (
	`course_id` CHAR(5) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `type` VARCHAR(10) NOT NULL DEFAULT 'OVERALL',
    `requirement` FLOAT NOT NULL DEFAULT 0,
    `target` FLOAT NOT NULL DEFAULT 0,
    `cost` FLOAT,
    `numOfLecture` INT,
    `teacher_requirement` FLOAT DEFAULT 7,
    PRIMARY KEY (`course_id`),
    CHECK (`course_id` REGEXP '[A-Z]{2}-[0-9]{2}'),
    CHECK (`type` IN ('OVERALL', 'LISTENING', 'READING', 'WRITING', 'SPEAKING')),
    CHECK (`requirement` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`target` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`target` > `requirement`),
    CHECK (`cost` >= 0),
    CHECK (`teacher_requirement` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`teacher_requirement` >= `target`)
);

DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
	`course_id` CHAR(5) NOT NULL,
    `class_id` CHAR(7) NOT NULL,
    `start_date` DATE,
    `end_date` DATE,
    `form` VARCHAR(10),
    `branch_id` CHAR(4),
    `room` CHAR(3),
    `time` INT,
    `teacher_id` CHAR(9) NOT NULL,
    `numOfStudent` INT,
    `maxStudent` INT DEFAULT 20,
    PRIMARY KEY (`course_id`, `class_id`),
    FOREIGN KEY (`course_id`) REFERENCES `course`(`course_id`),
    FOREIGN KEY (`branch_id`, `room`) REFERENCES `classroom`(`branch_id`, `room`),
    FOREIGN KEY (`teacher_id`) REFERENCES `teacher`(`id`),
    CHECK (`class_id` REGEXP '[0-9]{4}-[0-9]{2}'),
    CHECK (`start_date` >= '2022-09-01'),
    CHECK (`start_date` < `end_date`),
    CHECK (`form` IN ('online', 'offline')),
    CHECK (`time` >= 1 AND `time` <= 6),
    CHECK (`numOfStudent` >= 0),
    CHECK (`maxStudent` >= `numOfStudent`)
);

DROP TABLE IF EXISTS `course_curriculum`;
CREATE TABLE `course_curriculum` (
	`course_id` CHAR(5) NOT NULL,
    `lecture` INT NOT NULL DEFAULT 1,
    `description` VARCHAR(200),
    PRIMARY KEY (`course_id`, `lecture`),
    FOREIGN KEY (`course_id`) REFERENCES `course`(`course_id`),
    CHECK (`lecture` > 0)
);

DROP TABLE IF EXISTS `student_class`;
CREATE TABLE `student_class` (
	`course_id` CHAR(5) NOT NULL,
    `class_id` CHAR(7) NOT NULL,
    `student_id` CHAR(9) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `grade_overall` FLOAT,
    `grade_listening` FLOAT,
    `grade_reading` FLOAT,
    `grade_writing` FLOAT,
    `grade_speaking` FLOAT,
    `register_date` DATE,
    PRIMARY KEY (`course_id`, `class_id`, `student_id`),
    FOREIGN KEY (`course_id`, `class_id`) REFERENCES `class`(`course_id`, `class_id`),
    FOREIGN KEY (`student_id`) REFERENCES `student`(`id`),
    CHECK (`status` IN ('paid', 'unpaid')),
    CHECK (`grade_overall` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`grade_listening` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`grade_reading` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`grade_writing` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`grade_speaking` IN (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9)),
    CHECK (`register_date` >= '2022-09-01')
);

DROP TABLE IF EXISTS `attendance`;
CREATE TABLE `attendance` (
	`course_id` CHAR(5) NOT NULL,
    `class_id` CHAR(7) NOT NULL,
    `student_id` CHAR(9) NOT NULL,
    `lecture` INT NOT NULL,
    `status` VARCHAR(1),
    `note` VARCHAR(50),
    PRIMARY KEY (`course_id`, `class_id`, `student_id`, `lecture`),
    FOREIGN KEY (`course_id`, `class_id`, `student_id`) REFERENCES `student_class`(`course_id`, `class_id`, `student_id`),
    FOREIGN KEY (`course_id`, `lecture`) REFERENCES `course_curriculum`(`course_id`, `lecture`),
	CHECK (`status` IN ('A', 'P'))
);







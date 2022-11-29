USE `language_center`;

LOAD DATA INFILE 'D:\\PIP-sem221\\data\\Data - user.csv' 
INTO TABLE `user` 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'D:\\PIP-sem221\\data\\Data - teacher.csv' 
INTO TABLE `teacher` 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'D:\\PIP-sem221\\data\\Data - student.csv' 
INTO TABLE `student` 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'D:\\PIP-sem221\\data\\Data - branch.csv' 
INTO TABLE `branch` 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'D:\\PIP-sem221\\data\\Data - classroom.csv' 
INTO TABLE `classroom` 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'D:\\PIP-sem221\\data\\Data - course.csv' 
INTO TABLE `course` 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'D:\\PIP-sem221\\data\\Data - class.csv'
INTO TABLE `class` 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(`course_id`, `class_id`, `start_date`,	`end_date`,	`form`,	`branch_id`, `room`, `time`, `teacher_id`, `status`, `numOfStudent`) 
SET branch_id = nullif(`branch_id`, ''), room = nullif(`room`, '');


LOAD DATA INFILE 'D:\\PIP-sem221\\data\\Data - course_curriculum.csv' 
INTO TABLE `course_curriculum` 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'D:\\PIP-sem221\\data\\Data - student_class.csv' 
INTO TABLE `student_class` 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'D:\\PIP-sem221\\data\\Data - attendance.csv' 
INTO TABLE `attendance` 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;
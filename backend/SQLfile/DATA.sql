USE `language_center`;

-- user (teacher)
INSERT INTO `user` (`id`, `ssn`, `full_name`, `username`, `password`, `phone_number`, `email`, `address`) 
		VALUES ('TC-010355', '068202111999', 'Nguyen Thi Thu Huong', 'huongntt', '123', '0123456789', 'thuhuong@gmail.com', 'Linh Trung ward, Thu Duc city, Ho Chi Minh');
INSERT INTO `user` (`id`, `ssn`, `full_name`, `username`, `password`, `phone_number`, `email`, `address`) 
		VALUES ('TC-010001', '244466666', 'Tran Van Hoai', 'hoaitv', '123', '0153723599', 'hoaitran@gmail.com', 'Ward 4, Tan Binh district, Ho Chi Minh');
INSERT INTO `user` (`id`, `ssn`, `full_name`, `username`, `password`, `phone_number`, `email`, `address`) 
		VALUES ('TC-201099', '261592741', 'Nguyen An Khuong', 'khuongna', '789', '0741116304', 'ankhuong@gmail.com', 'Ward 14, district 10, Ho Chi Minh');
        
-- user (student)
INSERT INTO `user` (`id`, `ssn`, `full_name`, `username`, `password`, `phone_number`, `email`, `address`) 
		VALUES ('SD-000303', '068202230770', 'Nguyen Quang Khanh', 'nqkkk', '8888', '0720796306', 'kakakhanh@gmail.com', 'Dong Hoa ward, Di An district, Binh Duong');
INSERT INTO `user` (`id`, `ssn`, `full_name`, `username`, `password`, `phone_number`, `email`, `address`) 
		VALUES ('SD-000303', '068202230770', 'Nguyen Quang Khanh', 'nqkkk', '8888', '0720796306', 'kakakhanh@gmail.com', 'Dong Hoa ward, Di An district, Binh Duong');
INSERT INTO `user` (`id`, `ssn`, `full_name`, `username`, `password`, `phone_number`, `email`, `address`) 
		VALUES ('SD-000303', '068202230770', 'Nguyen Quang Khanh', 'nqkkk', '8888', '0720796306', 'kakakhanh@gmail.com', 'Dong Hoa ward, Di An district, Binh Duong');
INSERT INTO `user` (`id`, `ssn`, `full_name`, `username`, `password`, `phone_number`, `email`, `address`) 
		VALUES ('SD-000303', '068202230770', 'Nguyen Quang Khanh', 'nqkkk', '8888', '0720796306', 'kakakhanh@gmail.com', 'Dong Hoa ward, Di An district, Binh Duong');

INSERT INTO `teacher` (`id`, `start_date`,`exp_year`,`level_overall`,`level_listening`, `level_reading`, `level_writing`, `level_speaking`, `type`) 
					VALUES ('TC1', 01/01/2022, 3, 8.5, 8.5, 8.5, 8.5, 8.5, 1);
INSERT INTO `teacher` (`id`, `start_date`,`exp_year`,`level_overall`,`level_listening`, `level_reading`, `level_writing`, `level_speaking`, `type`) 
					VALUES ('TC2', 01/01/2022, 2, 7.5, 7.5, 7.5, 7.5, 7.5, 2);
INSERT INTO `teacher` (`id`, `start_date`,`exp_year`,`level_overall`,`level_listening`, `level_reading`, `level_writing`, `level_speaking`, `type`) 
					VALUES ('TC3', 01/01/2022, 1, 8.0, 8.0, 8.0, 8.0, 8.0, 1);
                    
INSERT INTO `student` (`id`,`level_overall`,`level_listening`, `level_reading`, `level_writing`, `level_speaking`) 
					VALUES ('ST1', 8.5, 8.5, 8.5, 8.5, 8.5);
INSERT INTO `student` (`id`,`level_overall`,`level_listening`, `level_reading`, `level_writing`, `level_speaking`) 
					VALUES ('ST2', 7.5, 7.5, 7.5, 7.5, 7.5);
INSERT INTO `student` (`id`,`level_overall`,`level_listening`, `level_reading`, `level_writing`, `level_speaking`) 
					VALUES ('ST3', 6.5, 6.5, 6.5, 6.5, 6.5);
                    
INSERT INTO `branch` (`branch_id`,`address`) 
					VALUES ('cs1', '268 LTK');
INSERT INTO `branch` (`branch_id`,`address`) 
					VALUES ('cs2', 'LT, TD');
                    
INSERT INTO `classroom` (`branch_id`,`room`) 
					VALUES ('cs1', 101);
INSERT INTO `classroom` (`branch_id`,`room`) 
					VALUES ('cs1', 102);
INSERT INTO `classroom` (`branch_id`,`room`) 
					VALUES ('cs1', 103);
INSERT INTO `classroom` (`branch_id`,`room`) 
					VALUES ('cs1', 104);
INSERT INTO `classroom` (`branch_id`,`room`) 
					VALUES ('cs2', 101);
INSERT INTO `classroom` (`branch_id`,`room`) 
					VALUES ('cs2', 102);
INSERT INTO `classroom` (`branch_id`,`room`) 
					VALUES ('cs2', 103);
INSERT INTO `classroom` (`branch_id`,`room`) 
					VALUES ('cs2', 104);
                    
INSERT INTO `course` (`course_id`,`type`, `requirement`, `target`, `cost`) 
					VALUES ('ALL1', 'ALL', 0, 6.5, 30000);
INSERT INTO `course` (`course_id`,`name`,`type`, `requirement`, `target`, `cost`) 
					VALUES ('ALL2', 'ALL', 4.0, 6.5, 15000);
INSERT INTO `course` (`course_ID`,`requirement`,`target`, `cost`) 
					VALUES ('SP1', 'SPEAKING', 0, 5.0, 5000);
INSERT INTO `course` (`course_ID`,`requirement`,`target`, `cost`) 
					VALUES ('WR1', 'WRITING' ,0, 5.0, 5000);
INSERT INTO `course` (`course_ID`,`requirement`,`target`, `cost`) 
					VALUES ('LS1', 'LISTENING', 0, 5.0, 5000);
INSERT INTO `course` (`course_ID`,`requirement`,`target`, `cost`) 
					VALUES ('RD1', 'READING', 0, 5.0, 5000);

INSERT INTO `class` (`course_id`,`class_id`,`start_date`, `end_date`, `form`, `branch_id`, `room`, `time`, `teacher_id`, `status`) 
					VALUES ('ALL1', 'ALL1CS1', 03/03/2022, 09/06/2022, 'offline', 'cs1', 102, 1, TC2, 'FINISH');
INSERT INTO `class` (`course_id`,`class_id`,`start_date`, `end_date`, `form`, `branch_id`, `room`, `time`, `teacher_id`, `status`) 
					VALUES ('ALL1', 'ALL1CS2', 04/9/2022, 10/12/2022, 'offline', 'cs1', 103, 2, TC1, 'PLAYING');
INSERT INTO `class` (`course_id`,`class_id`,`start_date`, `end_date`, `form`, `time`, `teacher_id`, `status`) 
					VALUES ('ALL1', 'ALLon', 04/9/2022, 10/12/2022, 'online', 2, TC3, 'PLAYING');

INSERT INTO `course_curriculum` (`course_id`,`lecture`,`description`) VALUES ('ALL1',1,'PRESENT SIMPLE');
INSERT INTO `course_curriculum` (`course_id`,`lecture`,`description`) VALUES ('ALL1',2,'PRESENT CONTINUOUS');
INSERT INTO `course_curriculum` (`course_id`,`lecture`,`description`) VALUES ('ALL1',3,'PRESENT PERFECT');
INSERT INTO `course_curriculum` (`course_id`,`lecture`,`description`) VALUES ('ALL1',4,'PAST SIMPLE');
INSERT INTO `course_curriculum` (`course_id`,`lecture`,`description`) VALUES ('ALL1',5,'PAST CONTINUOUS');
INSERT INTO `course_curriculum` (`course_id`,`lecture`,`description`) VALUES ('ALL1',6,'PAST PERFECT');
INSERT INTO `course_curriculum` (`course_id`,`lecture`,`description`) VALUES ('ALL1',7,'FUTURE SIMPLE');
INSERT INTO `course_curriculum` (`course_id`,`lecture`,`description`) VALUES ('ALL1',8,'FUTURE CONTINOUS');
INSERT INTO `course_curriculum` (`course_id`,`lecture`,`description`) VALUES ('ALL1',9,'FUTURE PERFECT');
INSERT INTO `course_curriculum` (`course_id`,`lecture`,`description`) VALUES ('ALL1',10,'WH QUESTION');

INSERT INTO `student_class` (`course_id`,`class_id`,`student_id`,`status`) VALUES ('ALL1', 'ALL1CS2','ST1','paid');
INSERT INTO `student_class` (`course_id`,`class_id`,`student_id`,`status`) VALUES ('ALL1', 'ALL1CS2','ST2','paid');
INSERT INTO `student_class` (`course_id`,`class_id`,`student_id`,`status`) VALUES ('ALL1', 'ALL1CS2','ST3','unpaid');

INSERT INTO `attendance` (`course_id`,`class_id`,`student_id`,`lecture`, `status`, `note`) 
									VALUES ('ALL1', 'ALL1CS2','ST1', 1, 'P', NULL);
INSERT INTO `attendance` (`course_id`,`class_id`,`student_id`,`lecture`, `status`, `note`) 
									VALUES ('ALL1', 'ALL1CS2','ST1', 2, 'P', NULL);
INSERT INTO `attendance` (`course_id`,`class_id`,`student_id`,`lecture`, `status`, `note`) 
									VALUES ('ALL1', 'ALL1CS2','ST1', 3, 'P', NULL);
INSERT INTO `attendance` (`course_id`,`class_id`,`student_id`,`lecture`, `status`, `note`) 
									VALUES ('ALL1', 'ALL1CS2','ST2', 1, 'P', NULL);
INSERT INTO `attendance` (`course_id`,`class_id`,`student_id`,`lecture`, `status`, `note`) 
									VALUES ('ALL1', 'ALL1CS2','ST2', 2, 'A', NULL);
INSERT INTO `attendance` (`course_id`,`class_id`,`student_id`,`lecture`, `status`, `note`) 
									VALUES ('ALL1', 'ALL1CS2','ST2', 3, 'P', NULL);
INSERT INTO `attendance` (`course_id`,`class_id`,`student_id`,`lecture`, `status`, `note`) 
									VALUES ('ALL1', 'ALL1CS2','ST3', 1, 'P', NULL);
INSERT INTO `attendance` (`course_id`,`class_id`,`student_id`,`lecture`, `status`, `note`) 
									VALUES ('ALL1', 'ALL1CS2','ST3', 2, 'P', 'late 20m');
INSERT INTO `attendance` (`course_id`,`class_id`,`student_id`,`lecture`, `status`, `note`) 
									VALUES ('ALL1', 'ALL1CS2','ST3', 3, 'P', NULL);











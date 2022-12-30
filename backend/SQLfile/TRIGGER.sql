USE `language_center`;


DROP TRIGGER IF EXISTS `updateAttendants`;
CREATE 
    TRIGGER  updateAttendants
 AFTER INSERT ON student_class FOR EACH ROW 
    UPDATE class SET numOfStudent = numOfStudent + 1 WHERE
        course_id = NEW.course_id
            AND class_id = NEW.class_id;

DELIMITER $$
DROP TRIGGER IF EXISTS `updateLevelStudent`$$
CREATE TRIGGER  updateLevelStudent
AFTER UPDATE ON student_class FOR EACH ROW 
BEGIN
    UPDATE student 
    SET level_overall = calculate_overall(NEW.grade_listening, NEW.grade_reading, NEW.grade_writing, NEW.grade_speaking) , level_listening = NEW.grade_listening , level_reading = NEW.grade_reading , level_writing = NEW.grade_writing , level_speaking = NEW.grade_speaking 
    WHERE id = NEW.student_id;
END $$

DELIMITER $$
DROP TRIGGER IF EXISTS `addAttendance`$$
CREATE TRIGGER addAttendance
    AFTER INSERT ON student_class
    FOR EACH ROW
    BEGIN
		DECLARE a INT Default 1;
        DECLARE k INT;
        SELECT numOfLecture INTO k FROM course WHERE course_id = NEW.course_id;
        WHILE a <= k do
			INSERT INTO `attendance` (`course_id`,`class_id`,`student_id`,`lecture`) VALUES (NEW.course_id, NEW.class_id, NEW.student_id, a);
            SET a = a + 1;
        END WHILE;
	END$$
DELIMITER ;











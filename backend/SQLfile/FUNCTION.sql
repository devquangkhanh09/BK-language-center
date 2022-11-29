USE `language_center`;
SET GLOBAL log_bin_trust_function_creators = 1;
DELIMITER $$
DROP FUNCTION IF EXISTS `calculate_overall`$$
CREATE FUNCTION `calculate_overall` (
	`_listening` FLOAT,
    `_reading` FLOAT,
    `_writing` FLOAT,
    `_speaking` FLOAT
)
RETURNS FLOAT
DETERMINISTIC
BEGIN
	DECLARE `_overall` FLOAT;
    SET `_overall` := (`_listening` + `_reading` + `_writing` + `_speaking`) / 4;
    SET `_overall` := floor(`_overall` * 2  + 0.5) / 2;
    RETURN `_overall`;
END$$

DROP FUNCTION IF EXISTS `calculate_meet_requirement`$$
CREATE FUNCTION `calculate_meet_requirement` (
	`_course_id` CHAR(5)
)
RETURNS INT
NOT DETERMINISTIC
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
END$$

DROP FUNCTION IF EXISTS `get_new_start_date`$$
CREATE FUNCTION `get_new_start_date` (
	`_start_date` DATE,
    `_time` INT
)
RETURNS DATE
DETERMINISTIC
BEGIN
	DECLARE `_day_of_week`, `_interval` INT;
    SET `_day_of_week` = dayofweek(`_start_date`) - 1;
    SET `_interval` = (((`_time` - `_day_of_week`) % 7) + 7) % 7;
    RETURN adddate(`_start_date`, `_interval`);
END$$

DELIMITER ;
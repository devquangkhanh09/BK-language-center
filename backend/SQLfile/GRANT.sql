USE `language_center`;
CREATE ROLE 'pip-admin', 'pip-teacher', 'pip-student';

GRANT ALL PRIVILEGES ON DB_ASS.* TO 'pip-admin';

GRANT SELECT ON langcenter.teacher to 'pip-teacher';
GRANT SELECT ON langcenter.branch to 'pip-teacher';
GRANT SELECT ON langcenter.classroom to 'pip-teacher';
GRANT SELECT ON langcenter.course to 'pip-teacher';
GRANT SELECT ON langcenter.class to 'pip-teacher';
GRANT SELECT, INSERT, UPDATE, DELETE ON langcenter.course_curriculum to 'pip-teacher';
GRANT SELECT, UPDATE ON langcenter.student_class to 'pip-teacher';
GRANT SELECT, UPDATE ON langcenter.class to 'pip-teacher';
GRANT SELECT, INSERT, UPDATE, DELETE ON langcenter.attendance to 'pip-teacher';

GRANT SELECT ON langcenter.teacher to 'pip-student';
GRANT SELECT ON langcenter.branch to 'pip-student';
GRANT SELECT ON langcenter.classroom to 'pip-student';
GRANT SELECT ON langcenter.course to 'pip-student';
GRANT SELECT ON langcenter.class to 'pip-student';
GRANT SELECT ON langcenter.attendance to 'pip-student';
GRANT SELECT ON langcenter.course_curriculum to 'pip-student';
GRANT SELECT ON langcenter.student_class to 'pip-student';

FLUSH PRIVILEGES;






BEGIN;

CREATE TABLE IF NOT EXISTS universities (
	universityName varchar(255) NOT null,
	universityTag varchar(50) NOT null,
    logo varchar(255),
    
    PRIMARY KEY (universityTag),
    UNIQUE(universityName),
    UNIQUE(universityTag)
    
);

CREATE TABLE IF NOT EXISTS faculties (
	facultyName varchar(255) NOT null,
    universityTag varchar(255) NOT null,
    INDEX (facultyName),
    
    CONSTRAINT faculty_pkey PRIMARY KEY (universityTag, facultyName),
    FOREIGN KEY (universityTag) REFERENCES universities(universityTag)
);

CREATE TABLE IF NOT EXISTS courses (
	facultyName varchar(255) NOT null,
    universityTag varchar(255) NOT null,
    courseID varchar(255) NOT null,
    courseName varchar(40) NOT null,
    # COURSES CAN HAVE MULTIPLE PROFESSORS
    # PROFESSORS CAN TEACH MULTIPLE COURSES
    # MANY - TO - MANY RELATIONSHIP
    
    
    
    INDEX (courseID),
    
    CONSTRAINT course_pkey PRIMARY KEY (universityTag, courseID),
    FOREIGN KEY (facultyName, universityTag) REFERENCES faculties(facultyName, universityTag)
    
);

CREATE TABLE IF NOT EXISTS professors (
    universityTag varchar(255) NOT null,
    facultyName varchar(255) NOT null,
    professorName varchar(20) NOT null,
    
    PRIMARY KEY (professorName)
    
);

CREATE TABLE IF NOT EXISTS professors_courses (
	professorName varchar(20) NOT null,
    universityTag varchar(40) NOT null,
    facultyName varchar(255) NOT null,
    courseID varchar(255) NOT null,
    
    
    PRIMARY KEY (professorName, universityTag, facultyName, courseID),
    FOREIGN KEY (professorName) REFERENCES professors(professorName),
    FOREIGN KEY (universityTag) REFERENCES universities(universityTag),
    FOREIGN KEY (facultyName) REFERENCES faculties(facultyName),
    FOREIGN KEY (courseID) REFERENCES courses(courseID)
);


CREATE TABLE IF NOT EXISTS UserAccounts (
    username varchar(10) NOT null,
    email varchar(50) NOT null,
    pass varchar(255) NOT null,
    regDate date,
    
    PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS reviews ( # REFERENCING
    universityTag varchar(20) NOT null,
    facultyName varchar(20) NOT null,
    courseID varchar(20) NOT null,
	reviewID integer NOT null AUTO_INCREMENT,
    overallScore integer DEFAULT 0.0,
    easyScore integer DEFAULT 0.0,
    useScore integer DEFAULT 0.0,
    interestScore integer DEFAULT 0.0,
    termTaken text NOT null,
    yearTaken text NOT null,
    grade text,
    delivery text,
    evaluation text,
    workload text,
    textbook text,
    professorName varchar(20) NOT null,
	username varchar(10),
    dateUploaded date,
    valid boolean,
    body text NOT null,
    INDEX(valid),
    INDEX(reviewID),
	
    PRIMARY KEY (universityTag, facultyName, courseID, reviewID),
    FOREIGN KEY (courseID) REFERENCES courses(courseID),
    FOREIGN KEY (professorName) REFERENCES professors(professorName),
    FOREIGN KEY (username) REFERENCES UserAccounts(username) 
);


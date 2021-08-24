# HealthCare-Management-Tool

DB Name = healthcaremanagement_db
Table:
user-details:
    CREATE TABLE user_details ( id int NOT NULL AUTO_INCREMENT,  
    name varchar(255) NOT NULL,  
    phone varchar(20) UNIQUE NOT NULL,    
    passowrd varchar(100),
    role varchar(20) NOT NULL,
    dob DATE NOT NULL,
    date_of_joining DATE NOT NULL,
    PRIMARY KEY (id)
    );

patient_records:
    CREATE TABLE patient_records ( id int NOT NULL AUTO_INCREMENT,  
    symptoms varchar(1000),  
    body_temp varchar(20) NOT NULL,    
    checkin DATETIME NOT NULL,
    checkout DATETIME DEFAULT NULL,
    diagnosis varchar(100),
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES user_details(id)
    );

appointment:
    CREATE TABLE patient_records ( id int NOT NULL AUTO_INCREMENT,  
    patient_id int NOT NULL,
    doctor_id int NOT NULL,
    appointment_time DATETIME NOT NULL
    PRIMARY KEY (id)
    );
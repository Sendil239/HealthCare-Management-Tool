# HealthCare-Management-Tool
DataBase Schema 

DB Name = healthcaremanagement_db
Table:
user-details:
    CREATE TABLE user_details ( id int NOT NULL AUTO_INCREMENT,  
    name varchar(255) NOT NULL,  
    phone varchar(20) UNIQUE NOT NULL,    
    password varchar(100),
    role varchar(20) NOT NULL,
    dob DATE NOT NULL,
    gender varchar(20) NOT NULL,
    date_of_joining DATE NOT NULL,
    blood_group varchar(20),
    speciality varchar(30) DEFAULT NULL,
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
    CREATE TABLE appointment ( apnt_id int NOT NULL AUTO_INCREMENT,  
    patient_id int NOT NULL,
    doctor_id int NOT NULL,
    appointment_time DATETIME NOT NULL,
    symptoms VARCHAR(1000),
    PRIMARY KEY (apnt_id),
    FOREIGN KEY (patient_id) REFERENCES user_details(id),
    FOREIGN KEY (doctor_id) REFERENCES user_details(id)
    );


announcement:
    CREATE TABLE announcement (announcement_id int NOT NULL AUTO_INCREMENT,  
    title varchar(255) NOT NULL,  
    description varchar(1000),    
    user_id int,
    PRIMARY KEY (announcement_id),
    FOREIGN KEY (user_id) REFERENCES user_details(id)
    );

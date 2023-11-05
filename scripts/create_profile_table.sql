CREATE TABLE profile (
	id VARCHAR(50) PRIMARY KEY REFERENCES "user"(id),
	name VARCHAR(20),
	uni_name VARCHAR(30),
	email VARCHAR(50)
);
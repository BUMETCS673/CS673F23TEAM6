CREATE TABLE "user" (
	id VARCHAR(50) PRIMARY KEY,
	email VARCHAR(50),
	phone_number VARCHAR(20),
	verified BOOLEAN,
	password VARCHAR(20),
	last_login_at TIME,
	created_at TIME
);
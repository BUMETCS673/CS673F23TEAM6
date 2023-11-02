CREATE TABLE "user" (
	id VARCHAR(50) PRIMARY KEY,
	email VARCHAR(50),
	phone_number VARCHAR(20),
	verified BOOLEAN,
	password VARCHAR(20),
	last_login_at TIME,
	created_at TIME
);

CREATE TABLE products (
	id VARCHAR(50) PRIMARY KEY,
	status VARCHAR(12),
	price DECIMAL(10, 2),
	description VARCHAR(800),
	seller_id VARCHAR(50) REFERENCES "user"(id),
	category VARCHAR(30),
	quantity INT
);

CREATE TABLE profile (
	id VARCHAR(50) PRIMARY KEY REFERENCES "user"(id),
	name VARCHAR(20),
	uni_name VARCHAR(30),
	email VARCHAR(50)
);
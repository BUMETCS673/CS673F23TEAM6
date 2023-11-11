CREATE TABLE products (
	id VARCHAR(50) PRIMARY KEY,
	status VARCHAR(12),
	price DECIMAL(10, 2),
	description VARCHAR(800),
	seller_id VARCHAR(50) REFERENCES "user"(id),
	category VARCHAR(30),
	quantity INT
);
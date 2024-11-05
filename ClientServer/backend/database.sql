CREATE DATABASE pfma_db;

USE pfma_db;

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    amount FLOAT NOT NULL,
    notes VARCHAR(255)
);

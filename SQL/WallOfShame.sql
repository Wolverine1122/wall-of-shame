-- @block
CREATE DATABASE Wall;
-- @BLOCK
CREATE TABLE Posts(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    message_text varchar(500) NOT NULL,
    date_added varchar(100)
);
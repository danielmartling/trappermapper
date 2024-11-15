/*
The below script will create and configure the base database we need for the trappermapper application.
It is written to allow the administrator to easily run the whole script during the first installation, 
but it can easily be split up if only part of the script needs to be rerun for some reason.
*/

-- Create a database called trappermapper, this will be the main database where we will store our data
CREATE DATABASE trappermapper;


-- Create a table called accounts, this will be where we store the usernames and (hashed) passwords
CREATE TABLE IF NOT EXISTS `accounts` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
  	`username` varchar(50) NOT NULL,
  	`password` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- TODO: Add a test user called test with the password test. IMPORTANT TO REMOVE THIS BEFORE PUSHING TO PRODUCTION!!!
INSERT INTO `accounts` (`id`, `username`, `password`) VALUES (1, 'test', '$2y$10$SfhYIDtn.iOuCW7zfoFLuuZHX6lja4lF4XA4JqNmpiH/.P3zB8JCa');
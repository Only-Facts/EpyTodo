CREATE DATABASE IF NOT EXISTS epytodo;
USE epytodo;

CREATE TABLE IF NOT EXISTS user (
        id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    firstname varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS todo (
        id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_time TIMESTAMP NOT NULL,
    user_id INTEGER UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    status varchar(255) DEFAULT 'not started'
);

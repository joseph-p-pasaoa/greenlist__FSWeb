DROP DATABASE IF EXISTS greenlist_registry_db;
CREATE DATABASE greenlist_registry_db;
\c greenlist_registry_db;


CREATE TABLE creators (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25),
    firstname VARCHAR(25),
    lastname VARCHAR(25),
    password VARCHAR(50),
    about TEXT,
    avatar_url TEXT,
    phone_number VARCHAR(25),
    email VARCHAR(50),
    website_url TEXT,
    address VARCHAR(150)
);

CREATE TABLE resourcers (
    id SERIAL PRIMARY KEY,
    company VARCHAR(50),
    password VARCHAR(50),
    about TEXT,
    avatar_url TEXT,
    phone_number VARCHAR(25),
    email VARCHAR(50),
    website_url TEXT,
    address VARCHAR(150)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    body TEXT,
    resourcers_id INT REFERENCES resourcers(id) ON DELETE CASCADE,
    material_id INT REFERENCES materials(id)
);

CREATE TABLE reclaims (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    quantity_num INT,
    quantity_label VARCHAR(25),
    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    body TEXT,
    creator_id INT REFERENCES creators(id) ON DELETE CASCADE
);

CREATE TABLE materials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25),
    description TEXT,
    photo_url TEXT
);

CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(25),
    description VARCHAR(255),
    photo_url TEXT,
    reclaim_id INT REFERENCES reclaims(id)
);

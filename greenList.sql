DROP DATABASE if exists greenlist_db
CREATE DATABASE greenlist_db;

\c greenlist_db;


CREATE TABLE creators(
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    firstname VARCHAR,
    lastname VARCHAR,
    password VARCHAR,
    about VARCHAR,
    avatar_Url VARCHAR,
    phone_Number VARCHAR,
    email VARCHAR,
    wesbite VARCHAR,
    address VARCHAR
);

CREATE TABLE resourcers(
    id SERIAL PRIMARY KEY,
    company VARCHAR,
    password VARCHAR,
    about VARCHAR,
    avatar_Url VARCHAR,
    phone_Number VARCHAR,
    email VARCHAR,
    wesbite VARCHAR,
    address VARCHAR
);

CREATE TABLE products ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR, 
    body VARCHAR, 
    resourcers_id INT REFERENCES resourcers (id), 
    material_id INT REFERENCES materials (id)
);

CREATE TABLE reclaims ( 
    id SERIAL PRIMARY KEY, 
    name VARCHAR, 
    quantity VARCHAR, 
    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    body VARCHAR, 
    creator_id INT REFERENCES creators (id) 
);

CREATE TABLE materials( 
    id SERIAL PRIMARY KEY, 
    name VARCHAR, 
    description VARCHAR, 
    photo_url VARCHAR
);

CREATE TABLE photos( 
    id SERIAL PRIMARY KEY, 
    name VARCHAR, 
    description VARCHAR, 
    photo_url VARCHAR, 
    reclaim_id INT references reclaims(id)
);

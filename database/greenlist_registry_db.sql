DROP DATABASE IF EXISTS greenlist_registry_db;
CREATE DATABASE greenlist_registry_db;
\c greenlist_registry_db;


CREATE TABLE creators
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE NOT NULL,
    firstname VARCHAR(25) NOT NULL,
    lastname VARCHAR(25) NOT NULL,
    password VARCHAR(50) NOT NULL,
    about TEXT DEFAULT '',
    avatar_url TEXT DEFAULT '',
    phone_number VARCHAR(25) DEFAULT '',
    email VARCHAR(50) UNIQUE NOT NULL,
    website_url TEXT DEFAULT '',
    address VARCHAR(150) DEFAULT ''
);

CREATE TABLE resourcers
(
    id SERIAL PRIMARY KEY,
    company VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    about TEXT DEFAULT '',
    avatar_url TEXT DEFAULT '',
    phone_number VARCHAR(25) DEFAULT '',
    email VARCHAR(50) UNIQUE NOT NULL,
    website_url TEXT DEFAULT '',
    address VARCHAR(150) DEFAULT ''
);

CREATE TABLE materials
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    description TEXT NOT NULL,
    photo_url TEXT
);

CREATE TABLE products
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    body TEXT NOT NULL,
    resourcers_id INT REFERENCES resourcers(id) ON DELETE CASCADE,
    material_id INT REFERENCES materials(id)
);

CREATE TABLE reclaims
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    quantity_num INT NOT NULL,
    quantity_label VARCHAR(25) NOT NULL,
    time_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    body TEXT NOT NULL,
    composition VARCHAR(150) NOT NULL,
    creator_id INT REFERENCES creators(id) ON DELETE CASCADE,
    is_need BOOLEAN DEFAULT FALSE
);

CREATE TABLE photos
(
    id SERIAL PRIMARY KEY,
    photo_url TEXT NOT NULL,
    reclaim_id INT REFERENCES reclaims(id) ON DELETE CASCADE
);


/* SEED DATA */
INSERT INTO creators
(username, firstname, lastname, password, about, avatar_url, phone_number, email, website_url, address)
VALUES
('FashionitaAransa', 'Aransa', 'Garcia', '123', 'Desginer that loves reusing and recycling', 'http://localhost:11500/images/creators/fashionistaAransa.svg', '(000)000-0001', 'aransagarcia@pursuit.org', 'aransa.com', 'no address for you'),
('ElectricTom', 'Sergio', 'Salama', '123', 'I design the best and use the best', 'http://localhost:11500/images/creators/electricTom.png', '(000)-000-0003', 'sergiosalama@pursuit.org', 'electricsTom.com', 'NYU Campus');

INSERT INTO resourcers
(company, password, about, avatar_url, phone_number, email, website_url, address)
VALUES
('GreenIsFuture', '123', 'Company that sells only 100% organic cotton', 'http://localhost:11500/images/resourcers/greenIsFuture.svg', '(000)000-0002', 'greenIsFuture@pursuit.org', 'greenIsFuture.com', 'USA'),
('RoyalApparel', '123', 'Organic Clothing Manufaturers in the U.S.A', 'http://localhost:11500/images/resourcers/royalApparel.jpg', '(000)-000-0004', 'sales@royalapparel.com', 'https://www.royalapparel.net//cgi-bin/liveb2b//wam_tmpl/login.p?site=B2B&layout=Baseb2b&page=login&loginLocation=/wam_tmpl/my_account.p%26page%3Dmy_account', 'USA');

INSERT INTO materials
(name, description, photo_url)
VALUES
('Organic Cotton', 'Organic cotton is the alternative to this harmful process and still creates a comfortable product', 'http://localhost:11500/images/materials/organicCotton.jpg'),
('Hemp', 'This specific type of cannabis plant, does not exhaust the soil and does not require pesticides', 'http://localhost:11500/images/materials/hemp.jpeg'),
('Organic Linen', 'Natural Fabric that is made from flax can be grown without fertilizer.', 'http://localhost:11500/images/materials/organicLinen.jpg');

INSERT INTO products
(name, body, resourcers_id, material_id)
VALUES
('Organic Cotton', 'The finest organic cotton', 1, 1); 


/* DISPLAY QUERIES */
SELECT * FROM creators;
SELECT * FROM resourcers;
SELECT * FROM materials;
SELECT * FROM products;
SELECT * FROM reclaims;
SELECT * FROM photos;

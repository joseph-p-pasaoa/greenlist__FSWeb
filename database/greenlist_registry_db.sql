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
    time_created TIMESTAMP
    WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    body TEXT NOT NULL,
    composition VARCHAR
    (150) NOT NULL,
    creator_id INT REFERENCES creators
    (id) ON
    DELETE CASCADE,
    is_need BOOLEAN
    DEFAULT FALSE
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
('FashionitaAransa', 'Aransa', 'Garcia', '123', 'Desginer that loves reusing and recycling! All about that sustainable lifestyle', 'http://localhost:11500/images/creators/fashionistaAransa.svg', '(000)000-0001', 'aransagarcia@pursuit.org', 'aransa.com', 'New York, NY'),
('ElectricTom', 'Sergio', 'Salama', '123', 'I design the best and use the best', 'http://localhost:11500/images/creators/electricTom.png', '(000)-000-0003', 'sergiosalama@pursuit.org', 'electricsTom.com', 'NYU Campus'); 

INSERT INTO resourcers
(company, password, about, avatar_url, phone_number, email, website_url, address)
VALUES
('Organic Cotton Plus', '123', 'Organic Cotton Plus sets aside organic cotton bales to create 100% certified fabrics for individuals and small businesses.', 'https://yt3.ggpht.com/a/AGF-l79Cz6YTVtCTluYkwozDpzGVWvKf3-aiXepL0Q=s900-c-k-c0xffffffff-no-rj-mo', '(855) SEW-PURE', 'customerservice@organiccottonplus.com', 'https://organiccottonplus.com/', 'USA'),
('Discovery Knitting', '123', 'All knits are first quality repeatable fabrics that are manufactured at our mill.', 'https://wendyward.files.wordpress.com/2018/04/pic10-web1.jpg', '(917)-692-2406', 'usa@discoveryknitting.co.uk', 'https://discoveryknitting.co.uk/'),
('Honeybegood', '123', 'Dedicated to promoting organic and sustainable fabric for the quilting and sewing arts', 'https://cdn.shopify.com/s/files/1/0360/7237/t/49/assets/logo.png?v=17577604175835717049', '(000)-000-0007', 'buzz@honeybegood.com', 'https://www.honeybegood.com/', 'Winsted, Connecticut'),
('MoodFabrics', '123', 'NYC shop that sells orangic fabrics such as organic linen, silk and cotton', 'https://lh5.googleusercontent.com/p/AF1QipPd9nggJD7p0t8nTpkYcN4NMbQe1m3Ytgn4xcAJ=w213-h160-k-no', '(212)-730-5003', 'INFO@MOODFABRICS.COM', 'https://www.moodfabrics.com/', '225 W 37th St 3rd floor, New York, NY 10018'),
('GreenIsFuture', '123', 'Company that sells only 100% organic cotton', 'http://localhost:11500/images/resourcers/greenIsFuture.svg', '(000)000-0002', 'greenIsFuture@pursuit.org', 'greenIsFuture.com', 'USA'),
('RoyalApparel', '123', 'Organic Clothing Manufaturers in the U.S.A', 'http://localhost:11500/images/resourcers/royalApparel.jpg', '(000)-000-0004', 'sales@royalapparel.com', 'https://www.royalapparel.net//cgi-bin/liveb2b//wam_tmpl/login.p?site=B2B&layout=Baseb2b&page=login&loginLocation=/wam_tmpl/my_account.p%26page%3Dmy_account', 'USA');

INSERT INTO materials
(name, description, photo_url)
VALUES
('Organic Cotton', 'Organic cotton is the alternative to this harmful process and still creates a comfortable product', 'http://localhost:11500/images/materials/organicCotton.jpg'),
('Hemp', 'This specific type of cannabis plant, does not exhaust the soil and does not require pesticides', 'http://localhost:11500/images/materials/hemp.jpeg'),
('Organic Linen', 'Natural Fabric that is made from flax can be grown without fertilizer.', 'http://localhost:11500/images/materials/organicLinen.jpg'),
('Recycled Polyester', 'Recycled polyester uses PET (the chemical used to create polyester) from plastic water bottles and breaks them down into fibers. This recycled fabric keeps plastic out of landfills and can be recycled many times over!', 'https://cdn.shopify.com/s/files/1/0047/2947/1076/files/recycledpolyester_01_1024x1024.jpg?v=1551046081'),
('Reclaimed', 'Reclaimed, or deadstock, fabric is material leftover from manufacturers, vintage frabic, or any other unused fabric that is brought secondhand', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTG1A7-p7i5mwjLo5rmQWJQAY7HZLLYB_wu2YhAHQVpNbuHNY7i');

INSERT INTO products
(name, body, resourcers_id, material_id)
VALUES
('Organic Cotton', 'The finest organic cotton', 1, 1),
('SecCotton', 'SecThe finest organic cotton', 1, 2);

INSERT INTO reclaims
(name, quantity_num, quantity_label, body, composition, creator_id, is_need)
VALUES
('Woman''s Nicole Miller Black Leather Jackets', 20, 'adult jackets', 'Nicole Miller black belted jacket with epaulets, size M, very soft, overstock', 'cowhide leather', 1, false),
('Organic Core Wool Roving', 60, 'lbs', 'Organic Core Wool Roving, Stuffing & Filling, Undyed, Comforter, Felting, Craft Fibers, Filler, Animal Sculptures, Dryer Balls, Mulch', 'organic wool', 2, true),
('Naked Organic Wool Roving', 100, 'kilos', 'natural white organic wool roving spinning or felting fibre, unused', 'cowhide leather', 2, true);

INSERT INTO photos
(reclaim_id, photo_url)
VALUES
(1, 'http://localhost:11500/images/reclaims/womCoats1.jpg'),
(1, 'http://localhost:11500/images/reclaims/womCoats2.jpg'),
(2, 'http://localhost:11500/images/reclaims/oWoolRoving1.jpg'),
(2, 'http://localhost:11500/images/reclaims/oWoolRoving2.jpg'),
(3, 'http://localhost:11500/images/reclaims/orgwoolTB1.jpg'),
(3, 'http://localhost:11500/images/reclaims/orgwoolTB2.jpg'), -- 6
(3, 'http://localhost:11500/images/reclaims/orgwoolTB3.jpg'),
(3, 'http://localhost:11500/images/reclaims/orgwoolTB4.jpg');


/* DISPLAY QUERIES */
SELECT * FROM creators;
SELECT * FROM resourcers;
SELECT * FROM materials;
SELECT * FROM products;
SELECT * FROM  reclaims;
SELECT * FROM photos;

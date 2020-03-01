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
    photo_url TEXT,
    socialBenefit TEXT ,
    environmentBenefit TEXT,
    costBenefit TEXT
);

CREATE TABLE products
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    body TEXT NOT NULL,
    resourcers_id INT REFERENCES resourcers(id) ON DELETE CASCADE,
    material_id INT REFERENCES materials(id),
    photo_url TEXT NOT NULL
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
        ('EmilyS', 'Emily', 'Smith', '123', 'Hi, my name is Emily! I''m a creative and visionary fashion designer from New York City. I now have 9 years producing and designing my own clothing', 'http://localhost:11500/images/creators/emilyS.jpg', '(347)-555-5555', 'emilysmith@pursuit.org', 'eSmith.com', 'New York, NY'),

        ('CarlosR', 'Carlos', 'Ramos', '123', 'Hi everyone! I''m Carlos, a Lover of fashion and expressing yourself', 'http://localhost:11500/images/creators/carlosR.jpg', '(347)-555-5555', 'carlosRamos@pursuit.org', 'carlosramos.com', 'New York, NY'),

        ('HeatherW', 'Heather', 'Williams', '123', 'Happy to know that what may be deadstock to me can be repurposed!' , 'http://localhost:11500/images/creators/heatherW.jpg', '(917)-555-5555', 'heatherw@pursuit.org', 'heatherdesgins.com', 'San Franciso, CA'),

        ('JacobD', 'Jacob', 'Davis', '123', 'I''m Jacob. I love experimenting with colors and patterns.', 'http://localhost:11500/images/creators/jacobD.jpg', '(917)-555-5555', 'jacobdavis@pursuit.org', 'davisdesgins.com', 'LA, CA');

    INSERT INTO resourcers
        (company, password, about, avatar_url, phone_number, email, website_url, address)
    VALUES
        ('Organic Cotton Plus', '123', 'Organic Cotton Plus sets aside organic cotton bales to create 100% certified fabrics for individuals and small businesses.', 'http://localhost:11500/images/resourcers/OrganicCottonPlus.jpg', '(855) SEW-PURE', 'customerservice@organiccottonplus.com', 'https://organiccottonplus.com/', 'USA'),

        ('DiscoveryKnitting', '123', 'All our organic yarns are GOTS ceritified', 'https://wendyward.files.wordpress.com/2018/04/pic10-web1.jpg', '(917)-692-2406', 'usa@discoveryknitting.co.uk', 'https://discoveryknitting.co.uk/', 'UK'),

        ('Honeybegood', '123', 'Dedicated to promoting organic and sustainable fabric for the quilting and sewing arts', 'http://localhost:11500/images/resourcers/honeyBeGood.jpg', '(555)-555-5555', 'buzz@honeybegood.com', 'https://www.honeybegood.com/', 'Winsted, Connecticut'),

        ('MoodFabrics', '123', 'NYC shop that sells orangic fabrics such as organic linen, silk and cotton', 'http://localhost:11500/images/resourcers/moodFabrics.jpg', '(212)-730-5003', 'INFO@MOODFABRICS.COM', 'https://www.moodfabrics.com/', '225 W 37th St 3rd floor, New York, NY 10018'),

        ('Organic Fabric Company', '123', 'All of our fabric is certified organic and none of it contains any polyester, bamboo, or rayon.', 'http://localhost:11500/images/resourcers/organicFabricCompany.jpg', '(555)-555-5555', 'Hello@OrganicFabricCo.com', 'https://www.organicfabriccompany.com/', 'CA'),

        ('Bulk Hemp WareHouse', '123', 'We aim to be a World Class Company and supplier of the best hemp fabrics and fibers tailored for your projects, products, needs and desires.', 'http://localhost:11500/images/resourcers/bulkHempWareHouse.jpg', '(805)-410-4367', 'support (at) bulkhempwarehouse.com ', 'https://www.bulkhempwarehouse.com/', 'Pahrump, NV');


    INSERT INTO materials
        (name, description, photo_url, socialBenefit, environmentBenefit, costBenefit)
    VALUES
        ('Organic Cotton', 'Organic cotton is cotton that is produced and certified to organic agricultural standards. Its production sustains the health of soils, ecosystems and people by using natural processes rather than artificial inputs. Importantly organic cotton farming does not allow the use of toxic chemicals or GMOs (genetically modified organisms). Instead, it combines tradition, innovation and science to benefit the shared environment and promote a good quality of life for all involved.', 'http://localhost:11500/images/materials/organicCotton.jpg', 'Growing organic cotton keeps farmers and their families safe. They are not exposed to toxic chemicals in the field or through their food and water supply. It also means farmers grow more than one crop which supplements their food and income', 'No toxic chemicals are used in the growing of organic cotton. It doesn’t damage the soil, has less impact on the air, and uses 88% less water and 62% less energy. Conventional cotton uses about 16% of cthe world’s insecticides and 7% of pesticides', 'Fair price for sustainablitiy. When you buy organic cotton you are investing in water conservation, cleaner air, better soil and farmer livelihoods. The price for organic cotton is therefore sometimes, but not always, higher. However, with demand on the rise, more choices will become available.'),

        ('Hemp', 'Hemp is a specific type of cannabis plant that does not exhaust the soil and does not require pesticides. Not only does it not require any pesiticides it also needs little water, yet it renews the soil with each growth cycle. Its long roots prevent erosion and help retain topsoil. Hemp also grows readily in most temperate regions.', 'http://localhost:11500/images/materials/hemp.jpeg', 'Hemp is affordable, healthy, and sustainable. Not only would hemp farming allow communities to become well-fed and healthier, but it would also introduce more jobs and increase economic viability.', 'Hemp farming uses very little water (half as much as cotton), does not require the use of chemical pesticides or fertilizers, and is a readily renewable resource.', 'Hemp is less expensive to farm because of its minimal growth requirements. Hemp plants grow quickly, producing 5-10 tons of cellulose fiber pulp per acre in four months.'),

        ('Organic Linen', 'Another natural fabric which has similar qualities to hemp, but is made from flax, is linen. Sadly, the way that conventional linen is produced pollutes waterways and uses harmful chemicals. However, the crop does not need to be harvested this way! In certain environments flax can be grown without fertilizer.', 'http://localhost:11500/images/materials/organicLinen.jpg', 'The United Nations Food and Agriculture Organisation state that flax uses 13 times less pesticides than potatoes, but is only approximately 1% of the world’s apparel fibre consumption.The United Nations Food and Agriculture Organisation state that flax uses 13 times less pesticides than potatoes, but is only approximately 1% of the world’s apparel fibre consumption.', ' In the right conditions, linen can be cultivated without fertilizers and grown on marginal land that is unsuitable for food crop production. Linen is also one of the most biodegradable fabrics when untreated.', 'Generally, line that is produced in Europe has a much lower ecological footprint and is higher quality. While line produced in China is cheaper, is also of lower quality and involves the use of argo-chemicals and water processing.'),

        ('Recycled Polyester', 'Recycled polyester uses PET (the chemical used to create polyester) from plastic water bottles and breaks them down into fibers. This recycled fabric keeps plastic out of landfills and can be recycled many times over!', 'http://localhost:11500/images/materials/recycledPolyester.jpg', 'missiing social', 'missing envir', 'missing cost'),

        ('Reclaimed', 'Reclaimed, or deadstock, fabric is material leftover from manufacturers, vintage frabic, or any other unused fabric that is brought secondhand', 'http://localhost:11500/images/materials/reclaimed.jpg', 'missiingsocial', 'missing nvir', 'missing cost'),

        ('Piñatex', 'When it comes to vegan leather alernatives, Piñatex is the material to look out for. This futuristic material is made from pineapple leaf fibre. Not only is it a cruelty-free replacement for leatther, it is natural and sustainable. Because Piñatex is made from a food, it reduces wasttte and helps the farming communities that grow the fruit!', 'http://localhost:11500/images/materials/pinatex.jpg', 'miissingsocial', 'missingenvir', 'missingcost'),

        ('Recycled Cotton', 'Recycled cotton can be generally defined as converting cotton fabric into cotton fiber that can be reused in textile products. Recycled cotton is also commonly referred to as regenerated cotton, reclaimed cotton or shoddy. Recycled content includes recycled raw material, as well as used, reconditioned, and re-manufactured components. Textile recycling is generated from two primary sources: 1. Pre-consumer: includes scraps created by yarn and fabric by-products 2.Post-consumer: includes garments, upholstery, towels, household items to be repurposed.', 'http://localhost:11500/images/materials/recycledCotton.jpg', 'social', 'envir', 'cost');

    -- include photo_url
    INSERT INTO products
        (name, body, resourcers_id, material_id, photo_url)
    VALUES
        ('Light Jersey', 'Hold this fabric up to your cheek and you might never put it down! 100% GOTS Certified Organic Cotton. ', 1, 1, 'http://localhost:11500/images/products/lightJersey_OrganicCottonPlus.jpg'),

        ('Interlock', 'This GOTS certified interlock is soft to the touch and pleasing to the eye. You''ll appreciate its slight stretch and great rebound. Made in India.', 1 , 1, 'http://localhost:11500/images/products/interlock_OrganicCottonPlus.jpg'),

        ('Natural Organic Linen Woven', 'Do something great for the earth and your wardrobe with this 100% Organic fabric', 4, 3, 'http://localhost:11500/images/products/naturalOrganicLinen_moodFabrics.jpg'),

        ('Natural Jersey 100% Hemp', 'This fabric has a soft, silky smooth feel. Great for all sorts of apparel uses.', 1, 2, 'http://localhost:11500/images/products/naturalhemp_OrganicCottonPlus.jpg'),

        ('Hemp Thread', 'Biodegradable, exo friendly, AZO-free dye, and oil free.', 1, 2, 'http://localhost:11500/images/products/naturalhemp_OrganicCottonPlus'),

        ('A House in Bloom: Quilting Cotton', '100% organic cotton fabric woven for your quilting pleasure!', 3, 1, 'http://localhost:11500/images/products/honeyBgood.jpg'),

        ('Scarlet Yarn Dyed Linen', ' Beautiful organic linen! 100% organic linen. Yarn dyed with low impact dyes. Made in India.', 5, 3, 'http://localhost:11500/images/products/Scarlet-organicCompanyFabrics.jpg'),

        ('Mauve Yarn Dye Linen', 'Beautiful soft color! 100% organic linen. Yarn dyed with low impact dyes. Made in India.', 5, 3, 'http://localhost:11500/images/products/Mauve-organiccompanyFabric.jpg'),

        ('Breton Stripe Jersey Ecru/Navy', '70% Organic Cotton 30% Combed Cotton', 2, 1, 'http://localhost:11500/images/products/Breton-Stripe_discoveryStripes.jpg'),

        ('Breton Stripe Jersey Ecru/Red', '70% Organic Cotton 30% Combed Cotton', 2, 1, 'http://localhost:11500/images/products/Breton-JrsyRed_discoveryKnittiing.jpg'),

        ('Maiori Pink Bullseye Organic Cotton Pique', 'You''ll be lookinbg pretty pink in a piece made of this! Mood''s Maiori collection is a wonderful choice for classic polos, midi skirts, charming blazers and more', 4, 1, 'http://localhost:11500/images/products/maiori-pink-bullseye-moodFabrics.jpg'),

        ('Maiori Mint Bullseye Organic Cotton Pique', 'Keep youre stytle in mintt condition with Maiori Mint Bullseye! Mood''s Maiori collection is a wonderful choice for classic polos, midi skirts, charming blazers and more ', 4, 1, 'http://localhost:11500/images/products/maiori-mint-bullseye-moodFabrics.jpg'),

        ('Maiori Beige Bullseye Organic Cotton Pique', ' There''s nothing more drab about this Maiori Deige Bullseye! Mood''s Maiori collection is a wonderful choice for classic polos, midi skirts, charming blazers and more', 4, 1, 'http://localhost:11500/images/products/maiori-beige-bullseye_moodFabrics.jpg'),

        ('100% HEMP (NAVY) CANVAS', 'Enjoy this awesome heavyweight hemp canvas. This product has been used for hundreds of applications from upholstery to throw pillowcases, to art canvas and much more. Hemp naturally has anti-bacterial properties and because of it''s durability and strength will last a very long time!', 6, 2, 'http://localhost:11500/images/products/Hemp-NAVY__WareHouse.png');

    INSERT INTO reclaims
        (name, quantity_num, quantity_label, body, composition, creator_id, is_need)
    VALUES
        ('Woman''s Nicole Miller Black Leather Jackets', 20, 'adult jackets', 'Nicole Miller black belted jacket with epaulets, size M, very soft, overstock', 'cowhide leather', 1, false),

        ('Organic Core Wool Roving', 60, 'lbs', 'Organic Core Wool Roving, Stuffing & Filling, Undyed, Comforter, Felting, Craft Fibers, Filler, Animal Sculptures, Dryer Balls, Mulch', 'organic wool', 2, false),

        ('Naked Organic Wool Roving', 100, 'kilos', 'natural white organic wool roving spinning or felting fibre, unused', 'cowhide leather', 1, false),

        ('Distressed Vintage jeans', 15, 'pairs', 'Vintage distressed relaxed jeans, size M', 'cotton', 1, false),

        ('Light Blue Levis', 20, 'pairs', 'These are great vintage light blue jeans. size M', 'cotton', 2 , false),

        ('Vintage Denim Jackets from 1970s', 30, 'adult jackets', 'Really nice vintage denim jacket, size M men', 'denim, 100% cotton', 2, false),

        ('Men''s Wario Cosplay Tank Top', 50, 'tees', 'Overstock! Nothing wrong with the shirts!', '99% cotton & 10% polyester', 2, false),

        ('Mario Cosplay Hoodie', 20, 'adult hoodies', 'unused hoodies size L', '50% cotton & 50% polyester', 2, false),

        ('Black Jeans', 15, 'pairs', 'Black Highwasited jeans!size 7/8 (vintage sizes run small-these are more ', 'cotton', 3, false),

        ('Denim Vintage Skirt', 30, 'pieces', 'Gap denim skirt buttons and zips in front, and features pockets in front and back and an attached tie belt.Size: Girls size 12; fits like a ladies 4.', 'cotton', 3, false);

    INSERT INTO photos
        (reclaim_id, photo_url)
    VALUES
        (1, 'http://localhost:11500/images/reclaims/womCoats1.jpg'),
        (1, 'http://localhost:11500/images/reclaims/womCoats2.jpg'),
        (2, 'http://localhost:11500/images/reclaims/oWoolRoving1.jpg'),
        (2, 'http://localhost:11500/images/reclaims/oWoolRoving2.jpg'),
        (3, 'http://localhost:11500/images/reclaims/orgwoolTB1.jpg'),
        (3, 'http://localhost:11500/images/reclaims/orgwoolTB2.jpg'),
        -- 6
        (3, 'http://localhost:11500/images/reclaims/orgwoolTB3.jpg'),
        (3, 'http://localhost:11500/images/reclaims/orgwoolTB4.jpg'),

        (4, 'http://localhost:11500/images/reclaims/distressedJeans1.jpg'),
        (4, 'http://localhost:11500/images/reclaims/distressedJeans2.jpg'),

        (5, 'http://localhost:11500/images/reclaims/lightBlueLevis1.jpg' ),
        (5, 'http://localhost:11500/images/reclaims/lightBlueLevis2.jpg'),

        (6, 'http://localhost:11500/images/reclaims/denimJacket1.jpg'),
        (6, 'http://localhost:11500/images/reclaims/denimJacket2.jpg'),
        (6, 'http://localhost:11500/images/reclaims/denimJacket3.jpg'),

        (7, 'http://localhost:11500/images/reclaims/wario.jpg'),
        (8, 'http://localhost:11500/images/reclaims/mario.jpg'),

        (9, 'http://localhost:11500/images/reclaims/GirbaudJeans.jpg' ),

        (9, 'http://localhost:11500/images/reclaims/girbaudJeans2.jpg'),

        (10, 'http://localhost:11500/images/reclaims/vskirt1.jpg'),

        (10, 'http://localhost:11500/images/reclaims/vkskirt2.jpg' ),
        (10, 'http://localhost:11500/images/reclaims/vkskirt3.jpg' ),
        (10, 'http://localhost:11500/images/reclaims/vkskirt4.jpg' );


    /* DISPLAY QUERIES */
    SELECT *
    FROM creators;
    SELECT *
    FROM resourcers;
    SELECT *
    FROM materials;
    SELECT *
    FROM products;
    SELECT *
    FROM reclaims;
    SELECT *
    FROM photos;

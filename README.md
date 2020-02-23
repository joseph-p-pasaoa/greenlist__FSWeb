# Greenlist Registry (back end) (full-stack app)

## Table of Contents

- [Database Schema](#i-database-schema)
- [Endpoints](#ii-endpoints)

## Repos

- [Back End](https://github.com/joseph-p-pasaoa/greenlistRegistry_back__Web) (this repo)
- [Front End](https://github.com/joseph-p-pasaoa/greenlistRegistry_front__Web)

## Developers

- **Aransa Garcia, Joseph P. Pasaoa, Kathy Puma, and Sergio Salama**

## Instructional Team

- **LEAD Instructor:** [Alejandro Franco -- ( @alejo4373 )](https://github.com/alejo4373)
- **IA:** [Jung Rae Jang -- ( @jungraejang )](https://github.com/jungraejang)
- **IA:** [Wynter Reid -- ( @wynterreid )](https://github.com/wynterreid)

## Developer's Notes

### **I. Database SCHEMA**

  - **Creators**
    - id
    - username - _Unique, Not Null_
    - firstname - _Not Null_
    - lastname - _Not Null_
    - password - _Not Null_
    - about
    - avatar_url
    - phone
    - email - _Unique, Not Null_
    - website_url
    - address

  - **Resourcers**
    - id
    - company name - _Unique, Not Null_
    - about
    - avatar_url
    - phone number
    - email - _Unique, Not Null_
    - website_url
    - address

  - **Products**
    - id
    - name - _Not Null_
    - body - _Not Null_
    - resourcer_id - _References Resourcers + On Delete Cascade_
    - material_id - _References Materials_

  - **Reclaims**
    - id
    - name - _Not Null_
    - quantity - _Not Null_
    - body - _Not Null_
    - creator_id - _References Creators + On Delete Cascade_
    - is_need - _Boolean_

  - **Materials**
    - id
    - name - _Not Null_
    - description - _Not Null_

  - **Photos**
    - id
    - title - _Not Null_
    - caption
    - url - _Not Null_
    - reclaim_id - _References Reclaims + On Delete Cascade_

---

### **II. ENDPOINTS**

- **Creators**

  | Method | Endpoint        | Description              | Body Data                                                                                                         |
  | ------ | --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
  | GET    | `/creators`     | Get all creators         | n/a                                                                                                               |
  | GET    | `/creators/:id` | Get single creator by id | n/a                                                                                                               |
  | POST   | `/creators/add`    | Add new creator          | `username`, `firstname`, `lastname`, `password`, `avatar_url`, `phone_number`, `address`, `email`, `website_url`, `about` |
  | PATCH | `/creators/edit`    | Update creator Info      | `username`, `firstname`, `lastname`, `password`, `avatar_url`, `phone_number`, `address`, `email`, `website_url`, `about`  |

* **Resourcers** 

  | Method | Endpoint         | Description                | Body Data                                                                                    |
  | ------ | ---------------- | -------------------------- | -------------------------------------------------------------------------------------------- |
  | GET    | `/resourcers`     | Get all resourcers          | n/a                                                                                          |
  | GET    | `/resourcers/:id` | Get single resourcer by id | n/a                                                                                          |
  | POST   | `/resourcers/add`    | Add new resourcers          | `company_name`, `avatar_url`, `about`, `passowrd`, `phone_number`, `address`, `email`, `website_url` |
  | PATCH | `/resourcers/edit`    | Update creator Info        | `username`, `avatar_url`, `about`, `phone_number`, `address`, `email`, `website_url`, `about`       |

- **Products**

  | Method | Endpoint                   | Description                  | BodyData                                      |
  | ------ | -------------------------- | ---------------------------- | --------------------------------------------- |
  | GET    | `/products`                | Get all products             | n/a                                           |
  | GET    | `/products/:resourcer_id` | Get product by resourcer ID | n/a                                           |
  | POST   | `/products/add`                | ADD new Product              | `name`, `body`, `resourcer_id`, `material_id` |
  | DELETE | `/products/delete/:id`            | Delete single product by ID  | n/a                                           |

- **Reclaims**

  | Method | Endpoint                   | Description                  | BodyData                                                         |
  | ------ | -------------------------- | ---------------------------- | ---------------------------------------------------------------- |
  | GET    | `/reclaims`                | Get all reclaims             | n/a                                                              |
  | GET    | `/reclaims/:resourcer_id` | Add new reclaim              | n/a                                                              |
  | POST   | `/reclaims/add`                | ADD new reclaim              | `name`, `body`, `quantity_num`, `quantity_label`, `time_created`, `creator_id`, `is_need` |
  | DELETE | `/reclaims/delete/:id`            | Delete reclaim product by ID | n/a                                                              |

* **Materials**

  | Method | Endpoint         | Description       | Body Data |
  | ------ | ---------------- | ----------------- | --------- |
  | GET    | `/materials`     | Get all materials | n/a       |
  | GET    | `/materials/:id` | get all by ID     | n/a       |

* **Photos**
​
  | Method | Endpoint              | Description           | Body Data |
  | ------ | --------------------- | --------------------- | --------- |
  | GET    | `/photos`             | Get all photos        | n/a       |
  | GET    | `/photos/:reclaim_id` | Get all by reclaim_id | n/a       |
  | POST   | `/photos/add/`        | Add new photo         | `title`, `caption`, `url`       |
  | DELETE | `/photos/delete/:id`         | Delete photo          | n/a       |

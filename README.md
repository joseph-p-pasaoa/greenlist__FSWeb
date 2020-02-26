# Greenlist Registry (back end) (full-stack app)

## Table of Contents

- [Database Schema](#i-database-schema)
- [Endpoints](#ii-endpoints)

## Repos

- [Back End](https://github.com/joseph-p-pasaoa/greenlistRegistry_back__Web) (this repo)
- [Front End](https://github.com/joseph-p-pasaoa/greenlistRegistry_front__Web)

## Developers

- [**Aransa Garcia**](https://github.com/aransagarcia) (Program Manager)
- [**Joseph P. Pasaoa**](https://github.com/joseph-p-pasaoa) (Tech Lead)
- [**Kathy Puma**](https://github.com/KathyPuma) (PR Review)
- [**Sergio Salama**](https://github.com/sergiocohens) (UX/UI)

## Instructional Team

- **LEAD Instructor:** [Alejandro Franco](https://github.com/alejo4373)
- **IA:** [Jung Rae Jang](https://github.com/jungraejang)
- **IA:** [Wynter Reid](https://github.com/wynterreid)
- **Program Manager:** Dessa Shepherd
- **Mentor:** [Robert Abreu](http://www.fiveeightyeight.com/)

## Industry Advisors

- Percy Hicks -- [EclecticLifestyleByPercyHicks | Instagram](https://www.instagram.com/eclecticlifestylesbypercyhicks)
- Isabella Montoya Paz -- [PazLifestyle](https://www.pazlifestyle.com/)
- Van Tran -- ()
- Lisa ? -- ()

## Developers' Notes

### **I. Database SCHEMA**

![database schema](./readme/database-schema.png)

  - **Creators**
    - id
    - username - _Unique, Not Null_
    - firstname - _Not Null_
    - lastname - _Not Null_
    - password - _Not Null_
    - about
    - avatar_url
    - phone_number
    - email - _Unique, Not Null_
    - website_url
    - address

  - **Resourcers**
    - id
    - company - _Unique, Not Null_
    - password - _Not Null_
    - about
    - avatar_url
    - phone_number
    - email - _Unique, Not Null_
    - website_url
    - address

  - **Materials**
    - id
    - name - _Not Null_
    - description - _Not Null_
    - photo_url

  - **Products**
    - id
    - name - _Not Null_
    - body - _Not Null_
    - resourcers_id - _References Resourcers + On Delete Cascade_
    - material_id - _References Materials_

  - **Reclaims**
    - id
    - name - _Not Null_
    - quantity_num - _Not Null_
    - quantity_label - _Not Null_
    - time_created
    - body - _Not Null_
    - composition - _Not Null_
    - creator_id - _References Creators + On Delete Cascade_
    - is_need - _Boolean_


  - **Photos**
    - id
    - photo_url - _Not Null_
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
  | POST   | `/resourcers/add`    | Add new resourcers          | `company_name`, `avatar_url`, `about`, `password`, `phone_number`, `address`, `email`, `website_url` |
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
  | POST   | `/reclaims/add`                | ADD new reclaim              | `name`, `body`, `composition`,  `quantity_num`, `quantity_label`, `time_created`, `creator_id`, `is_need` |
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
  | POST   | `/photos/add/`        | Add new photo         | `photo_url`, `reclaim_id` |
  | DELETE | `/photos/delete/:id`         | Delete photo          | n/a       |

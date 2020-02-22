# Greenlist Registry (back end) (full-stack app)

## Table of Contents

- [Database Schema](#ii-working-database-schema)
- [Endpoints](#iii-functional-endpoints)

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

- **Users**

  - id
  - username - _Unique, Not Null_
  - avatar_url

- **Shows**

  - id
  - imdb_id
  - title - _Not Null_
  - year
  - img_url

  ***

  - _~~genre*id - \_References Genres*~~_ _(moved to new Shows-Genres)_
  - ~~user*id - \_References Users*~~ _(moved to new Users-Shows)_

- **Genres**

  - id
  - name - _Unique, Not Null_

- **Users_Shows**

  - id
  - user*id - \_References Users + On Delete Cascade*
  - show*id - \_References Shows + On Delete Cascade*
  - watch_status - ("onRadar", "now", "watched")
  - is_top3 - (bool)

- **Shows_Genres**

  - id
  - show*id - \_References Shows + On Delete Cascade*
  - genre*id - \_References Genres + On Delete Cascade*

- **Comments**
  - id
  - commenter*id - \_References Users + On Delete Cascade*
  - usershow*id - \_References Users-Shows + On Delete Cascade*
  - time_modified
  - body - _Not Null_
  ***
  - ~~user*id - \_References Users*~~ _(redundant by new usershow_id)_
  - ~~show*id - \_References Shows*~~ _(redundant by new usershow_id)_

---

### **II. Functional ENDPOINTS**

- **Creators**

  | Method | Endpoint        | Description              | Body Data                                                                                                         |
  | ------ | --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
  | GET    | `/creators`     | Get all creators         | n/a                                                                                                               |
  | GET    | `/creators/:id` | Get single creator by id | n/a                                                                                                               |
  | POST   | `/creators/`    | Add new creator          | `username`, `firstname`, `lastname`, `password`, `avatarUrl`,`phoneNumber`, `address`,`email`, `website`, `about` |
  | UPDATE | `/creators/`    | Update creator Info      | `username`, `firstname`, `lastname`, `password`,`avatarUrl`,`phoneNumber`, `address`,`email`, `website`, `about`  |

* **Resourcers**

| Method | Endpoint         | Description                | Body Data                                                                                    |
| ------ | ---------------- | -------------------------- | -------------------------------------------------------------------------------------------- |
| GET    | `/resources`     | Get all resources          | n/a                                                                                          |
| GET    | `/resources/:id` | Get single resources by id | n/a                                                                                          |
| POST   | `/resources/`    | Add new resources          | `companyName`, `avatarUrl`, `about`, `passowrd`, `phoneNumber`, `address`,`email`, `website` |
| UPDATE | `/resources/`    | Update creator Info        | `username`, `avatarUrl`, `about`, `phoneNumber`, `address`,`email`, `website`, `about`       |

- **Products**

  | Method | Endpoint                   | Description                  | BodyData                                      |
  | ------ | -------------------------- | ---------------------------- | --------------------------------------------- |
  | POST   | `/products`                | ADD new Product              | `name`, `body`, `resourcer_id`, `material_id` |
  | GET    | `/products`                | Get all products             | n/a                                           |
  | GET    | `/products/:resourcers:id` | Get product by resourcers ID | n/a                                           |
  | DELETE | `/products/:id`            | Delete single product by ID  | n/a                                           |

- **Reclaims**

  | Method | Endpoint                   | Description                  | BodyData                                                         |
  | ------ | -------------------------- | ---------------------------- | ---------------------------------------------------------------- |
  | POST   | `/reclaims`                | ADD new reclaim              | `name`, `body`, `quantity`, `timestamp`, `creator_id`, `is_need` |
  | GET    | `/reclaims`                | Get all reclaims             | n/a                                                              |
  | GET    | `/reclaims/:resourcers:id` | Add new reclaim              | n/a                                                              |
  | DELETE | `/reclaims/:id`            | Delete reclaim product by ID | n/a                                                              |

* **Materials**

  | Method | Endpoint         | Description       | Body Data |
  | ------ | ---------------- | ----------------- | --------- |
  | GET    | `/materials`     | Get all materials | n/a       |
  | GET    | `/materials/:id` | get all by ID     | n/a       |


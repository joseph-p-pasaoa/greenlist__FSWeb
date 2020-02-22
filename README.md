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

- **Creators**

- id
- username
- firstname
- lastname
- password
- about
- avatar_url
- phone
- email
- website
- address

- **Resourcers**

- id
- company name
- about
- avatar_url
- phone number
- email
- website
- address

- **Products**

  - id
  - name - _Unique, Not Null_
  - body
  - resourcers_id
  - material_id

- **Reclaim**
- id
- name
- quantity
- body
- creator_id
- is_need

- **Materials**
- id
- name
- description

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

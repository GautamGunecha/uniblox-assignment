
# Ecommerce Backend

An ecommerce backend project where clients can add items to their cart, check out to successfully place an order, and receive a discount coupon for up to 10% off.





## Installation

Clone the Repository:

Use the git clone command to clone the repository. Run the following command in your terminal:

```bash
  https://github.com/GautamGunecha/uniblox-assignment
```
    
Navigate to the Project Directory:

```bash
cd uniblox-assignment
```

Install Dependencies:

Use Node Package Manager (npm) to install the project's dependencies. Run the following command:

```bash
npm install
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`SECRET_KEY`


## Run Locally
Start the server

```bash
  npm run dev
```


## API Reference

#### Register

```http
  POST /api/auth/register
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`, `password` | `string` | Email id must be unique. |

#### Login

```http
  POST /api/auth/signin
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`, `password`      | `string` |  Email Id and password must be same that used for register. |

#### Signout

```http
  POST /api/auth/signout
```

#### Add Item to Cart

```http
  POST /api/cart
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productId, quantity`      | `string, number` |  Product Id and quantity. |

#### Get Item from Cart

```http
  GET /api/cart
```
#### Delete Item from Cart

```http
  DELETE /api/cart
```

| Query | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productId, quantity`      | `string, number` |  Product Id and quantity. |


#### Generate Coupon Code

```http
  POST /api/coupon
```

| Query | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|--------|--------|  Require admin access to generate new coupon code. |

#### Get analytics

```http
  GET /api/analytics
```

| Query | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|--------|--------|  Require admin access to analytics of number of items sold, coupon code used and discount amount. |

## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Documentation

"To access the APIs, you have two options. First, you must register yourself. Alternatively, you can use dummy user accounts that are automatically created the first time you run the following command:

```npm run dev```

By choosing the latter option, you can quickly start using the APIs without the need for manual registration."

Dummy admin user credentials

```
email: amit@gmail.com
password: amit2023
```


# Sneaker Configurator API

---

## **Overview**

This is the Node.js API for my 3D Sneaker Configurator school project. It handles orders, authentication, and admin actions, allowing customers to place customized sneaker orders and admins to manage them. 

The API is built with Express.js, MongoDB, and Socket.io for real-time updates.

---

## **Base URL**
**Production:**  
`https://api.sneaker-configurator.larslars.be`

---

## **API Documentation**

### **Authentication**

#### **1. POST `/api/v1/auth/login`**
**Description:** Logs in an admin user and returns a JWT token.  

- **Headers:**  
  `Content-Type: application/json`

- **Request Body:**  
  ```json
  {
    "username": "admin",
    "password": "Admin"
  }
  ```

- **Response:**  
  **Success:**  
  ```json
  {
    "status": "success",
    "token": "jwt_token_here"
  }
  ```  
  **Fail:**  
  ```json
  {
    "status": "fail",
    "message": "Invalid credentials"
  }
  ```

---

#### **2. POST `/api/v1/auth/change-password`**
**Description:** Changes the admin's password. Requires a valid token.  

- **Headers:**  
  - `Authorization: Bearer <token>`  
  - `Content-Type: application/json`

- **Request Body:**  
  ```json
  {
    "oldPassword": "Admin",
    "newPassword": "NewPassword123"
  }
  ```

- **Response:**  
  **Success:**  
  ```json
  {
    "status": "success",
    "message": "Password changed successfully"
  }
  ```  
  **Fail:**  
  ```json
  {
    "status": "fail",
    "message": "Old password is incorrect"
  }
  ```

---

### **Orders**

#### **3. POST `/api/v1/orders`**
**Description:** Creates a new sneaker order.  

- **Headers:**  
  `Content-Type: application/json`

- **Request Body:**  
  ```json
  {
    "customer": {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+123456789",
      "address": "123 Main St",
      "city": "New York",
      "zip": "10001",
      "country": "USA"
    },
    "shoeConfig": {
      "size": 42,
      "colors": {
        "laces": "Red",
        "sole": "White",
        "body": "Blue"
      }
    }
  }
  ```

- **Response:**  
  **Success:**  
  ```json
  {
    "status": "success",
    "data": {
      "id": "order_id_here",
      "customer": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        ...
      },
      "shoeConfig": {
        "size": 42,
        ...
      }
    }
  }
  ```

---

#### **4. DELETE `/api/v1/orders/{id}`**
**Description:** Deletes an order by ID. Requires admin authentication.  

- **Headers:**  
  `Authorization: Bearer <token>`

- **Response:**  
  **Success:**  
  ```json
  {
    "status": "success",
    "message": "Order deleted successfully"
  }
  ```  
  **Fail:**  
  ```json
  {
    "status": "fail",
    "message": "Order not found"
  }
  ```

---

#### **5. PUT `/api/v1/orders/{id}`**
**Description:** Updates the status of an order. Requires admin authentication.  

- **Headers:**  
  `Authorization: Bearer <token>`  
  `Content-Type: application/json`

- **Request Body:**  
  ```json
  {
    "status": "In Production"
  }
  ```

- **Response:**  
  **Success:**  
  ```json
  {
    "status": "success",
    "data": {
      "id": "order_id_here",
      "status": "In Production"
    }
  }
  ```

---

#### **6. GET `/api/v1/orders/{id}`**
**Description:** Retrieves the details of a specific order by ID. Requires admin authentication.  

- **Headers:**  
  `Authorization: Bearer <token>`

- **Response:**  
  ```json
  {
    "status": "success",
    "data": {
      "id": "order_id_here",
      "customer": {
        "name": "John Doe",
        ...
      },
      "shoeConfig": {
        "size": 42,
        ...
      }
    }
  }
  ```

---

#### **7. GET `/api/v1/orders`**
**Description:** Retrieves all orders. Optionally sort by `date` or `votes`. Requires admin authentication.  

- **Headers:**  
  `Authorization: Bearer <token>`

- **Query Parameters:**  
  - `sortby` (optional): `votes` or `date`

- **Response:**  
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "order_id_here",
        ...
      },
      {
        "id": "order_id_here",
        ...
      }
    ]
  }
  ```

---

## **WebSocket Integration**

- When a new order is created, a WebSocket event is broadcasted to all connected clients.  
  **Event Name:** `new_order`  
  **Payload:**  
  ```json
  {
    "id": "order_id_here",
    "customer": { ... },
    "shoeConfig": { ... }
  }
  ```

- When an order status is updated, a WebSocket event is broadcasted.  
  **Event Name:** `order_updated`  
  **Payload:**  
  ```json
  {
    "id": "order_id_here",
    "status": "In Production"
  }
  ```

---


## **Deployment**
- **Backend:** Hosted on Render.com.
- **Database:** Hosted on MongoDB Atlas.

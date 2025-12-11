# Assignments

This repository contains a backend API built with NestJS and TypeORM and a frontend built with React (Vite + TypeScript).

## Project Overview

- **Backend:** NestJS app providing user and product endpoints.
- **Frontend:** React app (Vite) in `frontend/my-app`.

## Tech Stack

- **Backend:** NestJS, TypeScript, TypeORM
- **Database:** (configured via TypeORM in the backend) — typically PostgreSQL / SQLite depending on env
- **Frontend:** React, Vite, TypeScript, CSS
- **Tools & Dev:** Node.js, npm/yarn, ESLint

## Quick Start

1. Install dependencies for backend and frontend:

```powershell
cd backend/backend-api
npm install
cd ../../frontend/my-app
npm install
```

2. Run the backend and frontend (example):

```powershell
cd backend/backend-api
npm run start:dev
# in a separate terminal
cd frontend/my-app
npm run dev
```

Adjust commands to match your `package.json` scripts.

## API Endpoints

Base path for backend is the NestJS server (e.g. `http://localhost:3001`). The routes below are taken from the backend controllers in `backend/backend-api/src/user/controller`.

### User

- **POST** /user/register
	- Description: Create a new user
	- Request body (JSON):
		```json
		{
			"username": "string",
			"email": "string",
			"password": "string"
		}
		```

- **POST** /user/login
	- Description: Verify user credentials (login)
	- Request body (JSON):
		```json
		{
			"email": "string",
			"password": "string"
		}
		```
	- Response (example):
		```json
		{ "success": true, "message": "Login successful" }
		```

### Product (base: /product)

- **POST** /product/addproduct
	- Description: Add a new product
	- Request body (JSON):
		```json
		{
			"productname": "string",
			"productprice": 123.45,
			"productavalible": 10
		}
		```

- **GET** /product/products
	- Description: Retrieve all products

- **PATCH** /product/:id
	- Description: Update a product by `id` (parameter)
	- Path param: `id` (number)
	- Request body: same shape as product object (supply fields to update)

- **DELETE** /product/:id
	- Description: Delete a product by `id` (parameter)

## DTOs and Sources

- User DTO: `backend/backend-api/src/user/dtos/CreateUser.dto.ts`
- Verify DTO: `backend/backend-api/src/user/dtos/verifyUser.dto.ts`
- Product DTO: `backend/backend-api/src/user/dtos/Product.dto.ts`
- Controllers: `backend/backend-api/src/user/controller`

## Notes

- The README lists endpoints discovered in the current code. If you add more controllers or change routes, update this file.
- You may want to add auth, validation pipes, and proper response schemas for production use.

---

If you'd like, I can also generate example `curl` or Postman requests for each endpoint, or add a small API usage section to the frontend README.


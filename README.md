# BuyCars.com Project

Welcome to the BuyCars.com project! This repository contains the implementation of a second-hand car marketplace, where dealers can list their inventory of cars and buyers can explore and purchase cars. This document provides an overview of the project, its features, and the technologies used to build it.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

BuyCars.com (BUYC Corp) is a marketplace designed to facilitate the buying and selling of second-hand cars. Car dealers can list their cars on the platform, providing details about the cars they have in their inventory. Buyers can browse through the available cars, apply filters, and make purchases directly from the website.

## Features

- User Authentication: Secure signup and login screens for dealers to access their accounts.
- Car Listing: Dealers can add detailed information about the second-hand cars they want to sell, including images and specifications.
- Filters: Buyers can filter cars based on price, colors, and mileage to find the cars that match their preferences.
- Car Management: Dealers can view, edit, and delete their listed cars.
- OEM Specifications: The platform provides information about car models from various manufacturers.
- API Integration: APIs are implemented to retrieve the number of available OEM models and search for specific car model specifications.

## Tech Stack

The project is built using the following technologies:

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- Deployment: Vercel (Frontend), Render (Backend)

## Getting Started

To set up and run the project locally, follow these steps:

1. Clone the repository.
2. Navigate to the frontend directory and run `npm install` to install frontend dependencies.
3. Navigate to the backend directory and run `npm install` to install backend dependencies.
4. Configure MongoDB connection in the backend Enviroment Variables in (`.env`).
5. Run the frontend with `npm run dev` in the frontend directory.
6. Run the backend with `node index.js or nodemon` in the backend directory.

## API Documentation

APIs are implemented to interact with the platform. API documentation is available in the [API Documentation](API_DOCUMENTATION.md) file.

## Deployment

The project is deployed using Vercel for the frontend and Render for the backend. The live application can be accessed at [https://buy-cars-alpha.vercel.app](https://buy-cars-alpha.vercel.app).

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please feel free to submit a pull request.



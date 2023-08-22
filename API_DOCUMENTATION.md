Sure, here's an example of how you might structure the API documentation in Markdown format:

```markdown
# BuyCars.com API Documentation

This documentation outlines the APIs used in the BuyCars.com project. These APIs allow interaction between the frontend and backend components of the application.

## Table of Contents

- [Get Number of OEM Models](#get-number-of-oem-models)
- [Search for OEM Specifications](#search-for-oem-specifications)

## Get Number of OEM Models

### Request

- **URL:** `/api/oem/models/count`
- **Method:** `GET`

#### Response

- **Status Code:** 200 (OK)
- **Response Format:**

```json
{
  "count": 10
}
```

### Description

This API endpoint retrieves the number of available Original Equipment Manufacturer (OEM) models.

---

## Search for OEM Specifications

### Request

- **URL:** `/api/oem/specs?model=Honda%20City&year=2015`
- **Method:** `GET`

#### Query Parameters

- `model`: (Required) The name of the car model.
- `year`: (Required) The year of the car model.

#### Response

- **Status Code:** 200 (OK)
- **Response Format:**

```json
{
  "model": "Honda City",
  "year": "2015",
  "listPrice": "$20,000",
  "colors": ["Red", "Blue", "White"],
  "mileage": "30,000",
  "power": "120 BHP",
  "maxSpeed": "180 km/h"
}
```

### Description

This API endpoint searches for OEM specifications of a specific car model and year.

---

## Notes

- Replace placeholders like `model` and `year` with actual values when making requests.
- The responses are in JSON format.
- Error responses (e.g., 404 Not Found, 500 Internal Server Error) include appropriate error messages.

---

**Note:** This documentation provides a simplified example. Ensure to include all relevant information, input validation, and error handling as required for your actual project.
```

Feel free to modify and expand upon this documentation to match the actual APIs and parameters used in your project.
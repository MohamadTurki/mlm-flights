# ✈️ MLM Flights

MLM Flights is a polished front-end flight reservation website built with HTML, CSS, JavaScript, and Bootstrap 5. It provides a smooth booking flow where users can search flights, review results, select a route, and complete a mock reservation.

## 👥 Project Team & Contributions

| Name | Student Number | Contribution |
| :--- | :--- | :--- |
| **Mohammed Turki** | B251202554 | Project coding and logic implementation. |
| **Loudjaine Bechata** | B241202552 | Project coding and final presentation. |
| **Mariya Abusalem** | B251202551 | Project coding and final presentation. |

---

## ✨ Features

- Clean and responsive landing page
- Flight search by departure city, arrival city, and travel date
- Search results with pricing, duration, seats, and airline details
- Booking summary panel for quick review
- Checkout form with validation
- Booking confirmation modal with a generated confirmation number
- Contact page with support information and message form

## 📄 Pages

- **Home:** landing page with quick search and service highlights
- **Search Flights:** detailed flight search interface
- **Flight Results:** matching flights and booking summary
- **Booking:** passenger and payment form
- **Contact:** support details, FAQ, and inquiry form

## 🛠 Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5

## 📂 Project Structure

- `app.js`: app logic for search, booking, and form handling
- `index.html`: homepage
- `search.html`: flight search page
- `results.html`: search results page
- `booking.html`: checkout page
- `contact.html`: support page
- `styles.css`: custom styling
- `flights.json`: sample flight data

## 🚀 Getting Started

This project is static, so no installation is required.

### Run locally

1. Open the project folder in your editor.
2. Launch `index.html` in a browser.
3. Start searching for flights from the homepage or Search Flights page.

> **Tip:** If you are using VS Code, the easiest option is to open `index.html` with the **Live Server** extension.

## ⚙️ How It Works

1. **Data Loading:** Flight data is loaded dynamically from `flights.json`.
2. **Search:** Users select departure city, arrival city, and date.
3. **Filtering:** Matching flights are displayed on the results page using JavaScript filters.
4. **State Management:** Search state is stored in `sessionStorage` so users can move between pages without losing context.
5. **Validation:** The booking form validates required information before showing a confirmation modal.

## 📝 Notes

- The booking flow is a front-end demo and does not submit to a real payment gateway.

## 📸 Screenshot

![App Image](https://i.imgur.com/ES0BJYt.jpeg)

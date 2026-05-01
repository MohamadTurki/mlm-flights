# ✈️ MLM Flights

MLM Flights is a polished front-end flight reservation website built with HTML, CSS, JavaScript, and Bootstrap 5. It provides a smooth booking flow where users can search flights, review results, select a route, and complete a mock reservation.

## Features

- Clean and responsive landing page
- Flight search by departure city, arrival city, and travel date
- Search results with pricing, duration, seats, and airline details
- Booking summary panel for quick review
- Checkout form with validation
- Booking confirmation modal with a generated confirmation number
- Contact page with support information and message form

## Pages

- Home: landing page with quick search and service highlights
- Search Flights: detailed flight search interface
- Flight Results: matching flights and booking summary
- Booking: passenger and payment form
- Contact: support details, FAQ, and inquiry form

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Bootstrap 5

## Project Structure

- app.js: app logic for search, booking, and form handling
- index.html: homepage
- search.html: flight search page
- results.html: search results page
- booking.html: checkout page
- contact.html: support page
- styles.css: custom styling
- flights.json: sample flight data

## Getting Started

This project is static, so no installation is required.

### Run locally

1. Open the project folder in your editor.
2. Launch index.html in a browser.
3. Start searching for flights from the homepage or Search Flights page.

If you are using VS Code, the easiest option is to open index.html with Live Server or a similar local preview extension.

## How It Works

1. Flight data is loaded from flights.json.
2. Users select departure city, arrival city, and date.
3. Matching flights are displayed on the results page.
4. After selecting a flight, users continue to the booking page.
5. The booking form validates required information before showing a confirmation modal.

## Notes

- Search state is stored in sessionStorage so users can move between pages without losing context.
- The booking flow is a front-end demo and does not submit to a real payment gateway.

## Screenshot

![App Image](https://i.imgur.com/ES0BJYt.jpeg)

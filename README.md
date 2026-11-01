# Urban Style Ecommerce Homepage

Urban Style is a responsive ecommerce homepage built with HTML, CSS, and JavaScript. The project uses product data from the Fake Store API and turns it into a dynamic shopping experience with product cards, filters, product options, cart totals, VAT, and a mini-cart interface.

The goal of this project is to demonstrate core front-end development skills through a realistic ecommerce page, including DOM manipulation, API fetching, modular JavaScript, responsive layout, and interactive UI behavior.

## Live Demo

https://josesiva-code.github.io/ecommerce-homepage/

## Features

- Dynamic product loading from the Fake Store API
- Responsive product grid for desktop, tablet, and mobile
- Category filters for all products, men's clothing, women's clothing, jewelry, electronics, and backpacks
- Product cards with image, title, category badge, price, options, quantity, and add-to-cart action
- Product-specific options such as sizes, colors, capacities, platforms, materials, and bracelet/ring measurements
- Cart counter with total quantity
- Visible subtotal calculation
- VAT included calculation using a 19% rate
- Mini-cart with added product details
- Quantity-based item removal from the cart
- Clear cart action
- Collapsed mini-cart that opens on hover or focus
- Modern UI styling with a dark header, hero image, polished cards, styled controls, hover states, and responsive behavior

## Technologies Used

- HTML5
- CSS3
- JavaScript ES Modules
- Fake Store API
- Git and GitHub
- GitHub Pages

## Project Structure

```text
ecommerce-homepage/
├── index.html
├── style.css
├── main.js
├── cart.js
├── ecommerce.js
├── store2.webp
└── README.md
```

## JavaScript Overview

The project separates responsibilities across different JavaScript files:

- `main.js` handles API requests, rendering products, filters, product options, cart UI updates, subtotal, VAT, and mini-cart behavior.
- `cart.js` contains the external add-to-cart request logic.
- `ecommerce.js` contains the ecommerce class structure required for the project.

## Design Direction

The visual style takes an editorial, warm-market direction, using:

- Deep forest-green navigation with clay-colored accents
- A photographic hero with a dark green overlay and serif headline
- Warm cream backgrounds and paper-toned product cards
- Restrained borders, compact category labels, and clear product controls
- Responsive layouts and visible keyboard-focus states

## Learning Goals

This project was developed step by step to practice and understand:

- Semantic HTML structure
- CSS layout and responsive design
- JavaScript functions and events
- Fetching and using API data
- Creating DOM elements dynamically
- Managing cart state in JavaScript
- Working with modules
- Writing readable, commented code
- Using Git and GitHub during development

## Status

The main project requirements are complete. Additional visual and interaction improvements were added to make the page feel more polished and closer to a professional ecommerce homepage.

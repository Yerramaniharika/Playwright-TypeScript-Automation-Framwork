# QA Assignment - Playwright Test Suite

This project contains automated tests for UI and API endpoints using Playwright.

## Project Structure

```
my-qa-assignment/
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   └── api/
│       └── users.spec.ts
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   └── CheckoutPage.ts
├── playwright.config.ts
└── README.md
```

## Installation

```bash
npm install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run specific test file:
```bash
npm test tests/ui/login.spec.ts
```

Run tests in headed mode:
```bash
npm test --headed
```

Run tests for specific browser:
```bash
npm test --project=chromium
```

## Page Object Model

Page objects are located in the `pages/` directory and encapsulate selectors and interactions for different pages of the application.

## Test Files

- **UI Tests**: Located in `tests/ui/` directory
  - `login.spec.ts` - Login functionality tests
  - `cart.spec.ts` - Shopping cart tests
  - `checkout.spec.ts` - Checkout process tests

- **API Tests**: Located in `tests/api/` directory
  - `users.spec.ts` - Users API endpoint tests

## Configuration

Playwright configuration is defined in `playwright.config.ts`. Modify this file to:
- Change base URL
- Add different browsers
- Configure reporters
- Set up web server

## License

MIT

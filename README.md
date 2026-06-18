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

  - `login.spec.ts` - Login functionality tests
  - `cart.spec.ts` - Shopping cart tests
  - `checkout.spec.ts` - Checkout process tests

  - `users.spec.ts` - Users API endpoint tests

## Configuration

Playwright configuration is defined in `playwright.config.ts`. Modify this file to:

## License

MIT
# QA Automation Suite - Playwright

Comprehensive test automation using **Playwright** for UI and API testing on [SauceDemo](https://www.saucedemo.com) and [ReqRes API](https://reqres.in).

---

## Prerequisites

- **Node.js** 18+ ([Download here](https://nodejs.org))
- **npm** (comes with Node.js)
- **Git** (for version control)

---

## Installation & Setup

```bash
# Navigate to project
cd c:\my-qa-assignment

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## Running Tests

### **Run All Tests**
```bash
npm test
```

### **Run Specific Suites**
```bash
npx playwright test tests/ui              # UI tests only
npx playwright test tests/api             # API tests only
npx playwright test tests/ui/login.spec.ts # Single file
```

### **Run with Options**
```bash
npm run test:ui        # Interactive mode
npm run test:headed    # Browser visible
npm run test:debug     # Debug mode
npx playwright show-report  # View HTML report
```

---

## Project Structure

```
my-qa-assignment/
├── pages/
│   ├── LoginPage.ts          # Login interactions
│   ├── ProductsPage.ts       # Products interactions
│   └── CheckoutPage.ts       # Checkout interactions
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts     # 2 tests: standard user, locked-out user
│   │   ├── cart.spec.ts      # 1 test: add 2 products to cart
│   │   └── checkout.spec.ts  # 2 tests: sort products, full checkout
│   └── api/
│       └── users.spec.ts     # 3 tests: GET users, POST user, chain test
├── playwright.config.ts      # Configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

---

## Test Specifications

### **UI Tests** (5 total)

**login.spec.ts** (2 tests)
- ✅ `standard_user` logs in → lands on `/inventory.html`
- ✅ `locked_out_user` → sees error "Epic sadface: Sorry, this user has been locked out."

**cart.spec.ts** (1 test)
- ✅ Login → add 2 products → cart badge shows `"2"`

**checkout.spec.ts** (2 tests)
- ✅ Sort by Price (low→high) → verify first item is lowest price
- ✅ Full checkout flow → "Thank you for your order!" message appears

### **API Tests** (3 total)

**users.spec.ts** (3 tests)
- ✅ GET `/api/users?page=2` → status 200, user data array with id, email, first_name, last_name
- ✅ POST `/api/users { name: "morpheus", job: "leader" }` → status 201, response has name, job, id, createdAt
- ✅ BONUS: Chain POST → verify response id and createdAt fields are populated

---

## Page Objects Reference

### **LoginPage**
```typescript
goto()                      // Navigate to login page
login(username, password)   // Fill credentials and submit
getErrorMessage()           // Get error message text
```

### **ProductsPage**
```typescript
addProductToCart(name)      // Add product by name to cart
getCartBadgeCount()         // Get cart count as number
sortBy(option)              // Sort products (e.g., 'lohi' for low→high)
getFirstProductPrice()      // Get first product price
getAllProductPrices()       // Get all product prices as array
```

### **CheckoutPage**
```typescript
fillCheckoutInfo(fn, ln, zip)   // Fill form fields
clickContinue()                 // Click continue
clickFinish()                   // Click finish
getCartItemsCount()             // Get items in cart
getCheckoutCompleteMessage()    // Get success message
```

---

## Configuration

**`playwright.config.ts` settings:**
- **baseURL**: `https://www.saucedemo.com`
- **browserName**: `chromium`
- **fullyParallel**: `true` (all tests run in parallel)
- **reporter**: `html` (results at `./playwright-report/`)
- **timeout**: 30s per test
- **use.trace**: `on-first-retry`

---

## Testing Best Practices

✅ **Page Object Model** — UI logic separated from test logic  
✅ **Data-test selectors** — Uses `data-test` attributes for reliability  
✅ **Test independence** — Each test is self-contained, no state sharing  
✅ **beforeEach hooks** — Setup runs before each test  
✅ **Proper assertions** — One behavior per assertion  
✅ **Type safety** — TypeScript for better IDE support  

---

## Troubleshooting

**"Cannot find module '@playwright/test'"**
```bash
npm install
npx playwright install
```

**"Browser not found" error**
```bash
npx playwright install chromium
```

**Tests timeout**
- Increase timeout in `playwright.config.ts`: `timeout: 60000` (60 seconds)

**Port already in use**
- Kill existing processes or change port in config

---

## Future Enhancements

- Add `problem_user` scenario tests
- Visual regression testing
- Accessibility (a11y) testing
- Negative API test cases
- Performance benchmarking
- Load testing with k6
- Retry logic for flaky tests

---

## License

MIT

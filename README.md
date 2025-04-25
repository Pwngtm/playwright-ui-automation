# 🧪 UI Automation with Playwright (SauceDemo)

This project demonstrates automated UI testing using **Playwright** with **TypeScript**, targeting the [SauceDemo website](https://www.saucedemo.com/v1).

## 📦 Tech Stack

- Playwright
- TypeScript
- Dotenv for secure environment variables
- HTML Reporter (built-in)

## 🚀 Getting Started

    1. Clone the Repository

        ```bash
        git clone https://github.com/Pwngtm/playwright-ui-automation.git
        cd playwright-ui-automation

    2. Install Dependencies
        npm install

    3. Create .env File

        In the root of the project, create a .env file and add the following:

        BASE_URL=https://www.saucedemo.com/v1
        USER=standard_user
        PASSWORD=secret_sauce
        INVALID_USER=wrong_user
        INVALID_PASSWORD=wrong_password

## 🧪 Running Tests

    Run All Tests
        `npm test`
    Run with HTML Report (explicit)
        `npm run test:html`
    Run Tests in Headed Browser
        `npm run test:headed`
    Run Specific Test Files
        `npm run test:login      # Only login tests
        npm run test:cart       # Only cart tests
        npm run test:checkout   # Only checkout tests
        `
    Run in Chromium with HTML Report
        `Run in Chromium with HTML Report`
    Run in Serial Mode (non-parallel)
        `npm run test:serial`
    Run Specific Test Case by Name
        `npm run test:name`

## 📊 Viewing HTML Test Reports

    Reports are generated automatically after running tests.

    Open Report
        `npm run test:report`
    Or manually:
        `npx playwright show-report`

## 📁 Project Structure

    ├── pages/
    │   ├── LoginPage.ts
    │   ├── CartPage.ts
    │   └── CheckoutPage.ts
    │
    ├── tests/
    │   ├── login.spec.ts
    │   ├── cart.spec.ts
    │   └── checkout.spec.ts
    │
    ├── .env
    ├── package.json
    ├── playwright.config.ts
    └── README.md

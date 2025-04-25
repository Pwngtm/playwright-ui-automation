import { expect, test } from "@playwright/test";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

test.describe("Login tests for Saucedemo", () => {
  // Setup and initialization before tests
  test.beforeEach(async ({ page }) => {
    // Go to the base URL for the site
    await page.goto(process.env.BASE_URL!); // Using the BASE_URL from .env
  });

  // Test case 1: Login with valid credentials
  test("should login with valid credentials", async ({ page }) => {
    // Enter username and password
    await page.fill('[data-test="username"]', process.env.USER!); // Valid username from .env
    await page.fill('[data-test="password"]', process.env.PASSWORD!); // Valid password from .env

    await page.click("#login-button");

    // Verify that the URL is correct after login
    await expect(page).toHaveURL(`${process.env.BASE_URL}/inventory.html`);
  });

  // Test case 2: Login with invalid credentials (incorrect username)
  test("should show an error with invalid username", async ({ page }) => {
    // Enter incorrect username and valid password
    await page.fill('[data-test="username"]', process.env.INVALID_USER!); // Invalid username from .env
    await page.fill('[data-test="password"]', process.env.PASSWORD!); // Valid password from .env

    // Click login button
    await page.click("#login-button");

    // Verify the error message
    const errorMessageLocator = page.locator('h3[data-test="error"]');
    await expect(errorMessageLocator).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  // Test case 3: Login with invalid credentials (incorrect password)
  test("should show an error with invalid password", async ({ page }) => {
    // Enter valid username and incorrect password
    await page.fill('[data-test="username"]', process.env.USER!); // Valid username from .env
    await page.fill('[data-test="password"]', process.env.INVALID_PASSWORD!); // Invalid password from .env

    // Click login button
    await page.click("#login-button");

    // Verify the error message
    const errorMessageLocator = page.locator('h3[data-test="error"]');
    await expect(errorMessageLocator).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  // Test case 4: Login with empty credentials
  test("should show an error with empty credentials", async ({ page }) => {
    // Leave username and password fields empty
    await page.fill('[data-test="username"]', "");
    await page.fill('[data-test="password"]', "");

    // Click login button
    await page.click("#login-button");

    // Verify the error message
    const errorMessageLocator = page.locator('h3[data-test="error"]');
    await expect(errorMessageLocator).toHaveText(
      "Epic sadface: Username is required"
    );
  });
});

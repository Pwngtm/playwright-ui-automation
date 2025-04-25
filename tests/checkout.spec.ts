import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { LoginPage } from "../pages/LoginPage";

dotenv.config();

test.describe("Checkout functionality tests", () => {
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  // Before each test, log in with valid credentials and add a product to the cart
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(); // Navigate to the login page
    await loginPage.loginWithValidCredentials(); // Log in using valid credentials

    // Initialize page objects for cart and checkout
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Add a product to the cart before running each test
    await page
      .locator(
        '.inventory_item:has(.inventory_item_name:has-text("Sauce Labs Backpack")) button'
      )
      .click();
    await cartPage.navigateToCartPage();
  });

  test("should verify checkout button exists in the cart page", async ({
    page,
  }) => {
    // Ensure the checkout button is visible in the cart page
    await expect(page.locator(".checkout_button")).toBeVisible();
  });

  test("should navigate to checkout page after clicking checkout", async ({
    page,
  }) => {
    // Click on the checkout button and verify navigation to checkout page
    await checkoutPage.navigateToCheckout();
  });

  test("should display error when checkout form is submitted with missing first name", async ({
    page,
  }) => {
    // Navigate to the checkout page
    await checkoutPage.navigateToCheckout();

    // Fill the checkout form with an empty first name
    await checkoutPage.fillCheckoutDetails("", "Doe", "12345");

    // Verify error message for missing first name
    await checkoutPage.verifyErrorMessage("Error: First Name is required");
  });

  test("should display error when checkout form is submitted with missing last name", async ({
    page,
  }) => {
    // Navigate to the checkout page
    await checkoutPage.navigateToCheckout();

    // Fill the checkout form with an empty last name
    await checkoutPage.fillCheckoutDetails("John", "", "12345");

    // Verify error message for missing last name
    await checkoutPage.verifyErrorMessage("Error: Last Name is required");
  });

  test("should display error when checkout form is submitted with missing postal code", async ({
    page,
  }) => {
    // Navigate to the checkout page
    await checkoutPage.navigateToCheckout();

    // Fill the checkout form with an empty postal code
    await checkoutPage.fillCheckoutDetails("John", "Doe", "");

    // Verify error message for missing postal code
    await checkoutPage.verifyErrorMessage("Error: Postal Code is required");
  });

  test("should complete checkout successfully with valid details", async ({
    page,
  }) => {
    // Navigate to the checkout page
    await checkoutPage.navigateToCheckout();

    // Fill the checkout form with valid details
    await checkoutPage.fillCheckoutDetails("John", "Doe", "12345");

    // Complete the checkout process
    await checkoutPage.completeCheckout();
  });

  test("should cancel checkout and return to cart page", async ({ page }) => {
    // Navigate to the checkout page
    await checkoutPage.navigateToCheckout();

    // Cancel checkout and verify return to cart page
    await checkoutPage.cancelCheckout();
  });
});

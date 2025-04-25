import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";

dotenv.config();

test.describe("Cart functionality tests", () => {
  let cartPage: CartPage;

  // Before each test, navigate to the login page and log in with valid credentials
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginWithValidCredentials();

    // Initialize CartPage after login
    cartPage = new CartPage(page);
  });

  test("should add a product to the cart and update the cart badge", async ({
    page,
  }) => {
    // Locate and click the 'Add to Cart' button for Sauce Labs Backpack
    await page
      .locator(
        '.inventory_item:has(.inventory_item_name:has-text("Sauce Labs Backpack")) button'
      )
      .click();

    // Verify the cart badge shows '1' after adding the product
    await cartPage.verifyCartBadge("1");
  });

  test("should remove a product from the cart and hide the cart badge", async ({
    page,
  }) => {
    // Locate the Sauce Labs Backpack product
    const backpackItem = page.locator(
      '.inventory_item:has(.inventory_item_name:has-text("Sauce Labs Backpack"))'
    );

    // Add the product to the cart
    await backpackItem.locator("button").click();

    // Remove the product from the cart
    await backpackItem.locator('button:has-text("REMOVE")').click();

    // Verify the cart badge is no longer visible
    await cartPage.verifyCartBadgeNotVisible();
  });

  test("should add multiple products and see them in the cart", async ({
    page,
  }) => {
    // Add multiple products to the cart
    await page
      .locator(
        '.inventory_item:has(.inventory_item_name:has-text("Sauce Labs Backpack")) button'
      )
      .click();
    await page
      .locator(
        '.inventory_item:has(.inventory_item_name:has-text("Sauce Labs Bike Light")) button'
      )
      .click();

    // Navigate to the cart page
    await cartPage.navigateToCartPage();

    // Verify the number of items in the cart and their names
    const cartItems = page.locator(".cart_item");
    await expect(cartItems).toHaveCount(2);
    await expect(cartItems.nth(0)).toContainText("Sauce Labs Backpack");
    await expect(cartItems.nth(1)).toContainText("Sauce Labs Bike Light");
  });

  test("should navigate to the cart page and see an empty cart if nothing is added", async ({
    page,
  }) => {
    // Navigate to the cart page without adding any products
    await cartPage.navigateToCartPage();

    // Verify the cart is empty
    const cartItems = page.locator(".cart_item");
    await expect(cartItems).toHaveCount(0);
  });

  test("should verify the quantity of added products in the cart", async ({
    page,
  }) => {
    // Add a product to the cart
    await page
      .locator(
        '.inventory_item:has(.inventory_item_name:has-text("Sauce Labs Backpack")) button'
      )
      .click();

    // Navigate to the cart page
    await cartPage.navigateToCartPage();

    // Verify the quantity of the product in the cart
    const quantity = page.locator(".cart_quantity");
    await expect(quantity).toHaveText("1");
  });

  test("should verify product details in the cart", async ({ page }) => {
    // Add a product to the cart
    await page
      .locator(
        '.inventory_item:has(.inventory_item_name:has-text("Sauce Labs Backpack")) button'
      )
      .click();

    // Navigate to the cart page
    await cartPage.navigateToCartPage();

    // Verify the product name and description in the cart
    const productName = page.locator(".inventory_item_name");
    const productDescription = page.locator(".inventory_item_desc");

    await expect(productName).toHaveText("Sauce Labs Backpack");
    await expect(productDescription).toHaveText(
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."
    );
  });

  test("should verify the correct price of products in the cart", async ({
    page,
  }) => {
    // Add a product to the cart
    await page
      .locator(
        '.inventory_item:has(.inventory_item_name:has-text("Sauce Labs Backpack")) button'
      )
      .click();

    // Navigate to the cart page
    await cartPage.navigateToCartPage();

    // Verify the product price in the cart
    const productPrice = page.locator(".inventory_item_price");
    await expect(productPrice).toHaveText("29.99");
  });

  test("should verify Continue Shopping button navigates to inventory page", async ({
    page,
  }) => {
    // Add a product to the cart
    await page
      .locator(
        '.inventory_item:has(.inventory_item_name:has-text("Sauce Labs Backpack")) button'
      )
      .click();

    // Navigate to the cart page
    await cartPage.navigateToCartPage();

    // Click the 'Continue Shopping' button
    await page.locator('a.btn_secondary:has-text("Continue Shopping")').click();

    // Verify the user is redirected to the inventory page
    await expect(page).toHaveURL(`${process.env.BASE_URL}/inventory.html`);
  });

  test("should proceed to checkout page from the cart", async ({ page }) => {
    // Add a product to the cart
    await page
      .locator(
        '.inventory_item:has(.inventory_item_name:has-text("Sauce Labs Backpack")) button'
      )
      .click();

    // Navigate to the cart page
    await cartPage.navigateToCartPage();

    // Click the checkout button
    await page.click(".checkout_button");

    // Verify the user is redirected to the checkout page
    await expect(page).toHaveURL(/\/checkout-step-one.html/);
  });
});

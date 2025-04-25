import { Page, expect } from "@playwright/test";

export class CartPage {
  private page: Page;

  // Constructor to initialize the page object
  constructor(page: Page) {
    this.page = page;
  }

  //Clicks on the cart icon and verifies if the URL is correct.
  async navigateToCartPage() {
    await this.page.click(".shopping_cart_link");
    await expect(this.page).toHaveURL(`${process.env.BASE_URL}/cart.html`);
  }

  /**
   * Verifies that the cart badge displays the correct number of items.
   * @param expectedValue - The expected number of items in the cart badge.
   */
  async verifyCartBadge(expectedValue: string) {
    const cartBadge = this.page.locator(".shopping_cart_badge");
    await expect(cartBadge).toHaveText(expectedValue);
  }

  //  Verifies the cart badge is not visible, indicating an empty cart.
  async verifyCartBadgeNotVisible() {
    await expect(this.page.locator(".shopping_cart_badge")).toHaveCount(0);
  }
}

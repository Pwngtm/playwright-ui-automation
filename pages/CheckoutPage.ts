import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  private page: Page;

  // Constructor to initialize the page object
  constructor(page: Page) {
    this.page = page;
  }

  // Clicks on the checkout button and verifies if the URL is correct.
  async navigateToCheckout() {
    await this.page.click(".checkout_button");
    await expect(this.page).toHaveURL(/\/checkout-step-one.html/);
  }

  /**
   * Fills the checkout form with the given details.
   * @param firstName - The first name of the customer.
   * @param lastName - The last name of the customer.
   * @param zipCode - The postal/ZIP code of the customer.
   */
  async fillCheckoutDetails(
    firstName: string,
    lastName: string,
    zipCode: string
  ) {
    await this.page.fill("#first-name", firstName);
    await this.page.fill("#last-name", lastName);
    await this.page.fill("#postal-code", zipCode);
    await this.page.click(".cart_button");
  }

  // Verifies the success message after order completion
  async completeCheckout() {
    await this.page
      .locator('a.btn_action.cart_button:has-text("FINISH")')
      .click();
    await expect(this.page.locator(".complete-header")).toHaveText(
      /thank you for your order/i
    );
  }

  // Verifies that the checkout button is visible on the cart page
  async verifyCheckoutButtonExists() {
    await expect(this.page.locator(".checkout_button")).toBeVisible();
  }

  /**
   * Checks if the expected error message appears in the checkout form validation.
   * @param expectedMessage - The expected error message displayed on the form.
   */
  async verifyErrorMessage(expectedMessage: string) {
    const errorMessage = this.page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText(expectedMessage);
  }

  //Cancels the checkout process and returns to the cart page.
  async cancelCheckout() {
    await this.page.click(".cart_cancel_link");
    await expect(this.page).toHaveURL(`${process.env.BASE_URL}/cart.html`);
  }
}

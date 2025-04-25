// pages/LoginPage.ts
import { Page, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export class LoginPage {
  private page: Page;

  // Constructor to initialize the page object
  constructor(page: Page) {
    this.page = page;
  }

  // Navigates to the login page.
  async goto() {
    await this.page.goto(process.env.BASE_URL!);
  }

  // Login with valid credentials
  async loginWithValidCredentials() {
    await this.page.fill('[data-test="username"]', process.env.USER!);
    await this.page.fill('[data-test="password"]', process.env.PASSWORD!);
    await this.page.click("#login-button");

    // Validates successful navigation to the inventory page
    await expect(this.page).toHaveURL(`${process.env.BASE_URL}/inventory.html`);
  }
}

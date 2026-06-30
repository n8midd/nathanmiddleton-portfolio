import { expect, type Locator, type Page } from "@playwright/test";
import { siteConfig } from "../../../lib/site-config";
import { BasePage } from "./base.page";

export class SiteShellPage extends BasePage {
  readonly header: Locator;
  readonly sidebar: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator("header");
    this.sidebar = page.locator("aside");
    this.footer = page.locator("footer");
  }

  sidebarLink(label: string): Locator {
    return this.sidebar.getByRole("link", { name: label, exact: true });
  }

  mobileNavLink(label: string): Locator {
    return this.page.getByRole("dialog").getByRole("link", { name: label, exact: true });
  }

  async expectHeader() {
    await expect(this.header.getByText(siteConfig.name)).toBeVisible();
    await expect(this.header.getByText(siteConfig.author)).toBeVisible();
  }

  async expectSidebarLinkActive(label: string) {
    await expect(this.sidebarLink(label)).toHaveAttribute("aria-current", "page");
  }

  async expectSidebarLinkHasSoonBadge(label: string, visible: boolean) {
    const link = this.sidebarLink(label);
    const badge = link.getByText("soon", { exact: true });

    if (visible) {
      await expect(badge).toBeVisible();
    } else {
      await expect(badge).toHaveCount(0);
    }
  }

  async navigateViaSidebar(label: string) {
    await this.sidebarLink(label).click();
  }

  async openMobileMenu() {
    await this.page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(this.page.getByRole("dialog")).toBeVisible();
  }

  async navigateViaMobileMenu(label: string) {
    await this.openMobileMenu();
    await this.mobileNavLink(label).click();
  }

  async expectFooterLinks() {
    const github = this.footer.getByRole("link", { name: "GitHub" });
    const linkedIn = this.footer.getByRole("link", { name: "LinkedIn" });

    await expect(github).toHaveAttribute("href", siteConfig.githubUrl);
    await expect(linkedIn).toHaveAttribute("href", siteConfig.linkedInUrl);
  }
}

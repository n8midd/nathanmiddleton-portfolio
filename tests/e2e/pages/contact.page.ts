import { expect, type Locator, type Page } from "@playwright/test";
import { contactOfferings } from "../../../lib/data/contact";
import { getFeatureBySlug, siteConfig } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("contact")!;

export class ContactPage extends BasePage {
  readonly root: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("contact-page");
  }

  offeringItem(offeringId: string): Locator {
    return this.root.locator(
      `[data-testid="contact-offering-item"][data-offering-id="${offeringId}"]`,
    );
  }

  async open() {
    await this.goto("/contact");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Contact \| Quality Engineering Lab/);
  }

  async expectHeader() {
    await expect(this.page.getByRole("heading", { level: 1, name: feature.label })).toBeVisible();
    await expect(this.page.getByText(feature.description)).toBeVisible();
  }

  async expectSingleH1() {
    await expect(this.page.getByRole("heading", { level: 1 })).toHaveCount(1);
  }

  async expectNoComingSoon() {
    await expect(this.page.getByText("Coming soon", { exact: true })).toHaveCount(0);
  }

  async expectAllOfferingsListed() {
    await expect(this.root.getByTestId("contact-offerings")).toBeVisible();

    for (const offering of contactOfferings) {
      await expect(this.offeringItem(offering.id)).toBeVisible();
      await expect(this.offeringItem(offering.id)).toContainText(offering.label);
    }
  }

  async expectCtaVisible() {
    await expect(this.root.getByTestId("contact-cta")).toBeVisible();
    await expect(this.root.getByTestId("contact-cta")).toContainText("Let's talk");
  }

  async expectEmailLink() {
    await expect(this.page.getByTestId("contact-link-email")).toBeVisible();
  }

  async expectLinkedInLink() {
    await expect(this.page.getByTestId("contact-link-linkedin")).toBeVisible();
  }

  async expectGitHubLink() {
    await expect(this.page.getByTestId("contact-link-github")).toBeVisible();
  }

  async expectEmailHref() {
    await expect(this.page.getByTestId("contact-link-email")).toHaveAttribute(
      "href",
      `mailto:${siteConfig.email}`,
    );
  }

  async expectLinkedInHref() {
    await expect(this.page.getByTestId("contact-link-linkedin")).toHaveAttribute(
      "href",
      siteConfig.linkedInUrl,
    );
  }

  async expectGitHubHref() {
    await expect(this.page.getByTestId("contact-link-github")).toHaveAttribute(
      "href",
      siteConfig.githubUrl,
    );
  }

  async expectOfferingDescriptions() {
    for (const offering of contactOfferings) {
      if (offering.description) {
        await expect(this.offeringItem(offering.id)).toContainText(offering.description);
      }
    }
  }

  async expectVisibleOnMobile() {
    await expect(this.root.getByTestId("contact-offerings")).toBeVisible();
    await expect(this.page.getByTestId("contact-link-email")).toBeVisible();
  }
}

export { contactOfferings };

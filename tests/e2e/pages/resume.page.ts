import { expect, type Locator, type Page } from "@playwright/test";
import { careerRoles, getRoleById } from "../../../lib/data/resume";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("resume")!;

export class ResumePage extends BasePage {
  readonly root: Locator;
  readonly timeline: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("resume-page");
    this.timeline = page.getByTestId("resume-timeline");
  }

  roleCard(roleId: string): Locator {
    return this.timeline.locator(`[data-testid="role-card"][data-role-id="${roleId}"]`);
  }

  roleDetail(): Locator {
    return this.page.getByTestId("role-detail");
  }

  async open() {
    await this.goto("/resume");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Interactive Resume \| Quality Engineering Lab/);
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

  async expectSummary() {
    await expect(this.page.getByTestId("resume-summary")).toBeVisible();
    await expect(this.page.getByTestId("resume-summary")).toContainText("17+ years");
  }

  async expectAllRolesListed() {
    for (const role of careerRoles) {
      await expect(this.roleCard(role.id)).toBeVisible();
      await expect(this.roleCard(role.id)).toContainText(role.company);
    }
  }

  async clickRole(roleId: string) {
    await this.roleCard(roleId).click();
  }

  async expectRoleExpanded(roleId: string) {
    await expect(this.roleCard(roleId)).toHaveAttribute("aria-expanded", "true");
  }

  async expectRoleDetail(roleId: string, text?: string) {
    const role = getRoleById(roleId);
    const detail = this.roleDetail();

    await expect(detail).toBeVisible();
    await expect(detail).toHaveAttribute("data-role-id", roleId);

    if (role) {
      await expect(detail).toContainText(role.title);
      await expect(detail).toContainText(role.company);
    }

    if (text) {
      await expect(detail).toContainText(text);
    }
  }

  async expectRoleDetailHidden() {
    await expect(this.roleDetail()).toHaveCount(0);
    await expect(this.page.getByTestId("role-detail-placeholder")).toBeVisible();
  }

  async expectSkillsVisible() {
    await expect(this.page.getByTestId("resume-skills")).toBeVisible();
    await expect(this.page.getByText("Programming languages")).toBeVisible();
  }

  async expectEducationVisible() {
    await expect(this.page.getByTestId("resume-education")).toBeVisible();
    await expect(this.page.getByTestId("resume-education")).toContainText("ITT Tech");
  }

  async expectCertificationsVisible() {
    await expect(this.page.getByTestId("resume-certifications")).toBeVisible();
    await expect(this.page.getByText("Salesforce Certified Administrator")).toBeVisible();
  }

  async expectSubRolesVisible() {
    await expect(this.page.getByTestId("role-sub-roles")).toBeVisible();
  }

  async expectTechnologiesVisible() {
    await expect(this.page.getByTestId("role-technologies")).toBeVisible();
  }

  async expectVisibleOnMobile() {
    await expect(this.timeline).toBeVisible();
    await expect(this.roleCard("sirona-medical")).toBeVisible();
  }
}

export { careerRoles, getRoleById };

import { test } from "../../fixtures/test.fixture";

test.describe("@regression Interactive Resume", () => {
  test.beforeEach(async ({ resume }) => {
    await resume.open();
  });

  test("loads with correct document title", async ({ resume }) => {
    await resume.expectPageTitle();
  });

  test("displays header with title and description", async ({ resume }) => {
    await resume.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ resume }) => {
    await resume.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ resume }) => {
    await resume.expectNoComingSoon();
  });

  test("shows professional summary", async ({ resume }) => {
    await resume.expectSummary();
  });

  test("lists all career roles from shared data", async ({ resume }) => {
    await resume.expectAllRolesListed();
  });

  test("expanding Sirona shows role detail", async ({ resume }) => {
    await resume.clickRole("sirona-medical");
    await resume.expectRoleExpanded("sirona-medical");
    await resume.expectRoleDetail("sirona-medical", "Sirona Medical");
  });

  test("expanding nCino Principal shows POM highlight", async ({ resume }) => {
    await resume.clickRole("ncino-principal");
    await resume.expectRoleDetail("ncino-principal", "Page Object Model");
  });

  test("expanding Dell shows integration highlight", async ({ resume }) => {
    await resume.clickRole("dell-sdet");
    await resume.expectRoleDetail("dell-sdet", "reporting system");
  });

  test("Intellectual Ventures shows role progression", async ({ resume }) => {
    await resume.clickRole("intellectual-ventures");
    await resume.expectRoleDetail("intellectual-ventures");
    await resume.expectSubRolesVisible();
  });

  test("switching roles updates detail panel", async ({ resume }) => {
    await resume.clickRole("sirona-medical");
    await resume.expectRoleDetail("sirona-medical", "Sirona Medical");

    await resume.clickRole("ncino-principal");
    await resume.expectRoleDetail("ncino-principal", "nCino");
  });

  test("shows skills section", async ({ resume }) => {
    await resume.expectSkillsVisible();
  });

  test("shows education section", async ({ resume }) => {
    await resume.expectEducationVisible();
  });

  test("shows certifications section", async ({ resume }) => {
    await resume.expectCertificationsVisible();
  });

  test("expanded role shows technologies", async ({ resume }) => {
    await resume.clickRole("sirona-medical");
    await resume.expectTechnologiesVisible();
  });

  test("sidebar highlights Interactive Resume with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Interactive Resume");
    await shell.expectSidebarLinkHasSoonBadge("Interactive Resume", false);
  });

  test("content remains visible on mobile viewport", async ({ page, resume }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await resume.expectVisibleOnMobile();
  });
});

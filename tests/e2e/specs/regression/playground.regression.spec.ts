import { test } from "../../fixtures/test.fixture";

test.describe("@regression Testing Playground", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
  });

  test("loads with correct document title", async ({ playground }) => {
    await playground.expectPageTitle();
  });

  test("displays header with title and description", async ({ playground }) => {
    await playground.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ playground }) => {
    await playground.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ playground }) => {
    await playground.expectNoComingSoon();
  });

  test("lists all playground demos from shared data", async ({ playground }) => {
    await playground.expectAllDemosListed();
  });

  test("login demo card navigates to demo route", async ({ playground }) => {
    await playground.clickDemoCard("login");
    await playground.expectUrl(/\/playground\/login$/);
    await playground.expectDemoLoaded("login");
  });

  test("login demo shows error for invalid credentials", async ({ playground }) => {
    await playground.openDemo("login");
    await playground.submitLogin("wrong", "creds");
    await playground.expectLoginError("Invalid credentials");
  });

  test("login demo shows success for valid credentials", async ({ playground }) => {
    await playground.openDemo("login");
    await playground.submitLogin("demo", "password123");
    await playground.expectLoginSuccess();
  });

  test("forms demo shows validation errors on empty submit", async ({ playground }) => {
    await playground.openDemo("forms");
    await playground.submitEmptyForm();
    await playground.expectFormValidationErrors();
  });

  test("dropdowns demo updates custom combobox selection", async ({ playground }) => {
    await playground.openDemo("dropdowns");
    await playground.selectCustomDropdownOption("cypress");
    await playground.expectCustomDropdownValue("Cypress");
  });

  test("modals demo opens and closes dialog", async ({ playground }) => {
    await playground.openDemo("modals");
    await playground.openModal();
    await playground.closeModal();
    await playground.expectModalClosed();
  });

  test("tables demo changes first row when sorting by role", async ({ playground }) => {
    await playground.openDemo("tables");
    await playground.expectFirstTableRow("Alice Chen");
    await playground.sortTableByRole();
    await playground.expectFirstTableRow("Carol Nguyen");
  });

  test("infinite scroll demo loads additional items on scroll", async ({ playground }) => {
    await playground.openDemo("infinite-scroll");
    await playground.scrollInfiniteListToBottom();
    await playground.expectInfiniteScrollItemCountGreaterThan(10);
  });

  test("api calls demo fetches and displays items", async ({ playground }) => {
    await playground.openDemo("api-calls");
    await playground.fetchApiItems();
    await playground.expectApiResults();
  });

  test("sidebar highlights Testing Playground with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Testing Playground");
    await shell.expectSidebarLinkHasSoonBadge("Testing Playground", false);
  });
});

export interface SnippetCategory {
  id: string;
  label: string;
}

export interface CodeSnippet {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  language: string;
  code: string;
  tags: string[];
}

export const ALL_CATEGORIES_ID = "all" as const;

export const snippetsIntro =
  "Search and copy battle-tested patterns for UI automation, API testing, C# unit frameworks, and CI/CD pipelines. Snippets reflect patterns used across enterprise QA engagements.";

export const snippetCategories: SnippetCategory[] = [
  { id: "playwright", label: "Playwright" },
  { id: "csharp", label: "C#" },
  { id: "selenium", label: "Selenium" },
  { id: "specflow", label: "SpecFlow/Cucumber" },
  { id: "rest-assured", label: "REST Assured" },
  { id: "xunit", label: "xUnit" },
  { id: "nunit", label: "NUnit" },
  { id: "mstest", label: "MSTest" },
  { id: "github-actions", label: "GitHub Actions" },
  { id: "azure-pipelines", label: "Azure Pipelines" },
  { id: "jenkins", label: "Jenkins" },
];

export const codeSnippets: CodeSnippet[] = [
  {
    id: "playwright-page-object",
    categoryId: "playwright",
    title: "Page object with fixture",
    summary: "Extend the base test fixture with a typed page object for reuse across specs.",
    language: "TypeScript",
    tags: ["page object", "fixture", "e2e"],
    code: `import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/login.page";

export const test = base.extend<{ login: LoginPage }>({
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

test("user signs in", async ({ login }) => {
  await login.open();
  await login.signIn("demo", "password123");
});

// LoginPage.open()
async open() {
  await this.page.goto("/login");
}`,
  },
  {
    id: "playwright-api-request",
    categoryId: "playwright",
    title: "API request context",
    summary: "Use Playwright request fixture for contract tests without launching a browser.",
    language: "TypeScript",
    tags: ["api", "request", "contract"],
    code: `import { test, expect } from "@playwright/test";

test("health endpoint returns ok", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.status).toBe("ok");
});`,
  },
  {
    id: "csharp-async-http",
    categoryId: "csharp",
    title: "Async HTTP test helper",
    summary: "Reusable async client wrapper for API integration tests in .NET.",
    language: "C#",
    tags: ["async", "http", "integration"],
    code: `public async Task<HttpResponseMessage> GetAsync(string path)
{
    using var client = new HttpClient { BaseAddress = new Uri(_baseUrl) };
    client.DefaultRequestHeaders.Add("Accept", "application/json");
    return await client.GetAsync(path);
}

[Fact]
public async Task GetUsers_ReturnsSuccess()
{
    var response = await GetAsync("/api/users");
    Assert.True(response.IsSuccessStatusCode);
}`,
  },
  {
    id: "selenium-explicit-wait",
    categoryId: "selenium",
    title: "Explicit wait helper",
    summary: "Centralize WebDriverWait usage to avoid Thread.Sleep in UI tests.",
    language: "C#",
    tags: ["webdriver", "wait", "fluent"],
    code: `public IWebElement WaitUntilVisible(By locator, int timeoutSeconds = 10)
{
    var wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(timeoutSeconds));
    return wait.Until(driver =>
    {
        var element = driver.FindElement(locator);
        return element.Displayed ? element : null;
    });
}

// Usage
var submit = WaitUntilVisible(By.Id("submit-button"));
submit.Click();`,
  },
  {
    id: "selenium-page-factory",
    categoryId: "selenium",
    title: "PageFactory element",
    summary: "Lazy-initialized element with FindBy attribute for classic Page Object Model.",
    language: "C#",
    tags: ["pagefactory", "findby", "pom"],
    code: `public class LoginPage
{
    private readonly IWebDriver _driver;

    public LoginPage(IWebDriver driver)
    {
        _driver = driver;
        PageFactory.InitElements(driver, this);
    }

    [FindsBy(Id = "username")]
    public IWebElement Username { get; set; }

    [FindsBy(Id = "password")]
    public IWebElement Password { get; set; }
}`,
  },
  {
    id: "specflow-scenario",
    categoryId: "specflow",
    title: "Gherkin scenario with steps",
    summary: "Feature file plus step binding stub for BDD checkout flow.",
    language: "Gherkin",
    tags: ["gherkin", "bdd", "cucumber", "specflow"],
    code: `Feature: Checkout
  Scenario: Place order with valid card
    Given the shopper has items in the cart
    When they pay with a valid card
    Then the order confirmation is displayed

[Binding]
public class CheckoutSteps
{
    [Given("the shopper has items in the cart")]
    public void GivenItemsInCart() { /* arrange cart state */ }
}`,
  },
  {
    id: "rest-assured-get",
    categoryId: "rest-assured",
    title: "GET with status assert",
    summary: "Fluent REST Assured GET with JSON path validation.",
    language: "Java",
    tags: ["get", "jsonpath", "hamcrest"],
    code: `given()
    .header("Accept", "application/json")
.when()
    .get("/api/users")
.then()
    .statusCode(200)
    .body("users.size()", greaterThan(0))
    .body("users[0].email", notNullValue());`,
  },
  {
    id: "rest-assured-post",
    categoryId: "rest-assured",
    title: "POST with JSON body",
    summary: "Create resource and assert response payload fields.",
    language: "Java",
    tags: ["post", "json", "create"],
    code: `String payload = """
    { "productId": "sku-42", "quantity": 2 }
    """;

given()
    .contentType(ContentType.JSON)
    .body(payload)
.when()
    .post("/api/orders")
.then()
    .statusCode(201)
    .body("status", equalTo("created"));`,
  },
  {
    id: "xunit-theory",
    categoryId: "xunit",
    title: "Theory with inline data",
    summary: "Parameterized xUnit test for boundary value coverage.",
    language: "C#",
    tags: ["fact", "theory", "inline data"],
    code: `[Theory]
[InlineData(0, false)]
[InlineData(1, true)]
[InlineData(100, true)]
[InlineData(101, false)]
public void ValidateQuantity(int quantity, bool expectedValid)
{
    var result = OrderValidator.IsValidQuantity(quantity);
    Assert.Equal(expectedValid, result);
}`,
  },
  {
    id: "nunit-testcase",
    categoryId: "nunit",
    title: "TestCase attribute",
    summary: "NUnit parameterized test with TestCase source values.",
    language: "C#",
    tags: ["testcase", "parameterized"],
    code: `[TestCase("admin", true)]
[TestCase("shopper", true)]
[TestCase("", false)]
public void RoleIsAllowed(string role, bool expected)
{
    var allowed = AuthPolicy.IsRoleAllowed(role);
    Assert.That(allowed, Is.EqualTo(expected));
}`,
  },
  {
    id: "mstest-datatest",
    categoryId: "mstest",
    title: "DataTestMethod rows",
    summary: "MSTest data-driven test using DataRow attributes.",
    language: "C#",
    tags: ["datatestmethod", "datarow"],
    code: `[DataTestMethod]
[DataRow("user@example.com", true)]
[DataRow("not-an-email", false)]
[DataRow("", false)]
public void EmailValidation(string email, bool expectedValid)
{
    var isValid = EmailValidator.IsValid(email);
    Assert.AreEqual(expectedValid, isValid);
}`,
  },
  {
    id: "github-actions-playwright",
    categoryId: "github-actions",
    title: "Playwright e2e job",
    summary: "GitHub Actions workflow running Playwright against production build.",
    language: "YAML",
    tags: ["workflow", "ci", "playwright"],
    code: `jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npx playwright install --with-deps chromium
      - run: CI=true npm run test:e2e`,
  },
  {
    id: "azure-pipelines-test",
    categoryId: "azure-pipelines",
    title: "Test stage with Playwright",
    summary: "Azure Pipelines job installing deps and running e2e suite.",
    language: "YAML",
    tags: ["azure", "pipeline", "stage"],
    code: `stages:
  - stage: Test
    jobs:
      - job: E2E
        pool:
          vmImage: ubuntu-latest
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: "20.x"
          - script: npm ci
          - script: npm run build
          - script: npx playwright install --with-deps chromium
          - script: CI=true npm run test:e2e`,
  },
  {
    id: "jenkins-declarative",
    categoryId: "jenkins",
    title: "Declarative test stage",
    summary: "Jenkins pipeline stage for install, build, and Playwright e2e.",
    language: "Groovy",
    tags: ["pipeline", "declarative", "jenkinsfile"],
    code: `pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        sh 'npm ci'
        sh 'npm run build'
        sh 'npx playwright install --with-deps chromium'
        sh 'CI=true npm run test:e2e'
      }
    }
  }
}`,
  },
];

export function getCategoryById(id: string): SnippetCategory | undefined {
  return snippetCategories.find((category) => category.id === id);
}

export function getSnippetById(id: string): CodeSnippet | undefined {
  return codeSnippets.find((snippet) => snippet.id === id);
}

export function getSnippetsByCategory(
  categoryId: string | typeof ALL_CATEGORIES_ID = ALL_CATEGORIES_ID,
): CodeSnippet[] {
  if (categoryId === ALL_CATEGORIES_ID) {
    return codeSnippets;
  }

  return codeSnippets.filter((snippet) => snippet.categoryId === categoryId);
}

export function filterSnippets(
  query: string,
  categoryId: string | typeof ALL_CATEGORIES_ID = ALL_CATEGORIES_ID,
): CodeSnippet[] {
  const normalizedQuery = query.trim().toLowerCase();
  const categorySnippets = getSnippetsByCategory(categoryId);

  if (!normalizedQuery) {
    return categorySnippets;
  }

  return categorySnippets.filter((snippet) => {
    const category = getCategoryById(snippet.categoryId);
    const haystack = [
      snippet.title,
      snippet.summary,
      snippet.language,
      snippet.code,
      ...snippet.tags,
      category?.label ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

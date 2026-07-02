import type { ExerciseScenarioType } from "@/lib/data/exercises";

interface ExerciseScenarioProps {
  scenarioType: ExerciseScenarioType;
}

export function ExerciseScenario({ scenarioType }: ExerciseScenarioProps) {
  return (
    <div
      className="rounded-lg border border-border/60 bg-muted/20 p-4"
      data-testid="exercise-scenario"
      data-scenario-type={scenarioType}
    >
      {scenarioType === "login" ? <LoginScenario /> : null}
      {scenarioType === "checkout" ? <CheckoutScenario /> : null}
      {scenarioType === "search" ? <SearchScenario /> : null}
      {scenarioType === "file-upload" ? <FileUploadScenario /> : null}
    </div>
  );
}

function LoginScenario() {
  return (
    <div className="mx-auto max-w-sm space-y-4">
      <h3 className="text-center text-lg font-semibold">Sign in</h3>
      <div className="space-y-1">
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          readOnly
          defaultValue="user@example.com"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          tabIndex={-1}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          readOnly
          defaultValue="••••••••"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          tabIndex={-1}
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <input type="checkbox" readOnly tabIndex={-1} />
        Remember me
      </label>
      <button
        type="button"
        disabled
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-80"
        tabIndex={-1}
      >
        Sign in
      </button>
      <p className="text-center text-sm text-muted-foreground">
        <span className="underline">Forgot password?</span>
      </p>
    </div>
  );
}

function CheckoutScenario() {
  return (
    <div className="mx-auto max-w-md space-y-4">
      <h3 className="text-lg font-semibold">Checkout</h3>
      <div className="rounded-md border border-border/60 bg-card/60 p-3 text-sm">
        <p className="font-medium">Cart (2 items)</p>
        <p className="text-muted-foreground">Wireless headphones — $79.99</p>
        <p className="text-muted-foreground">USB-C cable — $12.99</p>
        <p className="mt-2 font-medium">Subtotal: $92.98</p>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Card number</label>
        <input
          type="text"
          readOnly
          defaultValue="4111 1111 1111 1111"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          tabIndex={-1}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Expiry</label>
          <input
            type="text"
            readOnly
            defaultValue="12/28"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            tabIndex={-1}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">CVC</label>
          <input
            type="text"
            readOnly
            defaultValue="123"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            tabIndex={-1}
          />
        </div>
      </div>
      <button
        type="button"
        disabled
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-80"
        tabIndex={-1}
      >
        Place order — $99.12
      </button>
    </div>
  );
}

function SearchScenario() {
  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h3 className="text-lg font-semibold">Product search</h3>
      <input
        type="search"
        readOnly
        defaultValue="running shoes"
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        tabIndex={-1}
      />
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="rounded-md border border-border/60 bg-card/60 px-2 py-1">Category: Footwear</span>
        <span className="rounded-md border border-border/60 bg-card/60 px-2 py-1">Price: $50–$150</span>
        <span className="rounded-md border border-border/60 bg-card/60 px-2 py-1">In stock</span>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="rounded-md border border-border/60 bg-card/60 p-3">Trail Runner Pro — $89.99</li>
        <li className="rounded-md border border-border/60 bg-card/60 p-3">City Sprint Lite — $64.50</li>
        <li className="rounded-md border border-border/60 bg-card/60 p-3">Marathon Elite — $129.00</li>
      </ul>
    </div>
  );
}

function FileUploadScenario() {
  return (
    <div className="mx-auto max-w-md space-y-4">
      <h3 className="text-lg font-semibold">Upload documents</h3>
      <div className="flex min-h-28 items-center justify-center rounded-lg border border-dashed border-border/60 bg-card/40 p-4 text-sm text-muted-foreground">
        Drag and drop files here
      </div>
      <ul className="space-y-1 text-sm text-muted-foreground">
        <li>report-q4.pdf — 2.4 MB</li>
      </ul>
      <button
        type="button"
        disabled
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-80"
        tabIndex={-1}
      >
        Upload
      </button>
    </div>
  );
}

export default function PlaygroundEmbedPage() {
  return (
    <form className="space-y-3 p-4" data-testid="iframe-embed-form">
      <label htmlFor="embed-name" className="block text-sm font-medium">
        Name inside iframe
      </label>
      <input
        id="embed-name"
        type="text"
        placeholder="Enter your name"
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        data-testid="iframe-name-input"
      />
      <button
        type="button"
        className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
        data-testid="iframe-submit-button"
      >
        Submit
      </button>
    </form>
  );
}

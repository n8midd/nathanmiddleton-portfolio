export type HttpMethod = "GET" | "POST" | "DELETE";

export interface ApiEndpoint {
  id: string;
  method: HttpMethod;
  path: string;
  label: string;
  description: string;
  sampleBody?: string;
}

export const apiExplorerIntro =
  "Send real HTTP requests to demo REST endpoints hosted in this app. Inspect status codes, response timing, headers, and JSON bodies — the same workflow you use when testing APIs in Postman or REST Assured.";

export const defaultEndpointId = "users";

export const apiEndpoints: ApiEndpoint[] = [
  {
    id: "users",
    method: "GET",
    path: "/api/explorer/users",
    label: "Users",
    description: "List demo user accounts for authentication and profile scenarios.",
  },
  {
    id: "orders",
    method: "POST",
    path: "/api/explorer/orders",
    label: "Orders",
    description: "Create an order with a product ID and quantity.",
    sampleBody: JSON.stringify({ productId: "sku-headphones", quantity: 1 }, null, 2),
  },
  {
    id: "cart",
    method: "DELETE",
    path: "/api/explorer/cart",
    label: "Cart",
    description: "Clear the in-memory shopping cart and return how many items were removed.",
  },
];

export function getEndpointById(id: string): ApiEndpoint | undefined {
  return apiEndpoints.find((endpoint) => endpoint.id === id);
}

export function getEndpointByLabel(label: string): ApiEndpoint | undefined {
  return apiEndpoints.find((endpoint) => endpoint.label === label);
}

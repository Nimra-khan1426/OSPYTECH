import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "otx2pf0t",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
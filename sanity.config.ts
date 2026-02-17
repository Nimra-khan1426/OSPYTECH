"use client";
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = '2023-01-01'; // use your desired version

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  apiVersion,
  title: 'My Sanity Studio',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
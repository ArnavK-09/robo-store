// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [tailwind(), svelte()],
  redirects: {
    "/home": "/",
  },
  outDir: "../robo-store-plugin/seed/_root/.robo.store",
});

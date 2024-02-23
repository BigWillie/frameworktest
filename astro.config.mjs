import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind(), react(), vue(), lit()]
});
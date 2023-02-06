// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import deno from '@astrojs/deno';
import { defineAstro } from 'qgp';

import { common } from './qgp.config.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://qgp.app',
	integrations: [mdx(), sitemap(), react()],
	vite: defineAstro(common, {}),
	server: { port: 3000 },
	output: 'server',
	adapter: deno(),
});

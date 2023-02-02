import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		image: z.string().optional(),
		video: z.string().optional(),
		mdx: z.boolean().optional(),
	}),
});

export const collections = {
	docs,
};

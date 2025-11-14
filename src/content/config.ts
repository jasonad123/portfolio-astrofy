import { z, defineCollection } from "astro:content";
const blogSchema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
    badge: z.string().optional(),
    tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
        message: 'tags must be unique',
    }).optional(),
});

const storeSchema = z.object({
    title: z.string(),
    description: z.string(),
    custom_link_label: z.string(),
    custom_link: z.string().optional(),
    updatedDate: z.coerce.date(),
    pricing: z.string().optional(),
    oldPricing: z.string().optional(),
    badge: z.string().optional(),
    checkoutUrl: z.string().optional(),
    heroImage: z.string().optional(),
});

const projectsSchema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
    badge: z.string().optional(),
    tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
        message: 'tags must be unique',
    }).optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;
export type StoreSchema = z.infer<typeof storeSchema>;
export type ProjectsSchema = z.infer<typeof projectsSchema>;

const blogCollection = defineCollection({ schema: blogSchema });
const storeCollection = defineCollection({ schema: storeSchema });
const projectsCollection = defineCollection({ schema: projectsSchema });


export const collections = {
    'blog': blogCollection,
    'store': storeCollection,
    'projects': projectsCollection
}

const socialsCollection = defineCollection({
    schema: z.object({
      title: z.string(),
      url: z.string(),
      order: z.number(),
      icon: z
        .array(
          z.enum([
            "github",
            "twitter",
            "linkedin",
            "instagram",
            "facebook",
            "youtube",
            "twitch",
            "tiktok",
            "snapchat",
            "reddit",
            "pinterest",
            "medium",
            "dev",
            "dribbble",
            "behance",
            "codepen",
            "producthunt",
            "discord",
            "slack",
            "whatsapp",
            "telegram",
            "email",
            "home",
            "contactpage"
          ]),
        )
        .length(1),
    }),
  });
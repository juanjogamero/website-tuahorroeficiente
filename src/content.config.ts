import {defineCollection,z} from 'astro:content';
import {glob} from 'astro/loaders';
const guias=defineCollection({
 loader:glob({pattern:'**/*.md',base:'./src/content/guias'}),
 schema:z.object({
  title:z.string(),description:z.string(),category:z.string(),categorySlug:z.string(),
  reading:z.string(),reviewed:z.string(),published:z.string(),order:z.number(),imageAlt:z.string(),imageName:z.enum(['home','kitchen','solar','hero']),
  draft:z.boolean().default(false),sources:z.array(z.object({name:z.string(),url:z.string()})),related:z.array(z.string())
 })
});
export const collections={guias};

/**
 * Bu yapılandırma, `/app/studio/[[...index]]/page.tsx` rotasına monte edilen Sanity Studio için kullanılır.
 */

import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"

// API sürümleme hakkında daha fazla bilgi için https://www.sanity.io/docs/api-versioning adresini ziyaret edin
import { apiVersion, dataset, projectId } from "./sanity/env"
import { schema } from "./sanity/schema"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // './sanity/schema' klasöründeki içerik şemasını ekleyin ve düzenleyin
  schema,
  plugins: [
    deskTool(),
    // Vision, içeriğinizi GROQ ile sorgulamanıza olanak tanıyan bir araçtır
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})

export type Category = 'Web apps' | 'Client work' | 'Games' | 'Developer tools'

export type ProjectMedia = {
  kind: 'image' | 'video'
  src: string
  alt: string
  // Optional video poster. Keep videos in public/projects/ or use an HTTPS URL.
  poster?: string
  caption?: string
}

export type Project = {
  id: string
  title: string
  tagline: string
  description: string
  category: Category
  stack: string[]
  github: string | null
  website: string | null
  websiteLabel?: string
  websiteNote?: string
  packages?: { name: string; url: string }[]
  // Both are optional and appear only after opening the project's details.
  details?: string
  media?: ProjectMedia
  featured?: boolean
}

export const profile = {
  name: 'Tigerbook',
  github: 'https://github.com/tigerbook73',
  website: 'https://www.tigerbook.top',
}

// Repository visibility and the selection come from the owner's supplied list.
// Descriptions and stacks are checked against the corresponding local sources.
// Deploy URLs come from the owner or local documentation, not a reachability check. These SVGs
// are original illustrations, not screenshots of the deployed products.
// Replace media.src with a real screenshot or set kind: 'video' for an MP4/WebM.
export const projects: Project[] = [
  {
    id: 'exchange-rate',
    title: 'Exchange Rate',
    tagline: 'A clearer view of your next exchange.',
    description:
      'An AUD / CNY exchange-rate tracker for ICBC. Explore rate movements, compare historical quotes, and keep the essentials close with an installable web app.',
    category: 'Web apps',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare', 'D1'],
    github: 'https://github.com/tigerbook73/exchange-rate',
    website: 'https://icbc-rate.tigerbook.top',
    media: {
      kind: 'image',
      src: '/projects/exchange-rate.svg',
      alt: 'Illustration of the Exchange Rate dashboard with an AUD to CNY chart.',
      caption: 'Interface illustration · Replace with a screenshot of your project.',
    },
    featured: true,
  },
  {
    id: 'rambos-grooming',
    title: 'Rambos Grooming',
    tagline: 'A welcoming home for a local grooming business.',
    description:
      'A client website for a dog grooming business, built with Wix Origami. A responsive experience bringing together services, grooming photos, FAQs, and contact information.',
    category: 'Client work',
    stack: ['Wix', 'Origami', 'CSS'],
    github: null,
    website: 'https://liaoshengtian.wixstudio.com/rambos-grooming',
    media: {
      kind: 'image',
      src: '/projects/rambos-grooming.svg',
      alt: 'Concept illustration for the Rambos Grooming client website.',
      caption: 'Project illustration · Client work with private source code; not a screenshot of the live site.',
    },
  },
  {
    id: 'new-mj',
    title: 'Online Mahjong',
    tagline: 'A table for friends, bots, and a good game.',
    description:
      'An online mahjong learning project with real-time multiplayer, AI opponents, and extensible rule sets. Built around a shared TypeScript game engine and event-sourced game state.',
    category: 'Games',
    stack: ['TypeScript', 'React', 'NestJS', 'Socket.IO', 'Supabase'],
    github: 'https://github.com/tigerbook73/new-mj',
    website: null,
    media: {
      kind: 'image',
      src: '/projects/new-mj.svg',
      alt: 'Concept illustration of a green mahjong table and tiles.',
      caption: 'Project illustration · Not an in-game screenshot.',
    },
  },
  {
    id: 'faq-rag',
    title: 'FAQ RAG',
    tagline: 'Your documents, a conversation away.',
    description:
      'A document-based question-answering system with streamed responses and cited sources. Upload Chinese or English documents, search across languages, and switch between multiple AI providers.',
    category: 'Web apps',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'pgvector', 'RAG'],
    github: 'https://github.com/tigerbook73/faq-rag',
    website: null,
    media: {
      kind: 'image',
      src: '/projects/faq-rag.svg',
      alt: 'Concept illustration of document retrieval and a chat answer with source references.',
      caption: 'Interface illustration · Example conversation, not a product screenshot.',
    },
  },
  {
    id: 'bun-scripts',
    title: 'Bun Scripts',
    tagline: 'Little tools for a smoother working day.',
    description:
      'A collection of Bun-based developer utilities. Validate environment configuration with check-env and quickly choose workspace scripts with a fuzzy script picker.',
    category: 'Developer tools',
    stack: ['TypeScript', 'Bun', 'CLI', 'Monorepo'],
    github: 'https://github.com/tigerbook73/bun-scripts',
    website: null,
    websiteNote: 'Command-line tools',
    packages: [
      { name: '@tigerbook/run-scripts', url: 'https://www.npmjs.com/package/@tigerbook/run-scripts' },
      { name: '@tigerbook/check-env', url: 'https://www.npmjs.com/package/@tigerbook/check-env' },
    ],
    media: {
      kind: 'image',
      src: '/projects/bun-scripts.svg',
      alt: 'Illustrated terminal showing the check-env and fuzzy script picker utilities.',
      caption: 'Project illustration · Example terminal output.',
    },
  },
  {
    id: 'nextjs-shopify',
    title: 'Next.js Shopify',
    tagline: 'A custom storefront, powered by Shopify.',
    description:
      'A headless Shopify storefront built with Next.js. Browse collections, explore products, manage a cart, and access customer accounts through a custom React interface.',
    category: 'Web apps',
    stack: ['Next.js', 'React', 'TypeScript', 'Shopify', 'GraphQL'],
    github: 'https://github.com/tigerbook73/nextjs-shopify',
    website: 'https://nextjs-shopify-tigerbook.vercel.app/',
    media: {
      kind: 'image',
      src: '/projects/nextjs-shopify.svg',
      alt: 'Concept illustration of a minimal storefront with a product grid.',
      caption: 'Interface illustration · Sample products, not a screenshot of the storefront.',
    },
  },
  {
    id: 'mcp-server-anotation',
    title: 'MCP Annotation',
    tagline: 'Helpful comments. Reviewable changes.',
    description:
      'An MCP server for code annotation workflows. Share source files and annotation preferences with an AI client, generate unified diffs, and apply patches through a consistent tool interface.',
    category: 'Developer tools',
    stack: ['TypeScript', 'Node.js', 'MCP SDK', 'Zod'],
    // Keep the repository's actual spelling, even though the display title differs.
    github: 'https://github.com/tigerbook73/mcp-server-anotation',
    website: null,
    websiteNote: 'MCP server',
    media: {
      kind: 'image',
      src: '/projects/mcp-server-anotation.svg',
      alt: 'Illustration of an MCP annotation workflow and a source-code diff.',
      caption: 'Project illustration · Example code and annotation diff.',
    },
  },
]

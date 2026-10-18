# BS Course Notes

A Next.js learning library with illustrated lessons, worked examples, mathematical equations, graphs, and revision questions.

## Subjects

- Software Engineering: Weeks 1–5 and 7–11.
- Mathematical Foundation of Generative AI: Week 1 in two parts.
- Algorithms in Data Science: Weeks 1 and 2.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000.

## Production build

```sh
npm run build
```

The static website is generated in `out/`. Deploy that directory to a static host. For Cloudflare Pages, use `npm run build` as the build command, `out` as the output directory, and Node.js 22.

## Project structure

- `app/`: subject, week, lesson, and search routes.
- `components/`: reusable reading, navigation, graph, and mathematical rendering components.
- `data/`: course content and revision additions.
- `lib/`: course navigation and mathematical formatting.
- `public/`: illustrations and SVG graphs.

Lesson routes are generated statically. Search covers all three subjects. Equations use KaTeX, and graphs support full-resolution viewing.

Original documents, scratch files, conversion records, dependency directories, and generated build files are excluded from Git.

## Cloudflare Workers deployment

The repository includes `wrangler.jsonc` for the `bs` Worker. It serves the static website from `out/` and declares a compatibility date.

In Workers Builds, use:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: repository root

The existing `npx wrangler deploy --assets ./out` command is also compatible with this configuration.

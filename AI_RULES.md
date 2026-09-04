# AI Rules & Project Guidance

## Tech Stack
- **Framework & Runtime**: Next.js 15 (App Router) with React 19 and Node.js v18.17+.
- **Language**: TypeScript throughout the entire application with strict type checking.
- **Design System & Components**: Once UI (`src/once-ui/`), a custom modular UI library providing core primitives (`Flex`, `Column`, `Row`, `Heading`, `Text`, `Button`, `Card`, `Badge`, `SmartLink`, `SmartImage`, etc.).
- **Styling & Theming**: SCSS (Sass) with CSS Modules (`*.module.scss`) and CSS design tokens (`src/once-ui/tokens/` and `src/once-ui/styles/`). *Note: Tailwind CSS and shadcn/ui are not used.*
- **Icons**: `react-icons` (Heroicons `hi2`, Phosphor `pi`, and FontAwesome 6 `fa6`), managed centrally through `src/once-ui/icons.ts`.
- **Content Management**: Config-driven architecture via `src/app/resources/config.js` (site metadata, theme styles, route switches) and `src/app/resources/content.js` (copy, bio, navigation, social links).
- **Long-form Content & CMS**: MDX using `next-mdx-remote`, `@next/mdx`, `gray-matter`, and `remark` for blog posts (`src/app/blog/posts/`) and work projects (`src/app/work/projects/`).
- **Media & Layout Utilities**: `@floating-ui/react-dom` for popovers/tooltips, and Next.js Image optimization (`sharp`).
- **Code Syntax Highlighting**: `prismjs` paired with Once UI's `CodeBlock` component (`src/once-ui/modules/code/CodeBlock.tsx`).

---

## Library & Component Usage Rules

### 1. UI Components & Layouts
- **Always prefer Once UI primitives**: Import layout and UI primitives (`Flex`, `Column`, `Row`, `Heading`, `Text`, `Button`, `Card`, `Badge`, `Avatar`, `Input`, `Dialog`, `Toaster`, etc.) from `@/once-ui/components`.
- **Do NOT introduce Tailwind CSS or shadcn/ui**: This project uses SCSS and Once UI design tokens. Never add Tailwind utility classes or Radix/shadcn templates.
- **Animations & Visual Effects**: Use Once UI effects such as `RevealFx`, `TiltFx`, `GlitchFx`, and `LetterFx` from `@/once-ui/components`.

### 2. Styling & CSS Modules
- **Component Styling**: Create co-located SCSS modules (e.g., `MyComponent.module.scss`) using `classnames` (`classNames`) for conditional styles.
- **Design Tokens**: Rely on Once UI design tokens (CSS variables defined in `src/once-ui/tokens/` such as `--brand-*`, `--neutral-*`, `--accent-*`, border radii, and spacing variables) rather than hardcoded colors and measurements.
- **Theme Configuration**: Adjust global look and feel (theme, color schemes, borders, effects) in `src/app/resources/config.js` under the `style` and `effects` objects.

### 3. Icons
- **Standard Icon Usage**: Always render icons using `<Icon name="iconName" />` or `<IconButton icon="iconName" />` from Once UI.
- **Registering New Icons**: When adding new icons, import them from `react-icons` (e.g., `react-icons/hi2`, `react-icons/pi`, `react-icons/fa6`) inside `src/once-ui/icons.ts` and add them to the `iconLibrary` record.

### 4. Content & Routing
- **App Router Structure**: Pages reside in `src/app/` (e.g., `src/app/work/page.tsx`, `src/app/blog/[slug]/page.tsx`).
- **Enabling/Disabling Routes**: Toggle route availability using the `routes` object in `src/app/resources/config.js`.
- **Text & Portfolio Copy**: Store static content, social links, project summaries, and bio descriptions in `src/app/resources/content.js` rather than hardcoding text directly into page components.
- **Links & Navigation**: Use `SmartLink` from `@/once-ui/components` for both internal navigation and external links.

### 5. Blog Posts & Projects (MDX)
- **Adding Content**: Place new blog posts in `src/app/blog/posts/*.mdx` and new work projects in `src/app/work/projects/*.mdx`.
- **Frontmatter**: Include standard YAML frontmatter (`title`, `publishedAt`, `summary`, `images`, etc.) parsed via `gray-matter`.
- **Rendering MDX**: Render markdown bodies using `<CustomMDX source={post.content} />` from `src/components/mdx.tsx`.

### 6. Media & Code Blocks
- **Images**: Use `SmartImage` from `@/once-ui/components` or Next.js `Image` with local paths in `/public/images/`.
- **Code Snippets**: Use the `CodeBlock` component (`src/once-ui/modules/code/CodeBlock`) powered by `prismjs` for code syntax highlighting.

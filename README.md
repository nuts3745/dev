# nuts3745.dev

A personal website built with Next.js featuring Conway's Game of Life implemented in WebAssembly.

## Features

- Interactive Conway's Game of Life simulation using WebAssembly
- Responsive design
- Social media links (Bluesky, GitHub, Scrapbox)
- Modern React with TypeScript

## Tech Stack

- [Next.js](https://nextjs.org/) v15.3.0 - React framework for server-rendered applications
- [React](https://reactjs.org/) v18.2.0 - UI library
- [TypeScript](https://www.typescriptlang.org/) v5.8.3 - Typed JavaScript
- [WebAssembly](https://webassembly.org/) - For Conway's Game of Life implementation
- [React Icons](https://react-icons.github.io/react-icons/) v5.3.0 - Icon library
- [Vitest](https://vitest.dev/) v3.1.1 - Testing framework
- [Biome](https://biomejs.dev/) v1.9.4 - Linter and formatter

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/nuts3745/nuts3745-dev.git
   cd nuts3745-dev
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `pages/` - Next.js pages and routes
  - `index.tsx` - Home page with social links
  - `wasm-game.tsx` - Conway's Game of Life WebAssembly component
- `public/` - Static assets
- `scripts/` - WebAssembly integration for Game of Life
- `styles/` - CSS modules
- `__tests__/` - Test files

## Game of Life

The interactive Conway's Game of Life simulation is implemented in WebAssembly for performance. Users can:
- Watch the simulation evolve automatically
- Click on cells to toggle their state (alive/dead)
- The game runs with customizable parameters such as cell size, colors, and animation speed

## Testing

```bash
# Run tests
npm run test

# Generate test coverage report
npm run coverage
```

## Building and Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

The site is configured for easy deployment on Vercel, the platform from the creators of Next.js.

## License

Copyright © 2019-2025 nuts3745. All rights reserved.

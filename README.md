# Property Tax Calculator — Cloudflare Pages Deployment

## Project structure

```
tax-calculator/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── wrangler.toml
└── src/
    ├── main.tsx
    ├── App.tsx
    └── PropertyTaxCalculator.tsx
```

---

## Option A — Deploy via Git (recommended)

This lets Cloudflare auto-deploy on every push.

### 1. Push to GitHub (or GitLab)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/property-tax-calculator.git
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to **Workers & Pages → Create → Pages → Connect to Git**
3. Select your repository
4. Set the build configuration:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**

Cloudflare will build and deploy automatically. Every future push to `main` triggers a new deployment.

---

## Option B — Deploy via Wrangler CLI

Deploy directly from your machine without a Git repo.

### 1. Install dependencies and build

```bash
npm install
npm run build
```

### 2. Install Wrangler and log in

```bash
npm install -g wrangler
wrangler login
```

### 3. Deploy

```bash
wrangler pages deploy dist --project-name property-tax-calculator
```

On first run Wrangler will create the Pages project automatically. Subsequent runs deploy a new version to the same project.

---

## Local development

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Build output

`npm run build` compiles TypeScript and bundles the app into `dist/`. The
Cloudflare Pages build environment runs this same command automatically.

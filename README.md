# Lunar AI Chatbot

Lunar is an AI-powered chatbot built with [Next.js](https://nextjs.org), Clerk authentication, MongoDB Atlas, and Google Gemini API. It provides a simple, modern interface for chatting with AI, managing conversations, and more.

## Features

- ✨ Next.js 13+ App Router
- 🔒 Clerk authentication
- 💬 AI chat powered by Google Gemini API
- 🗂️ Chat history stored in MongoDB Atlas
- 🎨 Responsive UI with Tailwind CSS
- 📦 Docker support for easy deployment

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/lunar-ai.git
cd lunar-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add your credentials:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_atlas_uri
SIGNING_SECRET=your_signing_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Deployment

You can run the app in Docker using the provided `compose.yaml`:

```bash
docker compose up --build
```

Make sure your `.env` file is present and contains your MongoDB Atlas URI and API keys.

## Project Structure

- `app/` - Next.js app directory
- `components/` - React components
- `context/` - React context for global state
- `assets/` - Static assets
- `config/` - Database configuration
- `app/api/` - API routes

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Google Gemini API](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)



# 🌙 Lunar AI

Lunar AI is an advanced AI-powered space and science chatbot platform built using Next.js, Clerk authentication, MongoDB Atlas, and Google Gemini API. It provides a modern, fast, and secure conversational interface with persistent chat history and clean UI design.

---

## 🚀 Features

- ✨ Built with Next.js 13+ (App Router)
- 🤖 AI chat powered by Google Gemini API
- 🔐 Secure authentication via Clerk
- 🗄️ Persistent chat history stored in MongoDB Atlas
- 📱 Responsive and modern UI using Tailwind CSS
- 🐳 Docker / Docker-Compose support for deployment
- ⚡ Fast and optimized performance

---

## 🧱 Tech Stack

| Category | Technology |
|---------|------------|
| Frontend | Next.js (App Router), React |
| Styling | Tailwind CSS |
| Authentication | Clerk |
| Database | MongoDB Atlas |
| AI Model | Google Gemini API |
| Deployment | Docker, Vercel |
| Language | JavaScript / TypeScript |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- MongoDB Atlas account
- Gemini API key
- Clerk project setup

### Installation

```bash
git clone https://github.com/MohammedIhsaan28/Lunar-AI.git
cd Lunar-AI
npm install
Environment Variables
Create a .env.local file in the root project directory and add:

makefile
Copy code
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
MONGODB_URI=
SIGNING_SECRET=
GEMINI_API_KEY=
Running Locally
bash
Copy code
npm run dev
Open in browser:
http://localhost:3000

🐳 Docker Deployment
bash
Copy code
docker compose up --build
Make sure .env.local exists before running the container.

📁 Folder Structure
bash
Copy code
/app/          # Next.js App Router
/components/   # UI components
/context/      # Global state providers
/models/       # Database models & schemas
/config/       # Environment configuration
/public/       # Static assets
🌟 Roadmap
 Multi-model support (GPT-4, Gemini, Claude)

 Export chat history (PDF / Markdown)

 Streaming responses

 Voice-enabled conversation

 Full mobile-optimized UI

 Admin analytics dashboard

🤝 Contributing
Contributions and suggestions are welcome!
Feel free to fork this repo, submit improvements, or open issues.


📬 Contact
For issues or improvements, open an issue on GitHub.
Happy building with Lunar AI! 🚀

yaml
Copy code

---

If you want:
- README with **badges** (stars, tech stack icons)
- README with **screenshots & UI preview**
- README with **demo video link**

Just say **"add advanced version"** 🚀
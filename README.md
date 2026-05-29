# PRDify - AI Product Manager

PRDify is an intelligent SaaS platform that transforms your raw startup and app ideas into comprehensive, structured Product Requirements Documents (PRDs) using Claude AI. 

## 🌟 Features

- **Instant PRD Generation:** Generate complete, professional documentation based on just a few sentences.
- **Conversational Refinement:** Chat directly with your AI Product Manager to modify, refine, or expand specific sections dynamically.
- **Structured Outputs:** Automatically generates Product Overview, Personas, MVP Features, Tech Stack, and more.
- **Premium UI:** Modern SaaS aesthetics with glassmorphism, smooth Framer Motion animations, and responsive design.
- **Project Dashboard:** Save, view, and manage all your generated ideas.
- **Export Capabilities:** Export your final PRD to Markdown (.md) or professional PDF for your engineering team.

## 🚀 How It Works (Example Workflow)

**Step 1: Enter Your Idea**
- Go to the **Generate PRD** page.
- *Input:* "I want to build a platform where students can compare hostel prices and book rooms."
- *Category:* PropTech (Optional)
- *Target Audience:* College Students (Optional)

**Step 2: AI Generation**
- Click **Generate Document**.
- Our Claude AI Agent instantly analyzes your idea, researches the market, and drafts a fully-structured Product Requirements Document with sections like *Problem Statement, Personas, Core Features, Tech Stack, and Monetization*.

**Step 3: Conversational Refinement**
- Don't like a section? Want to add more? Use the AI Chat Sidebar!
- *You:* "Add a feature for hostel owners to list their properties."
- *AI:* (Updates the PRD markdown in real-time to include an admin/owner portal).

**Step 4: Export**
- Once satisfied, export your PRD to **PDF** or **Markdown** to share with your engineers and investors.

## 🛠 Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Framer Motion
- React Markdown
- HTML2PDF.js
- React Router DOM
- Axios

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- `@anthropic-ai/sdk` (Claude AI)

## 📁 Folder Structure

```
prdify/
├── backend/
│   ├── src/
│   │   ├── config/       # Database config
│   │   ├── controllers/  # prdController.js
│   │   ├── middleware/   # Custom middlewares
│   │   ├── models/       # Project.js Schema
│   │   ├── routes/       # prdRoutes.js
│   │   ├── services/     # claudeService.js
│   │   └── app.js        # Express app setup
│   ├── server.js         # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Navbar, Footer
│   │   ├── pages/        # Home, Dashboard, GeneratePRD, Projects, PRDDetails
│   │   ├── services/     # API client
│   │   ├── App.jsx       # Main router
│   │   └── main.jsx      # React entry
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

## 🚀 Installation & Setup

### 1. Environment Variables

Create a `.env` file in the `backend/` directory (or root if running together) based on the provided `.env.example`:

```env
PORT=5000
MONGODB_URI=your_mongodb_compass_url
ANTHROPIC_API_KEY=your_api_key
CLAUDE_MODEL=claude-3-5-sonnet-20241022
```

*(Note: The app will use mock responses if the Claude API key is missing or invalid).*

### 2. Backend Setup

Navigate to the backend directory, install dependencies, and start the server:

```bash
cd backend
npm install
npm run dev
```
*Server runs on `http://localhost:5000`*

### 3. Frontend Setup

Navigate to the frontend directory, install dependencies, and start the Vite dev server:

```bash
cd frontend
npm install
npm run dev
```
*App runs on `http://localhost:3000`*

## 🔮 Future Improvements
- Add Firebase/Clerk Authentication.
- Integrate real Google Maps & Google Places API.
- Live flight price integration (e.g., Skyscanner API).
- Map visualization for the generated itineraries.
- PDF Export functionality.

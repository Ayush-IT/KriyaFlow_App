# AI-Powered Task Manager

# Task Manager & Generator


A modern task management application built with Next.js, featuring AI-powered task generation and a beautiful user interface.

## Features

- 🔐 **Authentication** using Clerk
- 🤖 **AI-Powered Task Generation** using Google AI
- 📱 **Responsive Design** with Tailwind CSS
- 🎨 **Modern UI** with shadcn/ui components
- 📊 **Task Categories** for better organization
- ✅ **Task Completion** tracking
- 🔄 **Real-time Updates**
- 🗑️ **Task Deletion**
- ✏️ **Task Editing**

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** Clerk
- **Database:** PostgreSQL with Drizzle ORM
- **AI Integration:** Google AI API
- **Containerization:** Docker

## Prerequisites

- Node.js 18 or later
- Docker and Docker Compose
- PostgreSQL (if running without Docker)
- Clerk account for authentication
- Google AI API key

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Google AI API
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Database
DATABASE_URL=postgres://postgres:postgres@localhost:5432/task_manager
```

## Getting Started

### Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

2. Create and configure your `.env` file:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. Start the application:
   ```bash
   docker-compose up --build
   ```

4. Access the application at `http://localhost:3000`

### Manual Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npm run db:generate
   npm run db:push
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Access the application at `http://localhost:3000`

## Project Structure

```
task-manager/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (auth)/           # Authentication routes
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── ui/               # UI components
│   ├── task-generator.tsx
│   ├── task-list.tsx
│   └── task-manager.tsx
├── lib/                   # Utility functions and configurations
│   ├── db/               # Database configuration
│   ├── constants.ts      # Application constants
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## API Routes

- `POST /api/tasks/generate` - Generate tasks using AI
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/[taskId]` - Update a task
- `DELETE /api/tasks/[taskId]` - Delete a task
- `PATCH /api/tasks/[taskId]/complete` - Mark a task as complete

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.com/)
- [Google AI](https://ai.google.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)

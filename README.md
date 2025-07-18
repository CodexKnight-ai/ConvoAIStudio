This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# ConvoAI Studio 🎙️

A modern podcast platform that leverages AI to deliver personalized podcast experiences. Built with Next.js and powered by Clerk for authentication.

## ✨ Features

- Secure authentication with Clerk
- Email verification flow
- Modern, responsive UI with Tailwind CSS
- Fast performance with Next.js
- Real-time interactions
- Mobile-friendly design

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **UI Components**: Radix UI, Lucide Icons
- **Animation**: Framer Motion
- **State Management**: React Hooks
- **Form Handling**: React Hook Form
- **Type Safety**: TypeScript

##  Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- Clerk account (for authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CodexKnight-ai/ConvoAIStudio.git
   cd ConvoAIStudio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Clerk credentials:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # App Router
│   ├── sign-in/            # Sign-in page
│   ├── sign-up/            # Sign-up page with email verification
│   ├── (auth)/             # Authenticated routes
│   ├── Client Components/   # Client-side components
│   │   ├── Navbar/         # Navigation bar
│   │   ├── Footer/         # Page footer
│   │   └── Home/           # Homepage components
│   └── layout.tsx          # Root layout
├── components/             # Shared components
├── lib/                    # Utility functions
└── middleware.ts           # Authentication middleware
```

##  Authentication

This project uses Clerk for authentication. The authentication flow includes:

- Email/password sign-up
- Email verification
- Session management
- Protected routes

##  Styling

- **Tailwind CSS** for utility-first styling
- Custom animations with **Framer Motion**
- Responsive design for all screen sizes
- Dark mode support

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Made with ❤️ by CodexKnight

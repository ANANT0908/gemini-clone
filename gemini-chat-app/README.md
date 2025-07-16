# 💬 Gemini Chat App

A full-stack modern chat application inspired by WhatsApp. Built using **Next.js 14 App Router**, **TypeScript**, **Redux Toolkit**, and **MUI**, with features like dark mode, OTP-based login, chatroom creation, and infinite scrolling.

## 🔗 Live Demo

👉 [View Live](https://gemini-clone-rust-tau.vercel.app/)

---

## 🚀 Project Overview

* 🔐 **OTP-based Authentication**
* 💡 **Dark Mode Toggle**
* 📱 **Responsive UI using MUI**
* 🧩 **Chatroom Creation & Deletion**
* ♾️ **Infinite Scroll for Messages**
* 🧪 **Form Validation with Zod**
* 🧠 **Redux Toolkit for State Management**

---

## 💪 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/ANANT0908/gemini-clone.git
cd gemini-chat-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

> The app will be live on `http://localhost:3000`

---

## 🧱 Folder Structure

```bash
.
├── app/                # App Router pages (Next.js 14)
│   ├── layout.tsx      # Root layout with ThemeContext
│   └── page.tsx        # Homepage with login
│   └── dashboard/      # Dashboard with chat interface
├── components/
│   ├── AuthForm.tsx         # Login form with OTP
│   ├── ChatWindow.tsx       # Chat display
│   ├── ChatroomList.tsx     # Create/delete chatrooms
│   ├── Header.tsx           # AppBar with theme + logout
│   └── ThemeToggle.tsx      # Light/Dark toggle button
├── store/
│   ├── index.ts             # Redux store
│   ├── authSlice.ts         # Auth-related logic
│   └── chatSlice.ts         # Chatroom logic
├── context/
│   └── ThemeContext.tsx     # MUI theme toggle context
├── utils/
│   ├── validatePhone.ts     # Zod validation schema
│   └── countryService.ts    # Fetch country codes
├── styles/
│   └── globals.css          # Tailwind & CSS variables
```

---

## 📦 Key Implementations

### ✅ Throttling

* **OTP simulation** uses a simple `setTimeout` for throttling OTP requests in `AuthForm.tsx`.
* You can enhance it using `lodash.throttle` if API rate-limiting is required.

### 📄 Pagination & Infinite Scroll

* Messages (simulated in `ChatWindow`) support **infinite scrolling** with `onScroll` event.
* You can later plug in paginated API calls from the backend.

### ♾️ Infinite Scroll (Concept)

```ts
const handleScroll = () => {
  if (scrollTop === 0 && hasMore) {
    loadMoreMessages(); // Load older messages
  }
};
```

### ✅ Form Validation

* Zod schema used with `react-hook-form` to validate inputs.

```ts
const phoneSchema = z.object({
  countryCode: z.string().min(1, 'Select a country code'),
  phone: z.string().regex(/^\d{10}$/, 'Enter valid 10-digit number'),
});
```

---

## 🧑‍💻 Author

Made with ❤️ by [Anant Verma](https://github.com/ANANT0908/gemini-clone)


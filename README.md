# 📖 Midnight Reads - Premium Ebook Platform

A sophisticated, full-stack ebook marketplace and reading application designed for a premium user experience. Built with performance and aesthetics in mind, utilizing a modern tech stack.

---

## ✨ Key Features

### 👤 For Readers
*   **Secure Authentication**: Robust login and registration system using JWT for secure, persistence sessions.
*   **Immersive Book Shop**: A beautifully designed marketplace to explore a vast collection of ebooks.
*   **Rich Book Details**: Detailed view of every title, featuring high-quality covers, descriptions, and pricing.
*   **Personal Dashboard**: A centralized hub for users to track their reading journey and manage their library.
*   **Credits System**: Flexible package-based credit system for easy book purchases.
*   **Midnight Vault**: An exclusive, curated section for premium titles and special collections.
*   **Buyback Program**: A unique feature allowing users to exchange or sell back books.

### 🛡 For Curators (Admin)
*   **Advanced Analytics**: Track platform growth with metrics for total users, sales, and orders.
*   **Catalog Management**: Streamlined CRUD operations to update books, pricing, and metadata.
*   **User Management**: Full control over user accounts and roles.
*   **Transaction Tracking**: Real-time monitoring of all purchase activities and credit packages.

---

## 🛠 Technology Stack

### **Frontend**
*   **Library**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom UI components)
*   **Navigation**: [React Router 7](https://reactrouter.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
*   **Typography**: Geist Sans & Outfit

### **Backend**
*   **Environment**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [Microsoft SQL Server (MSSQL)](https://www.microsoft.com/sql-server)
*   **Security**: [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) & [JWT](https://jwt.io/)
*   **Driver**: `mssql` & `msnodesqlv8`

---

## 📂 Project Structure

```bash
Ebook-Reading-App/
├── 📱 client/           # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI elements
│   │   ├── pages/       # Main views (Shop, Vault, Admin, etc.)
│   │   ├── context/     # Auth & State Management
│   │   └── assets/      # Static resources
├── ⚙️ server/           # Node.js Express Backend
│   ├── controllers/     # Route logic
│   ├── routes/          # API endpoints
│   ├── database/        # MS SQL Connection & Queries
│   └── middleware/      # Auth & Security layers
```

---

## 🚀 Setup & Installation

### 1. Clone & Install
```bash
git clone https://github.com/your-repo/ebook-reading-app.git
```

### 2. Server Configuration
*   Navigate to `/server`
*   Create a `.env` file based on `.env.example`
*   Install dependencies: `npm install`
*   Start development: `npm run dev`

### 3. Client Configuration
*   Navigate to `/client`
*   Install dependencies: `npm install`
*   Start development: `npm run dev`

---

Developed with a focus on modern design and scalable architecture.

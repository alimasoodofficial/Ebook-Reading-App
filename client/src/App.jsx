import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Shop from './pages/Shop';

import { AuthProvider } from './context/AuthContext';
import BookDetails from './pages/BookDetails';
import MidnightVault from './pages/MidnightVault';
import Buyback from './pages/Buyback';
import Packages from './pages/Packages';
import AdminDashboard from './pages/AdminDashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-secondary selection:text-white">
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/vault" element={<MidnightVault />} />
            <Route path="/buyback" element={<Buyback />} />
            <Route path="/books/:id" element={<BookDetails />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

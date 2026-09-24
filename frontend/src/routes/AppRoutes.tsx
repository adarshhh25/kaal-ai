import { Routes, Route } from 'react-router-dom';
import ProtectedLayout from '../layouts/ProtectedLayout';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Guidance from '../pages/Guidance';
import History from '../pages/History';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/guidance" element={<Guidance />} />
      <Route path="/guidance/:id" element={<Guidance />} />

      {/* Protected Routes with Application Shell Layout */}
      <Route element={<ProtectedLayout />}>
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

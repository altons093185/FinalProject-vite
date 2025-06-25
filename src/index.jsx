import { Routes, Route } from 'react-router-dom';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import ProductByCategory from './pages/ProductByCategory';
import ProductDetail from './pages/ProductDetail';
import OrderList from './pages/OrderList';
import OrderDetail from './pages/OrderDetail';
//admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrderList from './pages/admin/AdminOrderList';

import { AuthProvider } from './context/AuthContext';

function index() {
  return (
    <AuthProvider>
        <div className="min-h-screen flex flex-col bg-[#F6F5F3] text-[#3E3A39] overflow-x-hidden">
        <Navbar />
        <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/category/:nameEn" element={<ProductByCategory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          {/* admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrderList />} />
        </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default index;
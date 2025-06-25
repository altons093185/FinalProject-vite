import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="bg-gray-100 p-8 mt-20">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">管理員後台</h1>
        <p className="text-center text-gray-600 mb-8">請選擇要管理的功能</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/users" className="p-6 bg-[#7C9B75] text-white rounded-lg shadow-md hover:bg-[#6C8864] transition">
            <h2 className="text-xl font-semibold mb-2">使用者管理</h2>
            <p className="text-sm">檢視、編輯、刪除使用者資訊</p>
          </Link>

          <Link to="/admin/orders" className="p-6 bg-[#B8574B] text-white rounded-lg shadow-md hover:bg-[#a4473b] transition">
            <h2 className="text-xl font-semibold mb-2">訂單管理</h2>
            <p className="text-sm">檢視與處理用戶訂單</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [memberHover, setMemberHover] = useState(false);
  const [memberMobileOpen, setMemberMobileOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();  // 🔄 呼叫 context 中的登出功能
    Swal.fire({
      icon: "success",
      title: "已登出",
      text: "期待您再次光臨！",
      confirmButtonText: "回到首頁"
    }).then(() => {
      navigate("/");
    });
  };


  return (
    <nav className="bg-[#7C9B75] text-white p-2 fixed top-0 left-0 right-0 z-50">
      <div className="grid grid-cols-3 items-center w-full mx-auto px-4">

        {/* 左：Sidebar（漢堡選單） */}
        <div className="flex justify-start">
          <Sidebar />
        </div>

        {/* 中：網站名稱 */}
        <div className="flex justify-center">
          <Link to="/" className="text-xl sm:text-2xl font-bold tracking-wide">好市快購</Link>
        </div>

        {/* 右：桌機導覽連結 / 手機顯示漢堡按鈕 */}
        <div className="flex justify-end items-center">
          {/* 桌機時顯示連結 */}
          <div className="hidden sm:flex space-x-4 items-center">
            <Link to="/" className="hover:text-white/80">首頁</Link>
            <Link to="/cart" className="hover:text-white/80">購物車</Link>

            {/* 桌機版 hover 展開會員中心 */}
            <div className="relative group">
              <span className="cursor-pointer hover:text-white/80 block">
                會員中心
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-40 pt-4 
                  group-hover:visible invisible">
                <div className="bg-[#f6f5f3] text-black rounded-md shadow-lg">
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 hover:bg-gray-200 rounded-md 
                   opacity-0 translate-y-2 transition-all duration-200 delay-0
                   group-hover:opacity-100 group-hover:translate-y-0">
                        登出
                      </button>
                      <Link to="/orders"
                        className="block px-4 py-2 hover:bg-gray-200 rounded-md 
                   opacity-0 translate-y-2 transition-all duration-200 delay-200 
                   group-hover:opacity-100 group-hover:translate-y-0">
                        歷史訂單
                      </Link>
                      <Link to="/profile"
                        className="block px-4 py-2 hover:bg-gray-200 rounded-md 
                   opacity-0 translate-y-2 transition-all duration-200 delay-300 
                   group-hover:opacity-100 group-hover:translate-y-0">
                        帳戶資訊
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/register"
                        className="block px-4 py-2 hover:bg-gray-200 rounded-md 
                   opacity-0 translate-y-2 transition-all duration-200 delay-0 
                   group-hover:opacity-100 group-hover:translate-y-0">
                        註冊
                      </Link>
                      <Link to="/login"
                        className="block px-4 py-2 hover:bg-gray-200 rounded-md 
                   opacity-0 translate-y-2 transition-all duration-200 delay-100 
                   group-hover:opacity-100 group-hover:translate-y-0">
                        登入
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 漢堡按鈕 */}
          <button
            className="sm:hidden ml-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* 手機版展開選單 */}
      {menuOpen && (
        <div className="sm:hidden mt-2 px-4 space-y-2">
          <Link to="/" className="block hover:text-white/80">首頁</Link>
          <Link to="/cart" className="block hover:text-white/80">購物車</Link>

          {/* 手機版會員中心可展開 */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer hover:text-white/80"
              onClick={() => setMemberMobileOpen(!memberMobileOpen)}
            >
              <span>會員中心</span>
              <span>{memberMobileOpen ? "▲" : "▼"}</span>
            </div>
            {memberMobileOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <Link to="/login" className="block hover:text-white/80">登入/註冊</Link>
                <Link to="/orders" className="block hover:text-white/80">歷史訂單</Link>
                <Link to="/profile" className="block hover:text-white/80">帳戶資訊</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

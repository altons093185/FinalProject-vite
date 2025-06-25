import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // ⬅️ 用於跳轉頁面
  const [form, setForm] = useState({ userName: "", email: "", password: "" }); // 🔧 新增：用來收集表單資料

  const API_URL = "http://localhost:8081/api/auth/register";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // 防止表單刷新
    const formData = new FormData();
    formData.append("userName", form.userName);
    formData.append("email", form.email);
    formData.append("password", form.password);
    try {
        await axios.post(API_URL, formData); // 🔧 改為送出註冊 API
    Swal.fire({
      icon: 'success',
      title: '註冊成功！',
      text: '您現在可以登入帳號',
      confirmButtonText: '前往登入'
    }).then(() => {
      navigate('/login'); // ⬅️ 導向登入頁
    });
    }
    catch (error) {
      console.error("註冊失敗:", error);
      Swal.fire({
        icon: 'error',
        title: '註冊失敗',
        text: '請檢查您的輸入或稍後再試',
        confirmButtonText: '重新嘗試'
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">建立新帳號</h2>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">使用者名稱</label>
            <input
              name="userName"
              onChange={handleChange}
              type="text"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="你的暱稱"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">密碼</label>
            <div className="relative">
              <input
                name="password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                className="w-full border rounded px-3 py-2 text-sm pr-10"
                placeholder="••••••"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-400 hover:text-main"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
              >
                👁
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-main hover:bg-main-hover text-white py-2 rounded text-sm"
          >
            註冊
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">
          已經有帳號了？ <Link to="/login" className="text-main hover:text-main-hover hover:underline">立即登入</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

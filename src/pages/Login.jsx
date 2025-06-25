import { useState } from 'react';
import { href, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // ⬅️ 用於跳轉頁面
  const [form, setForm] = useState({ email: "", password: "" }); // 🔧 新增：用來收集表單資料
  const { login } = useAuth();
  // const API_URL = "http://localhost:8081/api/auth/login";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);
    try {
      const res = await login(formData);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "登入成功",
          text: '歡迎回來！',
          confirmButtonText: '前往首頁'
        }).then(() => {
          if (res.data.role === 'USER') {
            navigate("/");
          } else {
            navigate("/admin");
          }

        });
      }
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: '登入失敗',
        text: error.response.data.message,
        confirmButtonText: '重新嘗試'
      });
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-bg px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md h-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">登入你的帳號</h2>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">密碼</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm pr-10"
                placeholder="••••••"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-400 hover:text-main"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}  // 手滑出範圍也隱藏
              >
                👁
              </button>
            </div>
          </div>


          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-1">
              <input type="checkbox" />
              記住我
            </label>
            <a href="#" className="text-main hover:underline">忘記密碼？</a>
          </div>

          <button
            type="submit"
            className="w-full bg-main hover:bg-main-hover text-white py-2 rounded text-sm"
          >
            登入
          </button>
        </form>

        <div className="my-6 border-t text-center text-sm text-gray-400">或使用以下方式繼續</div>

        <div className="flex justify-center">
          <button className="w-1/2 py-2 border rounded text-sm flex items-center justify-center gap-2">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
            Google
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          還不是會員？ <Link to="/register" className="text-main hover:text-main-hover hover:underline">建立帳號</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
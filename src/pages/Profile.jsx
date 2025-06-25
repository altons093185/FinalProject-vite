import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

function Profile(){
      // const {userName} = useAuth();  

        const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8081/api/auth/getUser", {
      withCredentials: true
    }).then(res => {
      setUser(res.data.data);
    }).catch(() => {
      setUser(null); // 或導向登入頁
    });
  }, []);


if (!user) {
    return (
      <Loading />
    );
  }
  return (

    <div className="max-w-xl mx-auto mt-20 bg-white p-6 rounded shadow text-[#3E3A39]">
      <h1 className="text-2xl font-bold mb-6">👤 帳戶資訊</h1>

      <div className="mb-4">
        <p className="text-sm text-gray-500">姓名</p>
        <p className="text-lg">{user.userName}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Email</p>
        <p className="text-lg">{user.email}</p>
      </div>

      {/* <div className="mb-4">
        <p className="text-sm text-gray-500">身分</p>
        <p className="text-lg">{userName}</p>
      </div> */}

      <div className="mb-4">
        <p className="text-sm text-gray-500">註冊日期</p>
        <p className="text-lg">
  {new Date(user.createdAt).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })}
</p>
      </div>
    </div>
  );

}

export default Profile;
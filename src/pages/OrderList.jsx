import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/orders", {
          withCredentials: true
        });
        setOrders(res.data.data);
      } catch (error) {
        console.error("載入失敗:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24 space-y-6">
      <h1 className="text-3xl font-bold text-[#55745A]">📦 訂單總覽</h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#7C9B75] text-white">
            <tr>
              <th className="px-5 py-3 text-left whitespace-nowrap">訂單編號</th>
              <th className="px-5 py-3 text-left whitespace-nowrap">訂購日期</th>
              <th className="px-5 py-3 text-left whitespace-nowrap">總金額</th>
              <th className="px-5 py-3 text-left whitespace-nowrap">付款狀態</th>
              <th className="px-5 py-3 text-left whitespace-nowrap">出貨狀態</th>
              <th className="px-5 py-3 text-right whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-[#444]">#{order.id}</td>
                <td className="px-5 py-3 text-gray-600">
                  {dayjs(order.createdAt).format("YYYY/MM/DD HH:mm")}
                </td>
                <td className="px-5 py-3 font-bold text-[#B8574B]">
                  NTD${order.totalAmount}
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {order.isPaid ? "已付款" : "未付款"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    order.isShipped ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {order.isShipped ? "已出貨" : "處理中"}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-[#55745A] hover:underline"
                  >
                    查看明細
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-400">
                  📭 尚無訂單記錄
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";

function OrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("http://localhost:8081/api/orders/admin", {
                    withCredentials: true,
                });
                setOrders(res.data.data);
            } catch (error) {
                console.error("載入失敗:", error);
            }
        };
        fetchOrders();
    }, []);

    const handleShip = async (orderId) => {
        Swal.fire({
            title: "確定要出貨嗎?",
            text: "將會執行自動下單程序",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#28A745",
            cancelButtonColor: "#d33",
            confirmButtonText: "確認出貨",
            cancelButtonText: "取消"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.post(`http://localhost:8081/api/orders/${orderId}/ship`, {}, {
                        withCredentials: true
                    });

                    // 出貨成功後更新該筆訂單狀態
                    setOrders(prev =>
                        prev.map(order =>
                            order.id === orderId
                                ? { ...order, isShipped: true }
                                : order
                        )
                    );

                    Swal.fire({
                        title: "已出貨",
                        text: "請檢查訂單狀況",
                        icon: "success"
                    });
                } catch (error) {
                    console.error("出貨失敗:", err);
                    Swal.fire({
                        icon: 'error',
                        title: '出貨失敗',
                        text: error.response.data.message,
                        confirmButtonText: '重新嘗試'
                    });
                }
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 pt-24 space-y-6">
            <h1 className="text-3xl font-bold text-[#55745A]">📦 訂單總覽</h1>

            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-[#7C9B75] text-white">
                        <tr>
                            <th className="px-5 py-3 text-left whitespace-nowrap">訂單編號</th>
                            <th className="px-5 py-3 text-left whitespace-nowrap">訂購日期</th>
                            <th className="px-5 py-3 text-left whitespace-nowrap">總金額</th>
                            <th className="px-5 py-3 text-left whitespace-nowrap">付款狀態</th>
                            <th className="px-5 py-3 text-left whitespace-nowrap">出貨狀態</th>
                            <th className="px-5 py-3 text-left whitespace-nowrap">操作</th>
                            <th className="px-5 py-3 text-right whitespace-nowrap"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b hover:bg-gray-50 transition duration-150"
                                >
                                    <td className="px-5 py-3 font-semibold text-[#3E3A39]">
                                        #{order.id}
                                    </td>
                                    <td className="px-5 py-3">
                                        {dayjs(order.createdAt).format("YYYY/MM/DD HH:mm")}
                                    </td>
                                    <td className="px-5 py-3 font-bold text-[#B8574B]">
                                        NTD${order.totalAmount}
                                    </td>
                                    <td className="px-5 py-3">
                                        <span
                                            className={`px-2 py-1 rounded text-sm font-semibold ${order.isPaid
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {order.isPaid ? "已付款" : "未付款"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span
                                            className={`px-2 py-1 rounded text-sm font-semibold ${order.isShipped
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {order.isShipped ? "已出貨" : "處理中"}
                                        </span>
                                    </td>

                                    <td className="px-5 py-3">
                                        {order.isShipped ? (
                                            <span className="text-sm text-gray-400">已出貨</span>
                                        ) : (
                                            <button
                                                onClick={() => handleShip(order.id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-2 rounded-md shadow-sm transition duration-150"
                                            >
                                                出貨
                                            </button>
                                        )}
                                    </td>

                                    <td className="px-5 py-3 text-right">
                                        <Link
                                            to={`/orders/${order.id}`}
                                            className="text-[#55745A] font-medium hover:underline"
                                        >
                                            查看明細
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-gray-400">
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

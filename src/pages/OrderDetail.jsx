import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from "../components/Loading";
import dayjs from "dayjs";

function OrderDetail() {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        // await sleep(3000);
        const orderDetailRes = await axios.get(`http://localhost:8081/api/orders/${orderId}`, { withCredentials: true });
        console.log(orderDetailRes.data.data);
        setOrderDetail(orderDetailRes.data.data);
      } catch (error) {
        console.log("載入失敗:", error);
      }
    };
    fetchOrderDetail();
  }, [orderId]);


  if (!orderDetail) {
    return (
      <Loading />
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 pt-20 space-y-6">
      <h1 className="text-3xl font-bold text-[#55745A]">訂單明細</h1>
      <div className="bg-[#7C9B75] p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 text-sm font-medium text-gray-100">
          <div>訂購日期<br /><span className="font-normal">{dayjs(orderDetail.createdAt).format("YYYY/MM/DD HH:mm")}</span></div>
          <div>訂單編號<br /><span className="font-normal">{orderDetail.orderId}</span></div>
          <div>總金額<br /><span className="font-normal">${orderDetail.totalAmount}</span></div>
          <div>付款狀態<br /><span className="font-normal">{orderDetail.isPaid ? "已付款" : "未付款"}</span></div>
          <div>訂單狀態<br /><span className="font-normal">{orderDetail.isShipped ? "已出貨" : "處理中"}</span></div>
          <div>收件人<br /><span className="font-normal">{orderDetail.name}</span></div>
          <div>收件人地址<br /><span className="font-normal">{orderDetail.city}{orderDetail.zipCode.slice(3)}{orderDetail.address}</span></div>
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="text-left py-2">商品</th>
            <th className="text-left py-2">價格</th>
            <th className="text-left py-2">數量</th>
            <th className="text-left py-2">小計</th>
            <th className="text-right py-2">商品連結</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail.items.map((item) => (
            <tr key={item.productId} className="border-b">
              <td className="flex items-center gap-4 py-4">
                <img src={`https://www.costco.com.tw${item.imgUrl}`} alt={item.productNameZh} className="w-10 h-10 object-contain rounded" />
                <span>{item.productNameZh}</span>
              </td>
              <td>NTD${item.unitPrice}</td>
              <td>{item.quantity}</td>
              <td>NTD${item.subtotal}</td>
              <td className="text-right">
                <Link to={`/products/${item.productId}`} className="text-blue-600 hover:underline">View Product</Link>
              </td>
            </tr>
          ))}
          <tr className="border-b">
            <td className="flex items-center gap-4 py-4">
              服務費
            </td>
            <td></td>
            <td></td>
            <td>NTD${orderDetail.totalAmount - Math.round(orderDetail.totalAmount / 1.05)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetail;

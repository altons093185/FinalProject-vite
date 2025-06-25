import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Stepper from "../components/Stepper";


function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {

    try {
      const res = await axios.get("http://localhost:8081/api/cart", {
        withCredentials: true
      });
      setCartItems(res.data.data);

      // 自動算總金額
      // const totalAmount = res.data.data.reduce(
      //   (sum, item) => sum + item.price * item.quantity,
      //   0
      // );
      // setTotal(totalAmount);
    } catch (error) {
      console.error("載入購物車失敗:", error);//error.response.data.message
    }

  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;
  const navigate = useNavigate();

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8081/api/cart/remove?productId=${productId}`, {
        withCredentials: true
      });
      // 更新前端
      setCartItems(prev => prev.filter(item => item.productId !== productId));//移除 id 等於傳入的那一筆商品
    } catch (error) {
      console.error("刪除失敗：", error);
      Swal.fire({
        icon: "error",
        title: "刪除失敗",
        text: "請稍後再試，或聯絡客服。",
        confirmButtonText: "知道了"
      });
    }
  };

  const handleCheckOut = () => {
    navigate('/checkout', {
      state: {
        subtotal: subtotal,
        serviceFee: serviceFee,
        total:total
      }
    });
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      // ⬇️ 通知後端修改數量
      await axios.patch(
        "http://localhost:8081/api/cart/update",
        {
          productId,
          quantity: newQuantity,
        },
        {
          withCredentials: true,
        }
      );

      // ⬇️ 更新前端畫面
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error("更新數量失敗", error);
      // ❗可以加提示視窗
      Swal.fire({
        icon: "error",
        title: "數量更新失敗",
        text: "請稍後再試或聯絡客服"
      });
    }
  };


  return (
    <div className="mt-20">
      <Stepper />
      <div className="bg-[#F6F5F3] px-4 text-[#3E3A39]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            🛒 購物車
          </h1>
          <hr className="mb-8 border-gray-300" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 商品列表 */}
            <div className="lg:col-span-2">
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-6 p-6 bg-white rounded-lg shadow-md transition duration-200 hover:bg-[#f3f2f0]"
                    >
                      <img src={`https://www.costco.com.tw/${item.imgUrl}`} alt={item.nameZh} className="w-28 h-28 object-cover rounded border" />
                      <div className="flex-1">
                        <h2 className="font-semibold text-xl mb-1">{item.nameZh}</h2>
                        <p className="text-sm text-[#6D6763] mb-1">單價 NT${item.currentPrice}</p>
                        <p className="text-sm text-green-600">  {item.isInStock ? (
                          <span className="text-green-600">✔商品尚有庫存</span>
                        ) : (
                          <span className="text-red-600">❌商品目前缺貨!</span>
                        )}</p>
                      </div>
                      <div className="flex items-center border rounded overflow-hidden bg-[#f3f2f0]">
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          className="px-3 py-1 bg-[#7C9B75] hover:bg-[#6C8864] text-lg"
                        >−</button>

                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          className="w-12 text-center border-l border-r bg-[#f3f2f0]"
                          onChange={(e) =>
                            handleQuantityChange(item.productId, Number(e.target.value))
                          }
                        />

                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          className="px-3 py-1 bg-[#7C9B75] hover:bg-[#6C8864] text-lg"
                        >+</button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#B8574B] mb-2">NT${item.currentPrice * item.quantity}</p>
                        <button
                          onClick={() => handleDelete(item.productId)}
                          className="text-sm text-red-500 hover:underline"
                        >刪除</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                  <p className="text-lg font-semibold mb-4">購物車目前沒有商品</p>
                  <Link to="/" className="text-main hover:underline">點擊這裡前往選購商品</Link>
                </div>
              )}
            </div>

            {/* 訂單摘要 */}
            <div className="bg-white rounded shadow-md p-6 h-fit">
              <h2 className="text-lg font-bold mb-4">訂單摘要</h2>
              <div className="space-y-2 text-sm text-[#555]">
                <div className="flex justify-between">
                  <span>小計</span>
                  <span>NT${subtotal}</span>
                </div>
                {/* <div className="flex justify-between">
                <span>運費</span>
                <span>NT${shipping}</span>
              </div> */}
                <div className="flex justify-between">
                  <span>服務費(5%)</span>
                  <span>NT${serviceFee}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-base">
                  <span>總金額</span>
                  <span className="text-[#B8574B]">NT${total}</span>
                </div>
              </div>
              <button onClick={() => handleCheckOut()} className="mt-6 w-full bg-[#7C9B75] hover:bg-[#6C8864] text-white py-3 rounded text-lg">
                結帳去
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from "react-router-dom";


function ProductCard({ product }) {

  const handleAddToCart = async (productId, quantity) => {
    try {
      const res = axios.post("http://localhost:8081/api/cart/add",
        {
          productId,
          quantity
        }
        , { withCredentials: true });
      Swal.fire({
        title: '加入成功！',
        text: '已將商品加入購物車。',
        icon: 'success',
        confirmButtonText: '確認'
      });
    } catch (error) {
      console.error("加入失敗:", error);
      Swal.fire({
        icon: "error",
        title: "加入失敗",
        text: error.response?.data?.message || "請稍後再試"
      });
    }
  };

  return (
    
    <div className="bg-white rounded-lg shadow p-4 flex flex-col h-[480px]">
      {/* 圖片區塊 */}
      <Link to={`/products/${product.productId}`} className="flex-1 block">
      <div className="h-48 w-full mb-3">
        <img
          src={"https://www.costco.com.tw" + product.imgUrl}
          className="h-full w-full object-contain"
          alt="商品圖"
        />
      </div>

      {/* 中間文字區塊（會撐高、也可能留白） */}
      
      <div className="flex-1">
        <h2 className="font-semibold text-lg leading-snug mb-1 line-clamp-4">{product.nameZh}</h2>
      </div>
      </Link>

      {/* 價格＋按鈕區塊（從底部長起來） */}
        <div className="pt-3">
        <div className="mb-3">
          <p className="text-sm text-[#6D6763]">{product.unitPrice}</p>
          {product.discountAmount !== 0 && (
            <p className="text-sm line-through text-[#A6A3A0]">
              NT${product.currentPrice + product.discountAmount}
            </p>) }
          <p className="text-lg font-bold text-[#B8574B]">NT${product.currentPrice}</p>
        </div>
        <button
          className="w-full bg-[#7C9B75] hover:bg-[#6C8864] text-white py-2 rounded"
          onClick={() => handleAddToCart(product.productId, 1)}
        >
          加入購物車
        </button>
      </div>
    </div>

  );
}

export default ProductCard;



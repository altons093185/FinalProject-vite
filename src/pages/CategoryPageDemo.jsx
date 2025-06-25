import { useState } from "react";

function CategoryPageDemo() {
  const [sortOption, setSortOption] = useState("最新上架");

  const mockProducts = [...Array(8)].map((_, i) => ({
    id: i + 1,
    name: `商品名稱 ${i + 1}`,
    price: 299 + i * 100,
    originalPrice: 499 + i * 100,
    description: "熱銷推薦商品",
    image: "https://via.placeholder.com/300x300?text=Product"
  }));

  const sortedProducts = [...mockProducts].sort((a, b) => {
    if (sortOption === "價格由低至高") return a.price - b.price;
    if (sortOption === "價格由高至低") return b.price - a.price;
    return a.id - b.id; // 最新上架（假設 id 越大越新）
  });

  return (
    <div className="bg-[#F6F5F3] min-h-screen px-4 pt-24 pb-8 text-[#3E3A39]">
      {/* 分類標題區塊 */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-main mb-2 border-b pb-2">
          📂 熱銷商品專區
        </h1>
        <p className="text-[#837A74] text-sm">為你推薦最新精選商品</p>
      </div>

      {/* 排序選單功能 */}
      <div className="max-w-6xl mx-auto flex justify-end mb-4 pr-2">
        <select
          className="border px-3 py-1 rounded text-sm"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option>最新上架</option>
          <option>價格由低至高</option>
          <option>價格由高至低</option>
        </select>
      </div>

      {/* 商品列表區塊 */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {sortedProducts.map((product) => (
          <div key={product.id} className="relative group">
            {/* 熱銷標籤 */}
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
              熱銷
            </span>

            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-sm font-semibold mb-1 line-clamp-2">
                  {product.name}
                </h2>
                <p className="text-xs text-[#6D6763] mb-1">{product.description}</p>
                <p className="text-[#B8574B] font-bold">NT${product.price}</p>
                <p className="text-xs text-[#A6A3A0] line-through">NT${product.originalPrice}</p>
                <button className="mt-3 w-full bg-[#7C9B75] hover:bg-[#6C8864] text-white text-sm py-2 rounded">
                  🛒 加入購物車
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPageDemo;

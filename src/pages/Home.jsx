import Search from '../components/Search';
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from '../components/ProductCard';
function Home() {


  const API_URL = "http://localhost:8081/api/products/popular";

  const [popularProducts, setpopularProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      // console.log("Fetched products:", response.data.data);
      setpopularProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div className="bg-[#F6F5F3] text-[#3E3A39] min-h-screen flex flex-col justify-between pt-12">
      {/* Hero 區塊 */}
      <section
        className="w-full h-[250px] bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4"
        style={{ backgroundImage: `url('src/assets/HomeBannerBg.jpg')` }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">賣場代購專區</h1>
        <p className="text-lg md:text-xl mb-6">低代購費・快速寄送・官方正品保障</p>
        <button className="bg-white text-[#3E3A39] px-6 py-2 rounded font-semibold hover:bg-gray-200 transition">
          立即逛逛
        </button>
      </section>

      {/* 優勢區塊 */}
      <section className="w-full py-6 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow p-6 rounded text-center">
          <h3 className="font-bold text-xl mb-2">代購費只要 5%</h3>
          <p className="text-sm text-[#6D6763]">同行最高收 15%，我們幫你省最大</p>
        </div>
        <div className="bg-white shadow p-6 rounded text-center">
          <h3 className="font-bold text-xl mb-2">快速送達</h3>
          <p className="text-sm text-[#6D6763]">平均 3-5 天內完成出貨</p>
        </div>
        <div className="bg-white shadow p-6 rounded text-center">
          <h3 className="font-bold text-xl mb-2">正品保證</h3>
          <p className="text-sm text-[#6D6763]">官網直送，保障來源真實</p>
        </div>
      </section>

      {/* 商品區塊（含搜尋列） */}
      <div className="w-full px-4 pb-6 pt-4">
        <Search />

        <div className="max-w-8xl mx-auto px-16">
          <h2 className="text-xl font-bold mb-4">熱門商品</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
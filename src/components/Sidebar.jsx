import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductByCategory from '../pages/ProductByCategory';

function Sidebar() {
  const [open, setOpen] = useState(false);

  const categories = [
    { nameZh: '優惠商品', nameEn: 'hot-buys' },
    { nameZh: '新品推薦', nameEn: 'whats-new' },
    { nameZh: '線上獨家', nameEn: 'OnlineExclusive' },
    { nameZh: '速配商品', nameEn: 'QuickShip' },
    { nameZh: '線上同價專區', nameEn: 'hero-sameprice' },
    { nameZh: '食品飲料', nameEn: 'Food & Beverages' },
    { nameZh: '3C 科技', nameEn: '3C Technology' },
    { nameZh: '影音家電', nameEn: 'Audio & Video' },
    { nameZh: '保健美容', nameEn: 'Health & Beauty' },
    { nameZh: '日用母嬰', nameEn: 'Household-Baby-Toys' },
    { nameZh: '服飾時尚', nameEn: 'Fashion' },
    { nameZh: '家具餐廳', nameEn: 'Furniture & Dining' },
    { nameZh: '珠寶黃金', nameEn: 'Jewelry & Gold' },
    { nameZh: '運動戶外', nameEn: 'Sports & Outdoors' },
    { nameZh: '辦公文具', nameEn: 'Office Supplies' },
    { nameZh: '商業配送', nameEn: 'Business Delivery' },
    { nameZh: '賣場獨家商品', nameEn: 'Marketplace Exclusives' }
  ];

  return (
    <div>
      <button
        className="text-white bg-main px-4 py-2 rounded hover:bg-main-hover transition"
        onClick={() => setOpen(true)}
      >
        ☰ 全站分類
      </button>

      {/* 背景遮罩 */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* 側邊攔彈出區域 */}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 flex flex-col ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 border-b text-lg font-bold flex justify-between items-center bg-main text-white">
          商品分類
          <button
            onClick={() => setOpen(false)}
            className="text-white text-sm hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          <ul>
            {categories.map((cat, index) => (
              <Link
                to={`products/category/${cat.nameEn}`}
                state={{ categoryName: cat.nameZh }}
                onClick={() => setOpen(false)}
                key={index}
                className="block px-4 py-3 border-b hover:bg-gray-100 cursor-pointer text-primary text-sm"
              >
                {cat.nameZh}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
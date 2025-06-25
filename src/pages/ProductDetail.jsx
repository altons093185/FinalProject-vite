import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FiPlus, FiMinus, FiExternalLink } from "react-icons/fi";

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    // const [productRes, setProductRes] = useState(null);
    const [priceHistory, setPriceHistory] = useState([]);
    const [quantity, setQuantity] = useState(1);


    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const productRes = await axios.get(`http://localhost:8081/api/products/${productId}`);
    //     //   const historyRes = await axios.get(`http://localhost:8081/api/products/${productId}/history`);

    //       setProduct(productRes.data);
    //       setPriceHistory(historyRes.data);
    //     } catch (err) {
    //       console.error("載入產品資料錯誤:", err);
    //     }
    //   };
    //   fetchData();
    // }, [productId]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const productRes = await axios.get(`http://localhost:8081/api/products/${productId}`);
                // const historyRes = await axios.get(`http://localhost:8081/api/products/${productId}/history`);
                // await setProductRes(productRes.data);
                console.log(productRes.data.data);
                const nameFromApi = productRes.data.data.nameZh;

                const mockProduct = {
                    id: productRes.data.data.productId,
                    name: nameFromApi,
                    nameEn: productRes.data.data.nameEn,
                    description: [
                        "清新涼感，頭皮舒涼潔淨",
                        "薄荷精油，調理去油舒適涼爽",
                        "油性髮質、一般髮質適用",
                        "不含矽靈，洗後清爽蓬鬆",
                        "洋甘菊植研萃，淨透平衡",
                        "玻尿酸與胺基酸打造好髮質",
                        "頭皮油水平衡，髮絲清爽蓬鬆",
                        "無酒精、無色素、無Paraben"
                    ],
                    specTable: [
                        ["品名", "森歐黎漾 植研萃淨平衡涼感洗髮露 1200毫升"],
                        ["商品容量", "1200毫升"],
                        ["商品重量", "1.3公斤"],
                        ["成分", "WATER, AMMONIUM LAURETH SULFATE...（略）"],
                        ["使用方式", "頭髮淋濕後取適量搓揉起泡，用指腹按摩，再以清水沖洗。建議搭配同系列淨平衡極致護髮素使用。"],
                        ["保存方式", "存放陰涼處"],
                        ["保存期限", "3年 (商品依序出貨，所剩效期會較前述為短)"],
                        ["產地", "台灣"],
                        ["注意事項", "僅供外用，如不慎誤及眼睛請立即以清水沖洗。使用後如有不適，請諮詢醫師。"]
                    ],
                    imageUrl: "https://www.costco.com.tw" + productRes.data.data.imgUrl,
                    price: productRes.data.data.currentPrice,
                    unit: productRes.data.data.unitPrice,
                    externalUrl: "https://www.costco.com.tw/p/" + productId
                };
                const mockHistory = [
                    { date: "6/1", price: 599 },
                    { date: "6/5", price: 300 },
                    { date: "6/10", price: 599 },
                    { date: "6/15", price: 499 },
                    { date: "6/23", price: 499 }
                ];
                setProduct(mockProduct);
                setPriceHistory(mockHistory);
            } catch (err) {
                console.error("載入產品資料錯誤:", err);
            }
        };
        fetchData();
    }, [productId]);

    const handleAdd = () => setQuantity(q => Math.min(q + 1, 99));
    const handleMinus = () => setQuantity(q => Math.max(q - 1, 1));

    if (!product) return <div className="p-6">載入中...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 mt-12 pt-6">
            <h1 className="text-3xl font-bold text-[#55745A] mb-12">商品介紹</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-80 object-contain rounded border"
                />
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2 text-gray-800">{product.name}</h1>
                    <p className="text-1xl font-bold mb-2 text-gray-800">{product.nameEn}</p>
                    <p className="text-[#B92828] text-2xl font-bold">NT${product.price}</p>
                    <p className="text-sm text-gray-500 mb-4">{product.unit}</p>
                    <div className="flex items-center gap-2 mb-4 mt-32">
                        <button onClick={handleMinus} className="p-2 border rounded hover:bg-[#EEF1EE]">
                            <FiMinus />
                        </button>
                        <span className="px-4 font-semibold text-lg">{quantity}</span>
                        <button onClick={handleAdd} className="p-2 border rounded hover:bg-[#EEF1EE]">
                            <FiPlus />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-8">
                        <button className="bg-[#7C9B75] text-white px-6 py-2 rounded hover:bg-[#6C8864]">
                            加入購物車
                        </button>
                        <a href={product.externalUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-[#7C9B75] underline hover:text-[#6C8864]">
                            查看更多資訊 <FiExternalLink className="ml-1" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t pt-4">
                <h2 className="text-lg font-semibold mb-2">商品敘述</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    {product.description.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="border-t pt-4">
                <h2 className="text-lg font-semibold mb-2">商品規格</h2>
                <table className="table-auto w-full text-sm text-left border rounded">
                    <tbody>
                        {product.specTable.map(([key, value], i) => (
                            <tr key={i} className="border-b">
                                <td className="font-medium px-4 py-2 text-white bg-[#7C9B75] w-32 align-top">{key}</td>
                                <td className="px-4 py-2 text-gray-700 whitespace-pre-wrap">{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="border-t pt-4">
                <h2 className="text-lg font-semibold mb-2">價格走勢</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={priceHistory}>
                        <XAxis dataKey="date" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip />
                        <Line type="stepAfter" dataKey="price" stroke="#55745A" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
export default ProductDetail;

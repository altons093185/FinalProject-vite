import { useLocation, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";


function ProductByCategory() {
    const { nameEn } = useParams();
    const location = useLocation();
    const categoryNameZh = location.state.categoryName;
    const API_URL = "http://localhost:8081/api/products/category";


    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/${nameEn}`);
            // console.log("Fetched products:", response.data.data);
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, [nameEn]);

    return (
        <div className="bg-[#F6F5F3] min-h-screen px-4 pt-24 pb-8 text-[#3E3A39]">
            <div className="py-8">
                <Search />
            </div>

            <h1 className="text-2xl font-bold mb-6 text-center">分類：{categoryNameZh}</h1>

            <div className="max-w-8xl mx-auto px-16">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.productId} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductByCategory;
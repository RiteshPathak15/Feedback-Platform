import React, { useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const allProducts = [
    {
      id: 1,
      image: "https://via.placeholder.com/100",
      brand: "eos",
      name: "EOS strawberry sorbet lip balm",
      category: "Lip Care",
      rating: 4.2,
      reviews: 158883,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/100",
      brand: "Maybelline",
      name: "Maybelline FIT ME! Matte +...",
      category: "Makeup",
      rating: 4.4,
      reviews: 154538,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/100",
      brand: "Neutrogena",
      name: "Neutrogena Fragrance-Free...",
      category: "Skincare",
      rating: 4.5,
      reviews: 131738,
    },
    {
      id: 4,
      image: "https://via.placeholder.com/100",
      brand: "Too Faced",
      name: "Mini Better Than Sex Volumizing...",
      category: "Makeup",
      rating: 4.4,
      reviews: 125787,
    },
  ];

  const categories = ["All Products", "Lip Care", "Makeup", "Skincare"];

  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [products, setProducts] = useState(allProducts);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All Products") {
      setProducts(allProducts);
    } else {
      setProducts(
        allProducts.filter((product) => product.category === category)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-6 border-r border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Filter by Category
          </h2>
          <ul className="space-y-4">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => handleCategoryChange(category)}
                className={`cursor-pointer text-gray-600 hover:text-gray-900 transition ${
                  selectedCategory === category ? "font-bold text-gray-900" : ""
                }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Products Grid */}
        <div className="w-3/4 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Products</h2>
            <p className="text-gray-500">{products.length} result(s)</p>
          </div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link to={`/Products/${product.id}`} key={product.id}>
                  <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-contain mb-4"
                    />
                    <h3 className="text-sm text-gray-500">{product.brand}</h3>
                    <p className="text-md font-medium text-gray-800 truncate mb-3">
                      {product.name}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2 text-yellow-500 font-bold">
                        {product.rating} ★
                      </span>
                      <span>({product.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

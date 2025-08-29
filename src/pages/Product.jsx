import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);

        const response2 = await fetch(`https://fakestoreapi.com/products/category/${data.category}`);
        const data2 = await response2.json();
        setSimilarProducts(data2);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <Skeleton height={400} />
          </div>
          <div className="flex-1 space-y-4">
            <Skeleton height={30} width={250} />
            <Skeleton height={90} />
            <Skeleton height={40} width={70} />
            <Skeleton height={50} width={110} />
            <Skeleton height={120} />
            <div className="flex space-x-4">
              <Skeleton height={40} width={110} />
              <Skeleton height={40} width={110} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    const priceInRupees = (product.price * 85).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          <div className="flex-1 w-full lg:w-1/2">
            <img
              className="w-full h-auto object-contain rounded-lg shadow-lg"
              src={product.image}
              alt={product.title}
            />
          </div>
          <div className="flex-1 w-full lg:w-1/2 space-y-4">
            <h4 className="text-sm font-semibold text-gray-500 uppercase">{product.category}</h4>
            <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
            <div className="flex items-center space-x-2 text-yellow-500">
              <span className="text-xl font-bold">{product.rating && product.rating.rate}</span>
              <i className="fa fa-star"></i>
              <span className="text-gray-500 text-sm">({product.rating && product.rating.count} reviews)</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{priceInRupees}</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            <div className="flex space-x-4 mt-8">
              <button
                className="bg-gray-900 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 hover:bg-gray-700"
                onClick={() => console.log("Added to Cart:", product)}
              >
                Add to Cart
              </button>
              <Link to="/cart" className="bg-white text-gray-900 font-semibold py-3 px-6 rounded-full border-2 border-gray-900 transition-colors duration-200 hover:bg-gray-900 hover:text-white">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <div className="my-8">
        <h2 className="text-3xl font-bold text-center mb-8">You may also Like</h2>
        <div className="flex space-x-6 overflow-x-auto p-4 scrollbar-hide">
          {similarProducts.map((item) => {
            const priceInRupees = (item.price * 85).toLocaleString('en-IN', {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            });
            
            return (
              <div key={item.id} className="flex-none w-64 bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <Link to={`/product/${item.id}`} onClick={() => window.scrollTo(0, 0)}>
                  <div className="relative h-64 p-4">
                    <img
                      className="w-full h-full object-contain"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h5 className="text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">{item.title}</h5>
                    <div className="text-xl font-bold mt-2">{priceInRupees}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {loading ? <Loading /> : <ShowProduct />}
        {!loading && <ShowSimilarProduct />}
      </div>
    </>
  );
};

export default Product;
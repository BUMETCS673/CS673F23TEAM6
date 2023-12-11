import { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Marketplace() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/products?search=${params.get(
            'search'
          )}&location=${params.getAll('location')}&category=${params.getAll(
            'category'
          )}&min_price=${params.get('min_price')}&max_price=${params.get(
            'max_price'
          )}&sortBy=${params.get('sortBy')}`
        );
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [window.location.search]);

  return (
    <div>
      {loading ? (
        <section className="flex flex-col items-center justify-center w-full pb-40 mx-auto gap-x-5 gap-y-10 max-w-7xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>

          <p className="text-center">getting products...</p>
        </section>
      ) : (
        <section className="grid w-full grid-cols-1 pb-40 mx-auto gap-x-5 gap-y-10 max-w-7xl md:grid-cols-3 ">
          {products?.length > 0 ? (
            products?.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </section>
      )}
    </div>
  );
}

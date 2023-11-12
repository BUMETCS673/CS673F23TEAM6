import { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NO_POST_FOUND_MESSAGE = "We're sorry. We cannot find what you're looking for";
const LOADING_POST_MESSAGE = "Just a bit. We are looking for your interests ...";

export default function Marketplace() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return; // Return early to prevent further execution
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/products?search=${params.get(`search`)');
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally { // Use "finally" to ensure loading is set to false regardless of success or error.
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate, window.location.search]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/products?search=${params.get(`search`)');
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate, window.location.search]);

  
  // TODO: We could extract this loadingPost to another .js
  const loadingPost = (
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

          <p className="text-center">{LOADING_POST_MESSAGE}</p>
        </section>
  );

  const listingPost = (
        <section className="grid w-full grid-cols-1 pb-40 mx-auto gap-x-5 gap-y-10 max-w-7xl md:grid-cols-3 ">
          {products.length > 0 ? (
            products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))
          ) : (
            <p className="text-center">{NO_POST_FOUND_MESSAGE}</p>
          )}
        </section>
  )

  return ( // Keep return clean as much as possible
    <div>
      {loading ? ( loadingPost ) : ( listingPost )}
    </div>
  );
}

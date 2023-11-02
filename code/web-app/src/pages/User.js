import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCardProfile from '../Components/ProductCardProfile';
const User = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/users/${params?.id}`
        );
        setUser(res.data?.user);
        setProducts(res.data?.posts);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [params]);
  return (
    <div>
      <div className="p-16">
        <div className="p-8 mt-24 bg-white shadow">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid order-last grid-cols-3 mt-20 text-center md:order-first md:mt-0">
              <div>
                <p className="text-xl font-bold text-gray-700">
                  {products?.length}
                </p>
                <p className="text-gray-400">
                  {products?.length === 1 ? 'Post' : 'Posts'}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-x-0 top-0 flex items-center justify-center w-48 h-48 mx-auto -mt-24 text-indigo-500 bg-indigo-100 rounded-full shadow-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 h-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="pb-12 mt-20 text-center border-b">
            <h1 className="text-4xl font-medium text-gray-700">{user?.name}</h1>
            <p className="mt-3 font-light text-gray-600">{user?.email}</p>
            <p className="mt-8 text-gray-500">{user?.bio}</p>
          </div>
          <div className="flex flex-col justify-center mt-12">
            <section className="grid w-full grid-cols-1 pb-40 mx-auto gap-x-5 gap-y-10 max-w-7xl md:grid-cols-3 ">
              {products?.length > 0 &&
                products?.map((product, i) => (
                  <ProductCardProfile key={i} product={product} />
                ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

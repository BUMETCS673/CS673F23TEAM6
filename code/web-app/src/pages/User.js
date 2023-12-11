import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import EditProfileModal from '../Components/EditProfileModal';
import ProductCardProfile from '../Components/ProductCardProfile';

const User = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `/api/users/user`
        );
        setUser(res.data?.user);
        setProducts(res.data?.posts);
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEditSubmit = async (formData) => {
    //TODO: Update user details
  };

  return (
    <div>
      <div className="p-16">
        <div className="p-8 mt-24 bg-white shadow">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid order-last grid-cols-3 mt-20 text-center md:order-first md:mt-0">
              <div className="flex items-center justify-center">
                <div className="flex flex-col justify-center">
                  <p className="text-xl font-bold text-gray-700">
                    {products?.length}
                  </p>
                  <p className="text-gray-400">
                    {products?.length === 1 ? 'Post' : 'Posts'}
                  </p>
                </div>
                {JSON.parse(localStorage.getItem('user')).id ===
                user?.id ? null : (
                  <Link
                    to={`/chat/${params?.id}`}
                    className="flex flex-col items-center justify-center w-12 h-12 ml-4 text-indigo-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                    Chat
                  </Link>
                )}
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
            <div className="flex justify-between items-center">
            <h1 className="text-4xl font-medium text-gray-700">{user?.name}</h1>
            <button 
              onClick={() => setShowEditModal(true)}
              className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
            >
              Edit Profile
            </button>
            </div>
            <p className="mt-3 font-light text-gray-600">{user?.email}</p>
            <p className="mt-8 text-gray-500">{user?.bio}</p>
            <EditProfileModal
              isVisible={showEditModal}
              onClose={() => setShowEditModal(false)}
              onSubmit={handleEditSubmit}
              user={user}
            />
          </div>
          <div className="flex flex-col justify-center mt-12">
            <section className="grid w-full grid-cols-1 pb-40 mx-auto gap-x-5 gap-y-10 max-w-7xl md:grid-cols-3">
              {products?.length > 0 &&
                products?.map((product) => (
                  <ProductCardProfile key={product.id} product={product} />
                ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

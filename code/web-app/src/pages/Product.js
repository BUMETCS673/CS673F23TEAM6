import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Product = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8000/products/${params?.id}`
        );
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchProduct();
  }, [params]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Authorization token is missing.');
        return;
      }

      await axios.delete(`http://localhost:8000/products/${params?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/marketplace');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto mb-80">
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
        </section>
      ) : (
        <>
          {' '}
          <h1 className="flex flex-col items-start mt-6 mb-5 text-3xl font-semibold tracking-wide">
            <button className="pb-3" onClick={() => navigate('/marketplace')}>
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
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </button>
            <span>{product?.title}</span>
          </h1>
          <div className="items-center px-4 py-8 mx-auto rounded-xl">
            <div className="grid grid-cols-4 grid-rows-2 gap-2 p-1 rounded-2xl">
              <img
                alt={product?.title}
                className="object-cover w-full h-full col-span-2 row-span-2"
                src={product?.images?.[0]}
              />
              {product?.images
                ?.slice(1, product?.images?.length)
                .map((image, i) => (
                  <img
                    alt=""
                    className="object-cover w-full h-full"
                    src={image}
                    key={i}
                  />
                ))}
            </div>
          </div>
          <div className="flex justify-between mx-auto mt-5">
            {/* description */}
            <div className="w-2/3 h-full">
              <p className="mx-2 mt-2 text-gray-600 break-words">
                {product?.description}
              </p>
            </div>
            <div className="flex items-center justify-center w-1/4 h-20 mx-2 text-2xl font-semibold text-center border rounded-xl">
              Price: $ {product?.price}
              {product?.authorId ===
                JSON.parse(localStorage.getItem('user'))?.id && (
                <button
                  onClick={() => {
                    window.confirm(
                      'Are you sure you wish to delete this item?'
                    ) && handleDelete();
                  }}
                  className="px-4 py-2 mx-2 text-red-500 rounded-xl "
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
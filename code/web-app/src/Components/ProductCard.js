import { Link } from 'react-router-dom';
import { categories, location } from '../utils';

export default function ProductCard({ product }) {
  return (
    <div className="h-full overflow-hidden rounded-lg cursor-pointer group hover:shadow">
      <div className="w-full h-full">
        <Link to={`/product/${product?.id}`}>
          <img
            alt={product?.title}
            src={product?.images[0]}
            className="object-cover w-full transition duration-150 ease-in-out max-h-72 group-hover:scale-105 "
          />
        </Link>
        <div className="w-full h-full p-4 bg-white">
          <p className="text-2xl font-medium text-gray-600 break-words">
            <Link to={`/product/${product?.id}`}>{product?.title}</Link>
          </p>
          <p className="text-sm text-gray-500">
            {product?.price === 0 ? (
              <span className="text-green-500">Free</span>
            ) : (
              <span>${product?.price}</span>
            )}
          </p>
          <p className="flex items-center justify-start mt-2 gap-x-2 ">
            <span className="px-2 bg-gray-200 rounded-xl">
              {
                categories?.find((cat) => cat.value === product?.category)
                  ?.label
              }
            </span>
            <span className="flex items-center px-2 bg-gray-200 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>{' '}
              {location?.find((loc) => loc.value === product?.location)?.label}
            </span>
          </p>

          <p className="font-light text-gray-600 break-words text-md">
            {product?.description?.length > 50 ? (
              <span>{product?.description?.substring(0, 50)}...</span>
            ) : (
              <span>{product?.description}</span>
            )}
            <Link to={`/product/${1}`} className="inline-flex text-blue-500">
              read more
            </Link>
          </p>
          <div className="my-2 border-t-1"></div>

          <div className="flex items-center ">
            <div className="">
              <div className="font-medium">
                by
                <Link className="pl-2" to={`/user/${product?.authorId}`}>
                  {product?.author?.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

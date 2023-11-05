import { Link } from 'react-router-dom';

export default function ProductCardProfile({ product }) {
  return (
    <div className="overflow-hidden border rounded-lg cursor-pointer group hover:shadow ">
      <div className="w-full h-full ">
        <Link to={`/product/${product?.id}`}>
          <img
            alt={product?.title}
            src={product?.images[0]}
            className="object-cover w-full transition duration-150 ease-in-out max-h-72 group-hover:scale-105 "
          />
        </Link>
        <div className="w-full p-4 bg-white">
          <p className="text-2xl font-medium text-gray-600 break-words">
            <Link to={`/product/${product?.id}`}>{product?.title}</Link>
          </p>

          <p className="font-light text-gray-600 break-words text-md">
            {product?.description?.length > 100 ? (
              <span>{product?.description?.substring(0, 100)}...</span>
            ) : (
              <span>{product?.description}</span>
            )}
            <Link to={`/product/${1}`} className="inline-flex text-blue-500">
              read more
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

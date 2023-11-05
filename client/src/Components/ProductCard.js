import { Link } from 'react-router-dom';

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

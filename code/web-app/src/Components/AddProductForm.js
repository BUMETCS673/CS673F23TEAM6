import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { categories, location } from '../utils';
const AddProductForm = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    title: JSON.parse(localStorage.getItem('productData'))?.title || '',
    description:
      JSON.parse(localStorage.getItem('productData'))?.description || '',
    price: JSON.parse(localStorage.getItem('productData'))?.price || '',
    images: JSON.parse(localStorage.getItem('productData'))?.images || [],
    authorId: JSON.parse(localStorage.getItem('user'))?.id,
    location: JSON.parse(localStorage.getItem('productData'))?.location || '',
    category: JSON.parse(localStorage.getItem('productData'))?.category || '',
  });
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      await fetch('/api/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setLoading(false);
      localStorage.removeItem('productData');
      onClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUploadImage = async (e) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadLoading(true);

      await axios
        .post('/api/products/create', formData)
        .then((res) => {
          console.log(res.data);
          setData({ ...data, images: [...data.images, res.data?.url] });
          setFile(null);
          setUploadLoading(false);
        })
        .catch((err) => {
          console.log('err', err);
          setUploadLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // save data to local storage
    localStorage.setItem('productData', JSON.stringify(data));
  }, [data]);

  return (
    <Card className="flex flex-col items-center justify-center mx-auto max-w-7xl md:flex-row">
      <div className="max-w-4xl p-4 ">
        <label htmlFor="img-upload">
          <div className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
            <div className="flex flex-col items-center justify-center space-y-3">
              <span className="flex items-center justify-center w-10 h-10 bg-white border rounded-full border-stroke dark:border-strokedark dark:bg-boxdark">
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
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </span>
              <p>
                <span className="text-black">Click to select images</span>{' '}
              </p>
              <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
            </div>
          </div>
          <input
            id="img-upload"
            type="file"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          {file && (
            <div className="py-2 text-sm text-gray-500">
              {file?.name}{' '}
              <button
                disabled={uploadLoading}
                className="p-2 rounded-md"
                onClick={() => handleUploadImage()}
              >
                {uploadLoading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500 animate-spin"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-green-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
        </label>

        {data?.images?.length > 0 && (
          <div className="flex flex-wrap items-start justify-start gap-2 py-2">
            {data?.images?.map((image, id) => (
              <div
                key={id}
                className="flex flex-col items-center bg-gray-200 rounded-2xl"
              >
                {' '}
                <img
                  alt="product"
                  key={id}
                  className="object-cover w-24 h-24 rounded-2xl"
                  src={image}
                />
                <button
                  onClick={() => {
                    setData({
                      ...data,
                      images: data.images.filter((img) => img !== image),
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 m-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>{' '}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="max-w-5xl w-[480px] mx-auto">
        <CardBody className="overflow-hidden">
          <form className="flex flex-col gap-4">
            <Input
              isRequired
              label="Title"
              placeholder="Enter title of your product"
              type="text"
              autoFocus
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <Textarea
              isRequired
              label="Description"
              placeholder="Enter description of your product"
              type="text"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
            <Input
              isRequired
              label="Price ($)"
              placeholder="Enter price of your product"
              type="number"
              value={data.price}
              onChange={(e) =>
                setData({ ...data, price: Number(e.target.value) })
              }
            />
            <div className="flex items-center justify-between gap-2">
              <Select label="Select category" className="max-w-xs">
                {categories.map((cat) => (
                  <SelectItem
                    onClick={() => setData({ ...data, category: cat.value })}
                    key={cat.value}
                    value={cat.value}
                  >
                    {cat.label}
                  </SelectItem>
                ))}
              </Select>
              <Select label="Select location" className="max-w-xs">
                {location.map((loc) => (
                  <SelectItem
                    onClick={() => setData({ ...data, location: loc.value })}
                    key={loc.value}
                    value={loc.value}
                  >
                    {loc.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                disabled={
                  loading || !data.title || !data.description || !data.price
                }
                onClick={() => handleSubmit()}
                className="p-2 px-5 text-black bg-[#8A8787] rounded-3xl"
              >
                Publish
              </button>
            </div>
          </form>
        </CardBody>
      </div>
    </Card>
  );
};

export default AddProductForm;

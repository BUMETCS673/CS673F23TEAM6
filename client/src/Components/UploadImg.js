import UploadWidget from './Upload';
export default function UploadImage({ images, setImages, error, updateError }) {
  const handleOnUpload = (error, result) => {
    if (error) {
      updateError(error);
      // eslint-disable-next-line no-undef
      widget.close({
        quiet: true,
      });
      return;
    }

    // console.log('UPLOADTYPE', window.localStorage.getItem('uploadType'));

    if (window.localStorage.getItem('uploadType') === 'add') {
      setImages((prevState) => ({
        ...prevState,
        images: result?.info?.secure_url,
      }));
      window.localStorage.setItem('uploadType', null);
    } else if (window.localStorage.getItem('uploadType') === 'replace') {
      const replaceIndex = window.localStorage.getItem('replaceIndex');

      // console.log('REPLACEINDEX', replaceIndex);

      setImages((prevState) => {
        const newImages = [...prevState.more];
        newImages[replaceIndex] = result?.info?.secure_url;
        return {
          ...prevState,
          more: newImages,
        };
      });

      window.localStorage.setItem('replaceIndex', null);
      window.localStorage.setItem('uploadType', null);
    }
  };
  // console.log('images', images);
  return (
    <div className="bg-white border rounded-xl border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="col-span-5 xl:col-span-2">
        <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-4 border-b border-stroke px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Product Images
            </h3>
          </div>
          <div className="p-3">
            <form action="#">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="flex flex-col items-center justify-center mb-5 ">
                  {images.cover && (
                    <div className="relative flex flex-col items-center justify-center mb-5 group">
                      <img
                        className="object-cover transition-all duration-300 ease-in-out rounded-md cursor-pointer group-hover:opacity-50"
                        src={images.cover}
                        style={{
                          height: 250,
                          width: 380,
                        }}
                      />
                      <div className="absolute flex items-center gap-3 transition-all duration-300 ease-in-out transform -translate-x-1/2 -translate-y-1/2 opacity-0 left-1/2 top-1/2 group-hover:opacity-100">
                        <button
                          className="flex items-center justify-center w-8 h-8 text-white rounded-full outline-none"
                          onClick={() => {
                            setImages((prevState) => ({
                              ...prevState,
                              cover: '',
                            }));
                          }}
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
                        <div className="flex items-center justify-center w-8 h-8 text-white rounded-full outline-none ">
                          {' '}
                          <UploadWidget onUpload={handleOnUpload}>
                            {({ open }) => {
                              const handleOnClick = async (e, type) => {
                                e.preventDefault();
                                if (type === 'cover') {
                                  console.log('cover');
                                  window.localStorage.setItem(
                                    'uploadType',
                                    'cover'
                                  );
                                }

                                open();
                              };

                              return (
                                <>
                                  <button
                                    onClick={(e) => {
                                      handleOnClick(e, 'cover');
                                    }}
                                    className="w-full"
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
                                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                                      />
                                    </svg>
                                  </button>
                                </>
                              );
                            }}
                          </UploadWidget>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 md:grid-cols-3 ">
                    {images?.more?.length > 0 &&
                      images?.more?.map((img, id) => (
                        <div
                          key={id}
                          className="relative flex flex-col items-center justify-center mb-5 group"
                        >
                          <img
                            className="object-cover w-40 h-40 transition-all duration-300 ease-in-out rounded-md cursor-pointer group-hover:opacity-50"
                            src={img}
                          />
                          <div className="absolute flex items-center gap-3 transition-all duration-300 ease-in-out transform -translate-x-1/2 -translate-y-1/2 opacity-0 left-1/2 top-1/2 group-hover:opacity-100">
                            <button
                              className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full outline-none"
                              onClick={() => {
                                setImages((prevState) => ({
                                  ...prevState,
                                  more: images.more.filter(
                                    (image) => image !== img
                                  ),
                                }));
                              }}
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
                            <div className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full outline-none ">
                              {' '}
                              <UploadWidget onUpload={handleOnUpload}>
                                {({ open }) => {
                                  const handleOnClick = async (e, type) => {
                                    e.preventDefault();
                                    if (type === 'replace') {
                                      console.log('replace');
                                      window.localStorage.setItem(
                                        'uploadType',
                                        'replace'
                                      );
                                      window.localStorage.setItem(
                                        'replaceIndex',
                                        images.more.indexOf(img)
                                      );
                                    }

                                    open();
                                  };

                                  return (
                                    <>
                                      <button
                                        onClick={(e) => {
                                          handleOnClick(e, 'replace');
                                        }}
                                        className="w-full"
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
                                            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                                          />
                                        </svg>
                                      </button>
                                    </>
                                  );
                                }}
                              </UploadWidget>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {images.cover && (
                    <>
                      <p className="text-black dark:text-white">
                        Uploaded On {new Date().toDateString()}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <UploadWidget onUpload={handleOnUpload}>
                {({ open }) => {
                  const handleOnClick = async (e, type) => {
                    e.preventDefault();
                    if (type === 'cover') {
                      console.log('cover');
                      window.localStorage.setItem('uploadType', 'cover');
                    } else {
                      console.log('more');
                      window.localStorage.setItem('uploadType', 'more');
                    }

                    open();
                  };

                  return (
                    <>
                      {!images.cover && (
                        <button
                          onClick={(e) => {
                            handleOnClick(e, 'cover');
                          }}
                          className="w-full"
                        >
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
                                <span className="text-primary">
                                  Click to upload cover image
                                </span>{' '}
                              </p>
                              <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                              <p>
                                ( Please check the size of the image before
                                uploading. )
                              </p>
                            </div>
                          </div>
                        </button>
                      )}
                      {images.cover && (
                        <button
                          onClick={(e) => {
                            handleOnClick(e, 'more');
                          }}
                          className="w-full"
                        >
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
                                <span className="text-primary">
                                  Click to upload more images
                                </span>{' '}
                              </p>
                              <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                              <p>
                                ( Please check the size of the image before
                                uploading.)
                              </p>
                            </div>
                          </div>
                        </button>
                      )}
                    </>
                  );
                }}
              </UploadWidget>
              {error && (
                <div className="mt-2 text-sm text-red-500">{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

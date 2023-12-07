import Logo from '../Assets/Logo.png';
import { useRef, useEffect, useState, Fragment } from 'react';
import Login from '../pages/auth/Login';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  CheckboxGroup,
  Checkbox,
  Slider as PriceSlider,
  Accordion,
  AccordionItem,
  RadioGroup,
  Radio,
  Badge,
} from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/react';
import Register from '../pages/auth/Register';
import { Link, useNavigate } from 'react-router-dom';
import AddProductForm from './AddProductForm';
import { Disclosure, Transition } from '@headlessui/react';
import { categories, location } from '../utils';
import ContactUs from '../pages/contact';
import About from '../pages/about';

const LoginPopup = ({ isOpen, onOpenChange }) => (
  <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader></ModalHeader>
          <Tabs aria-label="Options" className="p-2 px-5" fullWidth>
            <Tab key="login" title="Login">
              <ModalBody>
                <Login onClose={onClose} />
              </ModalBody>
            </Tab>
            <Tab key="join-us" title="Join Us">
              <ModalBody>
                <Register onClose={onClose} />
              </ModalBody>
            </Tab>
          </Tabs>
        </>
      )}
    </ModalContent>
  </Modal>
);

const ProductPopup = ({ isOpen, onOpenChange }) => (
  <Modal
    size="3xl"
    isOpen={isOpen}
    placement="center"
    onOpenChange={onOpenChange}
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>
            <h1 className="flex items-center gap-2 pb-2 text-3xl font-semibold text-gray-800 ">
              Publish your Product
            </h1>
          </ModalHeader>
          <ModalBody className="w-full">
            <AddProductForm onClose={onClose} />
          </ModalBody>
        </>
      )}
    </ModalContent>
  </Modal>
);

const AboutPopup = ({ isOpen, onOpenChange }) => (
  <Modal 
    size = "xl"
    isOpen={isOpen} 
    placement="center" 
    onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <About onClose={onClose} />
          </ModalBody>
        </>
      )}
    </ModalContent>
  </Modal>
);

const ContactPopup = ({ isOpen, onOpenChange }) => (
  <Modal 
    size = "3xl"
    isOpen={isOpen} 
    placement="center" 
    onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>
            <h1 className="flex items-center gap-2 pb-2 text-3xl font-semibold text-gray-800 ">
              Contact Us
            </h1>

          </ModalHeader>
          <ModalBody>
            <ContactUs onClose={onClose} />
          </ModalBody>

        </>
      )}
    </ModalContent>
  </Modal>
);

function Searchbar() {
  const [searchParams, setSearchParams] = useState({
    search: '',
    location: '',
    category: '',
    sortBy: '',
    min_price: '',
    max_price: '',
  });
  const [search, setSearch] = useState(searchParams.search);

  const [price, setPrice] = useState(
    parseInt(searchParams.min_price) && parseInt(searchParams.max_price)
      ? [parseInt(searchParams.min_price), parseInt(searchParams.max_price)]
      : [0, 1000]
  );

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setSearchParams({
      search: params.get('search') || '',
      location: params.getAll('location') || '',
      category: params.getAll('category') || '',
      sortBy: params.get('sortBy') || '',
      min_price: params.get('min_price') || '',
      max_price: params.get('max_price') || '',
    });

    setPrice([
      parseInt(params.get('min_price')) || 0,
      parseInt(params.get('max_price')) || 1000,
    ]);
  }, [window.location.search]);

  const handleSlider = (value) => {
    setPrice(value);
  };

  const handleChageCommit = (value) => {
    const [minPrice, maxPrice] = value;
    const params = new URLSearchParams(window.location.search);
    params.set('min_price', minPrice.toString());
    params.set('max_price', maxPrice.toString());
    navigate(`/marketplace?${params.toString()}`, { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    params.set('search', search);
    navigate(`/marketplace?${params.toString()}`, { replace: true });
  };

  const handleAddLocation = (value) => {
    const params = new URLSearchParams(window.location.search);
    const locations = params.getAll('location');

    const locationExists = locations.includes(value);

    if (locationExists) {
      const updatedLocations = locations.filter((loc) => loc !== value);
      params.delete('location');
      updatedLocations.forEach((loc) => params.append('location', loc));
    } else {
      params.append('location', value);
    }

    navigate(`/marketplace?${params.toString()}`, { replace: true });
  };

  const handleAddCategories = (value) => {
    const params = new URLSearchParams(window.location.search);
    const categories = params.getAll('category');

    const categoryExists = categories.includes(value);

    if (categoryExists) {
      const updatedCategories = categories.filter((cat) => cat !== value);
      params.delete('category');
      updatedCategories.forEach((cat) => params.append('category', cat));
    } else {
      params.append('category', value);
    }

    navigate(`/marketplace?${params.toString()}`, { replace: true });
  };

  const handleSortBy = (value) => {
    const params = new URLSearchParams(window.location.search);
    params.set('sortBy', value);
    navigate(`/marketplace?${params.toString()}`, { replace: true });
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete('location');
    params.delete('category');
    params.delete('sortBy');
    params.delete('min_price');
    params.delete('max_price');
    setSearch('');
    params.set('search', '');

    navigate(`/marketplace?${params.toString()}`, { replace: true });
  };

  const getSearchParamsCount = () => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(
      params.getAll('location').length +
        params.getAll('category').length +
        (params.get('sortBy') ? 1 : 0) +
        (params.get('min_price') ? 1 : 0) +
        (params.get('max_price') ? 1 : 0)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="ml-[10rem]">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only "
      >
        Search
      </label>
      <div className="relative w-[30rem]">
        <Disclosure>
          <div className="absolute  bottom-2.5">
            {getSearchParamsCount() > 0 ? (
              <Badge size="sm" content={getSearchParamsCount()} color="default">
                <Disclosure.Button className="ml-2  bg-[#8a8787]   focus:ring-0 focus:outline-none  font-medium rounded-full text-sm px-3 py-2 ">
                  Filters
                </Disclosure.Button>
              </Badge>
            ) : (
              <Disclosure.Button className="ml-2  bg-[#8a8787]   focus:ring-0 focus:outline-none  font-medium rounded-full text-sm px-3 py-2 ">
                Filters
              </Disclosure.Button>
            )}
          </div>
          <Disclosure.Panel className="text-gray-500 ">
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="absolute right-0 z-10 w-full mt-2 origin-top-left bg-white rounded-md shadow-lg top-10 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {getSearchParamsCount() > 0 && (
                  <span
                    onClick={() => {
                      handleClearFilters();
                      // close the dropdown
                      document.querySelector('[aria-expanded="true"]').click();
                    }}
                    className="px-4 text-sm text-left text-gray-700 cursor-pointer hover:text-gray-900 hover:underline"
                  >
                    Clear Filters
                  </span>
                )}
                <div className="flex flex-col px-4 pb-4 gap-y-3">
                  <Accordion>
                    <AccordionItem
                      key="1"
                      aria-label="Categories"
                      title="Categories"
                    >
                      <CheckboxGroup
                        color="default"
                        defaultValue={
                          searchParams.category ? searchParams.category : []
                        }
                      >
                        {categories.map((category) => (
                          <Checkbox
                            onClick={() => handleAddCategories(category.value)}
                            key={category.id}
                            value={category.value}
                          >
                            {category.label}
                          </Checkbox>
                        ))}
                      </CheckboxGroup>
                    </AccordionItem>
                    <AccordionItem
                      key="2"
                      aria-label="Location"
                      title="Location"
                    >
                      <CheckboxGroup
                        color="default"
                        defaultValue={
                          searchParams.location ? searchParams.location : []
                        }
                      >
                        {location.map((loc) => (
                          <Checkbox
                            onClick={() => handleAddLocation(loc.value)}
                            key={loc.id}
                            value={loc.value}
                          >
                            {loc.label}
                          </Checkbox>
                        ))}
                      </CheckboxGroup>
                    </AccordionItem>
                    <AccordionItem
                      key="3"
                      aria-label="Sort by Price"
                      title="Sort by Price"
                    >
                      <RadioGroup
                        color="default"
                        defaultValue={
                          searchParams.sortBy ? searchParams.sortBy : ''
                        }
                      >
                        <Radio
                          key="asc"
                          value="asc"
                          onClick={() => handleSortBy('asc')}
                        >
                          Lowest Price (Ascending)
                        </Radio>
                        <Radio
                          key="desc"
                          value="desc"
                          onClick={() => handleSortBy('desc')}
                        >
                          Highest Price (Descending)
                        </Radio>
                      </RadioGroup>
                    </AccordionItem>
                  </Accordion>

                  <PriceSlider
                    size="sm"
                    color="foreground"
                    showTooltip={true}
                    label="Price Range"
                    step={1}
                    minValue={0}
                    maxValue={1000}
                    formatOptions={{ style: 'currency', currency: 'USD' }}
                    className="max-w-md"
                    onChangeEnd={(value) => {
                      handleChageCommit(value);
                    }}
                    onChange={(value) => {
                      handleSlider(value);
                    }}
                    value={price}
                    tooltipValueFormatOptions={{
                      style: 'currency',
                      currency: 'USD',
                    }}
                  />
                </div>
              </div>
            </Transition>
          </Disclosure.Panel>
        </Disclosure>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="default-search"
          className="block w-full p-4 pl-20 pr-10 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-3xl focus:ring-0 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-offset-0 focus:ring-offset-transparent focus:ring-tea"
          placeholder="Search"
        />

        <button
          type="submit"
          className="ml-4 absolute right-3.5 bottom-2.5  focus:ring-0 focus:outline-none   font-medium rounded-full text-sm  py-2 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const userRef = useRef(null);
  const {
    isOpen: isloginOpen,
    onOpen: onloginOpen,
    onOpenChange: onLoginOpenChange,
  } = useDisclosure();
  const {
    isOpen: isaboutOpen,
    onOpen: onaboutOpen,
    onOpenChange: onaboutOpenChange,
  } = useDisclosure();
  const {
    isOpen: iscontactOpen,
    onOpen: oncontactOpen,
    onOpenChange: oncontactOpenChange,
  } = useDisclosure();

  const {
    isOpen: isProductOpen,
    onOpen: onProductOpen,
    onOpenChange: onProductOpenChange,
  } = useDisclosure();
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    navigate('/', { replace: true });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    userRef.current = null;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setUser(JSON.parse(user));
      userRef.current = JSON.parse(user);
    }
  }, [setUser, userRef, localStorage.getItem('user')]);
  return (
    <nav>
      <div className="nav-logo-container">
        <div className="flex items-center ">
          <Link to="/" className="w-full">
            <img src={Logo} alt="" className="w-56 h-56" />
          </Link>
          {user && <Searchbar />}
        </div>
      </div>
      <div className="navbar-links-container">
        {!user && (
          <Link to="/" onClick={() => scrollToSection('home')}>
            Home
          </Link>
        )}
        {!user && (
          <a onClick={onaboutOpen}>
            About
          </a>
        )}
        {!user && (
          <a onClick={oncontactOpen}>
            Contact
          </a>
        )}

        {user && <Link to="/marketplace?search=">Marketplace</Link>}

        {!user && (
          <button onClick={onloginOpen} className="primary-button">
            Log-in
          </button>
        )}
        {user && (
          <button onClick={onProductOpen} className="primary-button">
            Create +
          </button>
        )}
        {user && (
          <button
            onClick={() => handleLogout()}
            className="mx-2 primary-button"
          >
            Logout
          </button>
        )}
        <LoginPopup isOpen={isloginOpen} onOpenChange={onLoginOpenChange} />
        <ProductPopup
          isOpen={isProductOpen}
          onOpenChange={onProductOpenChange}
        />
        <ContactPopup isOpen={iscontactOpen} onOpenChange={oncontactOpenChange} />
        <AboutPopup isOpen={isaboutOpen} onOpenChange={onaboutOpenChange} />
      </div>
    </nav>
  );
};

export default Navbar;

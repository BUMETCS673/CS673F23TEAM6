import Logo from '../Assets/Logo.png';
import { useRef, useEffect, useState } from 'react';
import Login from '../pages/auth/Login';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/react';
import Register from '../pages/auth/Register';
import { Link, useNavigate } from 'react-router-dom';
import AddProductForm from './AddProductForm';
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
    // check if user is logged in and if token exists in local storage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      // set the user state
      setUser(JSON.parse(user));
      userRef.current = JSON.parse(user);
    }
  }, [setUser, userRef]);
  return (
    <nav>
      <div className="nav-logo-container">
        <Link to="/">
          <img src={Logo} alt="" className="w-64 h-64" />
        </Link>
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

        {user && <Link to="/marketplace">Marketplace</Link>}

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

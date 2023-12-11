import { useEffect, useRef, useState } from 'react';
import ChatSidebar from '../Components/ChatSidebar';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const params = useParams();
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState([]);

  const scrollRef = useRef();

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `/conversations/${
          JSON.parse(localStorage.getItem('user')).id
        }/${params?.id}`
      );
      setMessages(res?.data?.messages);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        `/contacts/${
          JSON.parse(localStorage.getItem('user')).id
        }`
      );
      setContacts(res?.data?.contacts);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (message === '') return;
    try {
      const res = await axios.post(`/send-message`, {
        senderId: JSON.parse(localStorage.getItem('user')).id,
        receiverId: Number(params?.id),
        text: message,
      });
      setMessage('');
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      fetchMessages();
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `/users/${params?.id}`
        );
        setUser(res.data?.user);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [params]);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    fetchMessages();

    setInterval(() => {
      fetchMessages();
    }, 2000);
  }, [params, message]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className="flex w-full h-[90vh] mb-20 overflow-hidden antialiased border rounded-xl shadow-md">
      <main className="flex flex-row flex-grow min-h-0">
        <ChatSidebar contacts={contacts} />
        <section className="flex flex-col flex-auto border-l border-gray-800">
          <div className="flex flex-row items-center justify-between flex-none px-6 py-4 shadow chat-header">
            <div className="flex">
              <div className="text-sm">
                <Link to={`/user/${user?.id}`} className="font-bold">
                  {user?.name}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-scroll chat-body">
            {messages?.map((message) => (
              <div ref={scrollRef} key={message?.id} className="gap-y-2">
                {message.senderId ===
                JSON.parse(localStorage.getItem('user')).id ? (
                  <div className="flex flex-row justify-end mb-2">
                    <div className="grid grid-flow-row gap-2 text-sm text-white messages">
                      <div className="flex flex-row-reverse items-center group">
                        <p className="max-w-xs px-6 py-3 bg-blue-700 rounded-full lg:max-w-md">
                          {message.text}
                          <span className="block text-xs text-right text-gray-200">
                            {moment(message.createdAt).format('LT')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-start mb-2">
                    <div className="grid grid-flow-row gap-2 text-sm text-gray-700 messages">
                      <div className="flex items-center group">
                        <p className="max-w-xs px-6 py-3 text-gray-200 bg-gray-800 rounded-full lg:max-w-md">
                          {message.text}
                          <span className="block text-xs text-left text-gray-400">
                            {moment(message.createdAt).format('LT')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex-none chat-footer">
            <form
              onSubmit={(e) => handleSubmitMessage(e)}
              className="flex flex-row items-center p-4"
            >
              <div className="relative flex-grow">
                <label>
                  <input
                    className="w-full py-2 pl-3 pr-10 transition duration-300 ease-in bg-gray-200 border border-gray-800 rounded-full focus:border-gray-700 focus:bg-gray-100 focus:outline-none focus:shadow-md"
                    type="text"
                    placeholder="Aa"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </label>
              </div>
              <button
                type="submit"
                onClick={(e) => handleSubmitMessage(e)}
                className="flex flex-shrink-0 w-6 h-6 mx-2 text-blue-600 focus:outline-none hover:text-blue-700"
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
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

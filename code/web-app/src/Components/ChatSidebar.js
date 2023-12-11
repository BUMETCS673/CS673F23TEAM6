import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ChatSidebar({ contacts }) {
  const [search, setSearch] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts || []);

  useEffect(() => {
    const handleSearch = () => {
      // Filter contacts by name or email
      const filteredContacts = contacts.filter((c) => {
        return (
          c?.name?.toLowerCase().includes(search.toLowerCase()) ||
          c?.email?.toLowerCase().includes(search.toLowerCase())
        );
      });

      setFilteredContacts(filteredContacts);
    };
    // If search is empty, show all contacts
    if (search === '') {
      setFilteredContacts(contacts);
    } else {
      handleSearch();
    }
  }, [search, contacts]);
  return (
    <section className="flex flex-col flex-none w-24 overflow-auto transition-all duration-300 ease-in-out group lg:max-w-sm md:w-2/5">
      <div className="flex-none p-4 search-box">
        <div className="relative">
          <label>
            <input
              className="w-full py-2 pl-10 pr-6 transition duration-300 ease-in bg-gray-200 border border-gray-800 rounded-full focus:outline-none focus:shadow-md"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contacts"
            />
            <span className="absolute top-0 left-0 inline-block mt-2 ml-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path
                  fill="#bbb"
                  d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                />
              </svg>
            </span>
          </label>
        </div>
      </div>

      <div className="flex-1 p-2 overflow-y-scroll contacts">
        {filteredContacts
          ?.filter((c) => c?.id !== JSON.parse(localStorage.getItem('user')).id)
          .map((c, i) => (
            <Link
              to={`/chat/${c?.id}`}
              key={i}
              className="relative flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-200"
            >
              <div className="flex-auto hidden min-w-0 ml-4 mr-6 md:block group-hover:block">
                <p>
                  <span className="font-bold">{c?.name}</span>
                  <span className="mx-1 text-gray-500">·</span>
                  <span className="text-gray-500">{c?.email}</span>
                </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}

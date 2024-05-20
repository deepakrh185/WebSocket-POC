
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        setShowDropdown(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const nameList = [
    "Sam",
    "John",
    "Alex",
    "Sellar"
  ];


  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.includes('@')) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };



  const filteredSuggestions = nameList.filter(suggestion =>
    suggestion.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div className="justify-center items-center flex" >
        <div className='flex-col'>
          <div className='border-2 h-20 mt-4 flex items-center w-[700px]'>
            <div className="relative" >
              <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder='Create a Post...'
                className="p-2 rounded-md focus:outline-none w-[600px]"
              />
              {showDropdown && (
                <ul className="absolute bg-white shadow-lg mt-1 rounded-md max-h-60 overflow-auto" >
                  <li >
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => {
                        setSearchInput(e.target.value)
                        setShowDropdown(true)
                      }}
                      placeholder="Search..."
                      className="rounded-md focus:outline-none p-2 m-2 w-44 border-2"

                    />
                  </li>
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSearchTerm(prevSearchTerm => prevSearchTerm.replace(/@/g, '') + ' ' + suggestion);
                        setShowDropdown(false);
                        setSearchInput('')
                      }}
                      className="cursor-pointer hover:bg-gray-100 py-2 px-4 block text-purple-600 font-bold"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
          <div className='mt-4 flex justify-end'>
            <button className='px-8 py-2 rounded-lg border-2 bg-purple-400'>Post</button>
          </div>
        </div>
      </div>
      \

    </>
  );
}

export default App;

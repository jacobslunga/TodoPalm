import React, { useState, useRef, useEffect } from 'react';

interface ThemeOption {
  name: string;
  bg: string;
  accent: string;
}

interface DropdownProps {
  options: ThemeOption[];
  onThemeChange: (themeBg: string) => void;
  userTheme: string;
  blackText: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onThemeChange, userTheme, blackText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ThemeOption>(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: ThemeOption) => {
    setSelectedOption(option);
    onThemeChange(option.bg);
    setIsOpen(false);
  };

  const textColor = userTheme === 'default' ? 'text-[rgba(0,0,0,0.7)] dark:text-[rgba(255,255,255,0.7)]' : `${blackText ? 'text-[rgba(0,0,0,0.7)]' : 'text-[rgba(255,255,255,0.7)]'}`;

  return (
    <div className="relative transition-all duration-200 z-50" ref={dropdownRef}>
      <button
        className={`w-full ${textColor} text-sm bg-transparent outline-none font-normal max-w-xs active:bg-transparent border-none focus:border-none active:border-none focus:bg-transparent`}
        onClick={toggleDropdown}
      >
        {selectedOption.name}
      </button>
      {isOpen && (
        <div className="absolute w-full bg-white dark:bg-black shadow-lg mt-1 rounded-md z-50">
          {options.map((option, index) => (
            <div
              key={index}
              className={`p-2 hover:bg-gray-100 dark:hover:opacity-70 transition-all duration-200 ${option.bg === selectedOption.bg ? 'font-bold' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;


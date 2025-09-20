'use client';
import { useState, useRef, useEffect } from 'react';

interface CustomDropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export default function CustomDropdown({
  label,
  options,
  selected,
  onSelect,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="text-base text-gray-400">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black border border-gray-700 rounded-md p-2 mt-1 text-white text-left flex justify-between items-center"
      >
        {selected}
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-black border border-gray-700 rounded-md shadow-lg">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-white cursor-pointer hover:bg-[#E53E3E]"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

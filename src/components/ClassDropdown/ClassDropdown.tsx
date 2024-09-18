"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // For programmatic navigation
import Navbar from '@/components/Navbar/Navbar';

const ClassDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const classOptions = [
    "Pre-Level",
    "Level 1",
    "Level 2",
    "Level 3",
    "9th",
    "Matric",
    "Huffaz English",
    "Huffaz Arabic"
  ];

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // Initialize router for navigation

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigate to dynamic route when a class is selected
  const handleClassSelect = (className: string) => {
    setIsOpen(false);  // Close dropdown
    const classSlug = className.toLowerCase().replace(/\s+/g, '-'); // Convert class name to URL-friendly slug
    router.push(`/class/${classSlug}`);  // Navigate to dynamic route
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[75vh]">
        <div className="relative" ref={dropdownRef}>
          {/* Dropdown button */}
          <button 
            onClick={toggleDropdown}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 px-24 rounded-xl shadow-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
          >
            Select Class
          </button>
          
          {/* Dropdown items */}
          {isOpen && (
            <ul className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              {classOptions.map((className, index) => (
                <li 
                  key={index}
                  className="hover:bg-purple-100 text-gray-800 font-medium py-2 px-4 cursor-pointer rounded-lg transition-all duration-200"
                  onClick={() => handleClassSelect(className)}
                >
                  {className}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default ClassDropdown;

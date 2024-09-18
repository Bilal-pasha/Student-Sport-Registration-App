"use client";
import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react'; // Client-side function
import toast from 'react-hot-toast';

type ButtonName = 'Home' | 'Class' | 'Work' | 'Expertise' | 'Sign Out';

interface ButtonStyles {
  [key: string]: React.CSSProperties;
}

const BUTTON_NAMES: ButtonName[] = ['Home', 'Class', 'Work', 'Expertise', 'Sign Out'];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState<ButtonName>('Home');
  const [buttonStyles, setButtonStyles] = useState<ButtonStyles>({});
  const buttonRefs = useRef<Record<ButtonName, HTMLButtonElement | null>>({} as Record<ButtonName, HTMLButtonElement | null>);

  useEffect(() => {
    // Determine the active button based on pathname
    const getButtonNameFromPath = (path: string): ButtonName => {
      if (path.startsWith('/class')) return 'Class';
      if (path.startsWith('/work')) return 'Work';
      if (path.startsWith('/expertise')) return 'Expertise';
      // Fallback to 'Home' if no match
      return 'Home';
    };

    const newActiveButton = getButtonNameFromPath(pathname);
    setActiveButton(newActiveButton);
  }, [pathname]);


  useEffect(() => {
    if (activeButton) {
      const activeButtonRef = buttonRefs.current[activeButton];
      if (activeButtonRef) {
        setButtonStyles({
          [activeButton]: {
            width: `${activeButtonRef.offsetWidth}px`,
            height: `${activeButtonRef.offsetHeight}px`,
            transform: `translateX(${activeButtonRef.offsetLeft - 9}px)`,
          },
        });
      }
    }
  }, [activeButton]);

  const handleClick = (buttonName: ButtonName) => {
    if (buttonName === 'Sign Out') {
      signOut({ callbackUrl: 'https://localhost:3000/Login'}) 
      toast.success("Sign Out Successfully")
    } else {
      setActiveButton(buttonName);
    }
  };

  const getHref = (buttonName: ButtonName) => {
    switch (buttonName) {
      case 'Home':
        return '/';
      case 'Class':
        return '/class';
      case 'Work':
        return '/work';
      case 'Expertise':
        return '/expertise';
      default:
        return '/';
    }
  };  
  return (
    <header className="w-full flex justify-center py-6 lg:sticky lg:top-0 top-auto bottom-0 fixed z-10">
      <div className="w-full flex justify-center py-6 lg:sticky lg:top-0 top-auto bottom-0 fixed z-10">
        <nav className="relative max-w-fit px-2 py-2 lg:bg-gray-200 bg-[#e7e7e7cf] rounded-full">
          <div
            className="absolute bottom-2 bg-black rounded-full transition-all duration-500 ease-in-out"
            style={{
              height: buttonStyles[activeButton]?.height || '0',
              width: buttonStyles[activeButton]?.width || '0',
              transform: buttonStyles[activeButton]?.transform || 'translateX(0)',
            }}
          />
          {BUTTON_NAMES.map((buttonName) => (
            <Link key={buttonName} href={getHref(buttonName)}>
              <Button
                buttonName={buttonName}
                isActive={activeButton === buttonName}
                onClick={() => handleClick(buttonName)}
                ref={(el) => { buttonRefs.current[buttonName] = el; }}
                signOut={buttonName === 'Sign Out' ? signOut : undefined}
              />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

interface ButtonProps {
  buttonName: ButtonName;
  isActive: boolean;
  onClick: () => void;
  ref: React.Ref<HTMLButtonElement>;
  signOut?: () => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ buttonName, isActive, onClick }, ref) => (
  <button
    ref={ref}
    className={`relative px-3 py-1 rounded-full font-medium text-sm ${
      isActive ? 'text-blue-300' : 'text-black hover:bg-gray-300 transition-all duration-700'
    } transition-colors duration-300 ease-in-out ${
      buttonName === 'Sign Out' ? 'bg-red-500 text-white hover:bg-red-600' : ''
    }`}
    onClick={onClick}
  >
    {buttonName}
  </button>
));

Button.displayName = 'Button';

export default Navbar;

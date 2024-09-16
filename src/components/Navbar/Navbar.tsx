"use client";
import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type ButtonName = 'Home' | 'Students' | 'Work' | 'Expertise' | 'Contact';

interface ButtonStyles {
  [key: string]: React.CSSProperties;
}

const BUTTON_NAMES: ButtonName[] = ['Home', 'Students', 'Work', 'Expertise', 'Contact'];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState<ButtonName>('Home');
  const [buttonStyles, setButtonStyles] = useState<ButtonStyles>({});
  const buttonRefs = useRef<Record<ButtonName, HTMLButtonElement | null>>({} as Record<ButtonName, HTMLButtonElement | null>);

  useEffect(() => {
    // Determine the active button based on pathname
    const getButtonNameFromPath = (path: string): ButtonName => {
      if (path.startsWith('/students')) return 'Students';
      switch (path) {
        case '/work':
          return 'Work';
        case '/expertise':
          return 'Expertise';
        case '/contact':
          return 'Contact';
        default:
          return 'Home';
      }
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
            transform: `translateX(${activeButtonRef.offsetLeft - 9}px)`
          }
        });
      }
    }
  }, [activeButton]);

  const handleClick = (buttonName: ButtonName) => {
    setActiveButton(buttonName);
  };

  const getHref = (buttonName: ButtonName) => {
    switch (buttonName) {
      case 'Home':
        return '/';
      case 'Students':
        return '/students';
      case 'Work':
        return '/work';
      case 'Expertise':
        return '/expertise';
      case 'Contact':
        return '/contact';
      default:
        return '/';
    }
  };

  return (
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
            />
          </Link>
        ))}
      </nav>
    </div>
  );
};

interface ButtonProps {
  buttonName: ButtonName;
  isActive: boolean;
  onClick: () => void;
  ref: React.Ref<HTMLButtonElement>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ buttonName, isActive, onClick }, ref) => (
  <button
    ref={ref}
    className={`relative px-3 py-1 rounded-full font-medium text-sm ${
      isActive ? 'text-blue-300' : 'text-black hover:bg-gray-300 transition-all duration-700'
    } transition-colors duration-300 ease-in-out`}
    onClick={onClick}
  >
    {buttonName}
  </button>
));

Button.displayName = 'Button';

export default Navbar;

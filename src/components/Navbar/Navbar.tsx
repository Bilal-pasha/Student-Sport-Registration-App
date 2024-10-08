"use client";
import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react'; // Client-side function
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

type ButtonName = 'Home' | 'Class' | 'Work' | 'Registration' | 'Sign Out';

interface ButtonStyles {
  [key: string]: React.CSSProperties;
}

const BUTTON_NAMES: ButtonName[] = ['Home', 'Class', 'Work', 'Registration', 'Sign Out'];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState<ButtonName>('Home');
  const [buttonStyles, setButtonStyles] = useState<ButtonStyles>({});
  const buttonRefs = useRef<Record<ButtonName, HTMLButtonElement | null>>({} as Record<ButtonName, HTMLButtonElement | null>);
  const { data: session } = useSession();

  useEffect(() => {
    const getButtonNameFromPath = (path: string): ButtonName => {
      if (path.startsWith('/class')) return 'Class';
      if (path.startsWith('/work')) return 'Work';
      if (path.startsWith('/registration')) return 'Registration';
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
      signOut({ callbackUrl: 'https://localhost:3000/Login' });
      toast.success('Signed Out Successfully');
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
      case 'Registration':
        return '/registration';
      default:
        return '/';
    }
  };

  return (
    <header className={`w-full flex justify-center py-6 lg:sticky lg:top-0 top-auto bottom-0 fixed z-10 ${pathname === "/Login" ? "hidden" : ""}`}>
      <div className="w-full flex px-8 justify-between py-6">
        <div></div>
        <nav className="relative px-2 py-2 bg-white rounded-full shadow-lg">
          <div
            className="absolute bottom-2 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-full transition-all duration-500 ease-in-out"
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
        <Image
          className={`${`rounded-full object-cover cursor-pointer`}`}
          width={50}
          height={50}
          src={`${session?.user?.image || ''}`}
          priority={true}
          alt="profile-picture"
        />
          {/* <button
            type="button"
            className="overflow-hidden border border-transparent hover:border-primary-700 rounded-full"
          >
            <Avatar
              imagePath={session?.user?.image}
              height={32}
              width={32}
              fontSize={12}
              email={session?.user?.email}
            />
          </button> */}
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
    className={`relative px-6 py-2 rounded-full font-semibold text-sm ${
      isActive ? 'text-indigo-600' : 'text-gray-800 hover:bg-gray-200'
    } transition-all duration-300 ease-in-out ${
      buttonName === 'Sign Out' ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-red-500/50' : ''
    }`}
    onClick={onClick}
  >
    {buttonName}
  </button>
));

Button.displayName = 'Button';

export default Navbar;

'use client'

import  React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import MenuLink from './link';
import Image from 'next/image';
import { useAppContext } from '@/context';
import useMediaQuery from '@/hooks/mediaQuery'
import MenuIcon from '@mui/icons-material/Menu';

function stringToColor(string: string) {
    let hash = 0;
    let i;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
    return color;
}

function stringAvatar(name: string) {
    const initials = name.split(' ').map(part => part[0].toUpperCase()).join('');
    return {
        sx: {
        bgcolor: stringToColor(name),
        width: 100, 
        height: 100, 
        fontSize: 48, 
        },
        children: initials
    };
}


interface MenuToggleButtonProps {
  onClick: () => void;
}

function MenuToggleButton({ onClick }: MenuToggleButtonProps) {
  return (
    <div onClick={onClick} className='fixed z-50'>
      <MenuIcon />
    </div>
  );
}

export default function Sidebar() {
  const { userData } = useAppContext();
  const isAboveMediumScreens = useMediaQuery("(min-width: 1024px)");
  const [isMenuToggled, setIsMenuToggle] = useState(false);
      const [isSubAccountId, setIsSubAccountId] = useState('');

    useEffect(() => {
        const id = localStorage.getItem('isSubAccount');
        if (id) {
            setIsSubAccountId(id);
        }
    }, []);

    const menuItems = [
        {
            list: [
                {
                    title: 'Account',
                    pathname: `/dashboard/[id]/?isSubAccountId=${isSubAccountId}`,
                    icon: ''
                },
                {
                    title: 'Transaction History',
                    pathname: `/dashboard/[id]/history/?isSubAccountId=${isSubAccountId}`,
                    icon: ''
                },
                {
                    title: 'Settings',
                    pathname: `/dashboard/[id]/settings/?isSubAccountId=${isSubAccountId}`,
                    icon: ''
                },
                {
                    title: 'Logout',
                    pathname: '/',
                    icon: ''
                },
            ]
        },
    ];


  return (
    <>
      {isAboveMediumScreens ? (
        <SidebarContent />
      ) : (
        <>
        <div className='lg:hidden flex  z-30'>
            <MenuToggleButton onClick={() => setIsMenuToggle(!isMenuToggled)} />
            {isMenuToggled && <SidebarContent />}
        </div>
        </>
      )}
    </>
  );

  function SidebarContent() {
    return (
      <div className='fixed h-screen z-40 bg-slate-200  w-[300px] overflow-y-scroll'>
        <div className='flex flex-col justify-center items-center'>
          <div className='py-6'>
            <Image
              src="https://chimoney.io/assets/icons/chimoney-purple-logo.svg"
              width={100}
              height={100}
              alt="chimoney logo"
            />
          </div>
          <Avatar {...stringAvatar(userData?.name ?? 'User')} />
          <div className="mt-6 flex flex-col">
            <p className='text-lg font-normal'>Welcome Back,</p>
            <span className='mt-2 text-sm font-semibold'>
              {userData?.name ?? 'User'}
            </span>
            <span className='mt-2 text-sm font-semibold'>
              {userData?.email ?? ''}
            </span>
          </div>
        </div>
        <ul className='w-full flex flex-col justify-center items-center'>
          {menuItems.map((cat, index) => (
            <li className='' key={index}>
              {cat.list && (
                <span className='py-8 w-full flex flex-col'>
                  {cat.list.map((item) => (
                    
                    <MenuLink
                      item={item}
                      key={item.title}
                    />
                  ))}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}


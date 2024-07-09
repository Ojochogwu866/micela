'use client'
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { AccountCircle, SettingsSharp } from '@mui/icons-material'
import NotificationsActiveSharpIcon from '@mui/icons-material/NotificationsActiveSharp';
import { Input } from '@/components/UI/input'
import Link from 'next/link';

const menuItems = [
    {
        topList: [
            {
                path: '/account',
                icon: <AccountCircle/>
            },
            {
                path: '/settings',
                icon: <SettingsSharp/>
            },
            {
                path: '/notifications',
                icon: <NotificationsActiveSharpIcon/>
            }
        ]
    }
];

export default function NavBar() {
    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const firstName = pathParts[1]; 

    return (
        <div className=' w-full flex items-center justify-between  bg-white p-5  lg:py-6 rounded-md'>
            <div className=' text-base font-semibold capitalize'>{firstName}</div>
            <div className="flex gap-2 items-center">
                <div className=' md:w-[400px] w-10/12'>
                    <Input
                        placeholder='Search'
                    />
                </div>
                {menuItems.map((cat, index) => (
                    <div key={index}>
                        {cat.topList && (
                            <ul className='flex gap-4' >
                                {cat.topList.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.path}>
                                            {item.icon}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
                </div>
        </div>
    );
}
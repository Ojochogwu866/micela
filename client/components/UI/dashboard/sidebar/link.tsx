'use client'

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface MenuItem {
  title: string;
  pathname: string;
}

interface LinkProps {
  item: MenuItem;
}

const MenuLink: React.FC<LinkProps> = ({ item }) => {
    const pathname = usePathname();

    return (
        <Link   href={{
            pathname: item.pathname }}  as={`${item.pathname}`}>
            <p className={`py-4 ${pathname === item.pathname ? 'active' : ''}`}>
                {item.title}
            </p>
        </Link>
    );
};

export default MenuLink;


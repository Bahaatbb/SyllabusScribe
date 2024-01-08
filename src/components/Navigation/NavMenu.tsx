import React, { ReactNode } from 'react';
import { Group } from '@mantine/core';
import { Link, LinkIcon, LinkLabel } from './NavMenu.styles';
import { useLocation } from 'react-router-dom';

interface INavMenuProps {
  menuItems: {
    icon: ReactNode;
    label: string;
    link: string;
    testId?: string;
    rightSide?: ReactNode;
    condition?: boolean;
  }[];
}

export function NavMenu({ menuItems }: INavMenuProps) {
  const { pathname } = useLocation();
  return (
    <div>
      {menuItems
        .filter(({ condition = true }) => condition)
        .map(({ icon, link, label, rightSide }) => {
          let isActive = link == '/' ? pathname === link : pathname.startsWith(link);
          return (
            <Link active={isActive.toString()} key={link} to={link}>
              <Group gap={'24px'}>
                <LinkIcon>{icon}</LinkIcon>
                <LinkLabel>{label}</LinkLabel>
              </Group>
              <div>{rightSide}</div>
            </Link>
          );
        })}
    </div>
  );
}

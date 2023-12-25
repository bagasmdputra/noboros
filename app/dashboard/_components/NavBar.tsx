"use client";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useState } from "react";

const MenuItems = ({
  pathname,
  setIsMenuOpen,
}: {
  pathname: string;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const menuItems = [
    { label: "transactions", path: "/dashboard" },
    { label: "pockets", path: "/dashboard/pockets" },
    { label: "source of fund", path: "/dashboard/fund-source" },
  ];

  return menuItems.map((item, index) => (
    <NavbarMenuItem
      key={`${item.path}-${index}`}
      onClick={() => setIsMenuOpen(false)}
    >
      <Link
        color={pathname === item.path ? "primary" : "foreground"}
        className="w-full"
        href={item.path}
      >
        {item.label}
      </Link>
    </NavbarMenuItem>
  ));
};

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image
            className="relative"
            src="/logo.png"
            alt="Noboros Logo"
            width={50}
            height={50}
            priority
          />
          <p className="font-bold text-inherit ml-1">Noboros</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <MenuItems pathname={pathname} setIsMenuOpen={setIsMenuOpen} />
      </NavbarContent>
      <NavbarMenu>
        <MenuItems pathname={pathname} setIsMenuOpen={setIsMenuOpen} />
      </NavbarMenu>
    </Navbar>
  );
};

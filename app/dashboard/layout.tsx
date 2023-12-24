"use client";
import React, { ReactNode, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuItems = [
    { label: "transactions", path: "/dashboard" },
    { label: "pockets", path: "/dashboard/pockets" },
    { label: "source", path: "/dashboard/source" },
  ];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <FontAwesomeIcon icon={faBorderAll} size="xs" />
            <p className="font-bold text-inherit ml-3">Noboros</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem
              key={item.path + index}
              isActive={pathname === item.path}
            >
              <Link
                onPressChange={(isPressed) => {
                  if (isPressed) setIsMenuOpen(false);
                }}
                color={pathname === item.path ? "primary" : "foreground"}
                href={item.path}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={pathname === item.path ? "primary" : "foreground"}
                className="w-full"
                onPressChange={(isPressed) => {
                  if (isPressed) setIsMenuOpen(false);
                }}
                href={item.path}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      {children}
    </>
  );
}

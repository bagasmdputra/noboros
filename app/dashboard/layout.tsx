import { ReactNode } from "react";
import { NavBar } from "./_components/NavBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

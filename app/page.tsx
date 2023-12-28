"use client";
import Image from "next/image";
import BudgetProgress from "./_components/BudgetProgress";
import Link from "next/link";
import {
  faMoneyBill,
  faRectangleList,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@nextui-org/react";
import { usePocketConnection } from "@/hooks/usePocketConnection";
import { BudgetOverview } from "./_components/BudgetOverview";

export default function Home() {
  const mainMenu = [
    {
      name: "Pocket",
      icon: faWallet,
      link: "dashboard/pockets",
    },
    {
      name: "Source",
      icon: faMoneyBill,
      link: "dashboard/fund-source",
    },
    {
      name: "Transaction",
      icon: faRectangleList,
      link: "dashboard",
    },
  ];
  //TODO connect overview with db
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <Image
          className="relative"
          src="/logo.png"
          alt="Noboros Logo"
          width={150}
          height={150}
          priority
        />
        <h1 className="font-bold text-4xl text-white">Noboros</h1>
      </div>

      <div className="flex justify-center gap-2 w-full m-10">
        {mainMenu.map((item) => (
          <Card
            isPressable
            isHoverable
            className="flex flex-col items-center p-8"
          >
            <Link href={item.link}>
              <div className="flex flex-col items-center">
                <FontAwesomeIcon icon={item.icon} size="2x" color="pink" />
                <p>{item.name}</p>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      <BudgetOverview />
    </main>
  );
}

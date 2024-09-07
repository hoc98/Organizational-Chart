"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

export const Header: FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Task-Rirais</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li className="flex items-center">
              <Image
                src="/images/user.png"
                alt="Avatar"
                width={30}
                height={30}
                className="rounded-full ml-2 text-white"
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

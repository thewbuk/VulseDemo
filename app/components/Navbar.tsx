import React from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/auth";
import Link from "next/link";
import { MessagesSquareIcon, Users, Play } from "lucide-react";

import { Youtube } from "lucide-react";
import { ListTodo } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { UserButton } from "./UserButton";

async function Navbar() {
  const session = await getServerSession(authOptions);

  // const session = await getServerSession(authOptions);
  return (
    <header className="relative top-0 z-50">
      <nav className="flex flex-col items-center h-24 p-5 pl-2 mx-auto bg-transparent sm:flex-row">
        <Link href="/">
          <ListTodo />
        </Link>
        <div className="flex items-end justify-end flex-1 space-x-4">
          <UserButton session={session} />
          {/* <DiscordButton /> */}
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

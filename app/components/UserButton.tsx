"use client";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  StarIcon,
  User,
  UserPlus,
  Bot,
  Users,
  Airplay,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function UserButton({ session }: { session: Session | null }) {
  const router = useRouter();
  if (!session) {
    return (
      <>
        <div
          className="rounded-md bg-gradient-to-r p-[2px] from-[#6EE7B7] via-[#3B82F6]
            to-[#9333EA]"
        >
          <Button variant={"outline"} className="border-sky-500 rounded-md">
            <Link href="/login">
              {" "}
              <span>Sign in</span>
            </Link>
          </Button>{" "}
        </div>
      </>
    );
  }
  return (
    session && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button onClick={() => {}} variant={"ghost"}>
            <UserAvatar
              name={session.user?.name || session.user?.email || ""}
              image={session.user?.image || ""}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* {subscription === undefined && (
            <DropdownMenuItem>
              <LoadingSpinner />
            </DropdownMenuItem>
          )} */}
          {/* {subscription?.status === "active" &&
            process.env.IS_FIRST_RELEASE == "false" && (
              <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-[#E935C1] animate-pulse">
                <StarIcon fill="#E935C1" className="w-6 h-6" />
                <p>PRO</p>
              </DropdownMenuLabel>
            )} */}
          <DropdownMenuGroup>
            {/* <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="cursor-pointer"
            >
              <User className="w-4 h-4 mr-2" />
              <span>Profile</span>
            </DropdownMenuItem> */}
            {/* <DropdownMenuItem
              className="cursor-pointer"
              onClick={generatePortalLink}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              <span>Managa Account</span>
            </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="cursor-pointer"
            >
              <Settings className="w-4 h-4 mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push("/shortcuts")}
            >
              <Keyboard className="w-4 h-4 mr-2" />
              <span>Keyboard shortcuts</span>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => router.push("/user")}
              className="cursor-pointer"
            >
              <Airplay className="w-4 h-4 mr-2" />
              <span>Dashboard</span>
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              className="cursor-pointer"
              onClick={generatePortalLink}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              <span>Managa Account</span>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          {/* <DropdownMenuGroup>
            <DropdownMenuItem>
              <Users className="w-4 h-4 mr-2" />
              <span>Team</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="w-4 h-4 mr-2" />
                <span>Invite users</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail className="w-4 h-4 mr-2" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <Plus className="w-4 h-4 mr-2" />
              <span>New Team</span>
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem
            onClick={() => router.push("/contact")}
            className="cursor-pointer"
          >
            <LifeBuoy className="w-4 h-4 mr-2" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Cloud className="w-4 h-4 mr-2" />
            <span>API</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href="https://discord.gg/fJ6z3tZ5DZ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Bot className="w-4 h-4 mr-2" />
              <span>Discord</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="bg-red-800/25 hover:bg-red-800/75!important cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2 hover:bg-red-800/75" />
            <span className="">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}

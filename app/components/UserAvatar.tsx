import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { forwardRef } from "react";

const UserAvatar = forwardRef(
  (
    {
      name,
      image,
      className,
    }: {
      name?: string | null;
      image?: string | null;
      className?: string;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div>
        <Avatar className={cn("bg-white text-black", className)} ref={ref}>
          {image && (
            <Image
              src={image}
              alt={name || "User Name"}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback
            className="text-lg dark:bg-white dark:text-black"
            delayMs={1000}
          >
            {name
              ?.split(" ")
              .map((n) => n[0])
              ?.join("")}
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }
);

export default UserAvatar;

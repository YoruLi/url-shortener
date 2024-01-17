import Link, { LinkProps } from "next/link";
import React from "react";

interface LinkButtonProps extends React.LinkHTMLAttributes<LinkProps> {}

export const LinkButton = (props: LinkButtonProps) => {
  const { children, href } = props;
  return (
    <Link
      href={href ?? "#"}
      className="
    border dark:border-white/10 border-gray-300
    rounded-full
    inline-flex justify-center items-center gap-x-2
    py-1 px-2 md:px-4
    text-xs md:text-base
    transition
   hover:bg-white/10"
    >
      {children}
    </Link>
  );
};

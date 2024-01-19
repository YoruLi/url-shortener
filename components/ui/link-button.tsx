import { cn } from "@/utils/cn";
import Link, { LinkProps } from "next/link";
import React from "react";

interface LinkButtonProps extends React.ComponentProps<"button"> {
  href?: string;
}

const LinkButtonStyle = `
  border border-white/10 
  rounded-md
  inline-flex justify-center items-center gap-x-2
  py-1 px-2 md:px-4
  text-xs md:text-base
  transition
  hover:bg-white/10
`;

export const LinkButton = (props: LinkButtonProps) => {
  const { children, href } = props;

  if (!href) {
    return (
      <button {...props} className={cn(LinkButtonStyle, props.className)}>
        {children}
      </button>
    );
  }

  return (
    <Link href={href ?? "#"} className={cn(LinkButtonStyle, props.className)}>
      {children}
    </Link>
  );
};

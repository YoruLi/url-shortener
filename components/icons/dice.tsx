import { cn } from "@/utils/cn";
import React from "react";

export const Dice: React.FC<React.ComponentProps<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
      className={cn("[&>circle]:fill-primary", props.className)}
    >
      <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path>
      <circle cx="8" cy="8" r="1.5"></circle>
      <circle cx="12" cy="12" r="1.5"></circle>
      <circle cx="16" cy="16" r="1.5"></circle>
    </svg>
  );
};

import React, { HTMLAttributes } from "react";
import { Error } from "../icons/error";

interface TextAlertProps extends HTMLAttributes<HTMLSpanElement> {}
export default function TextAlert(props: TextAlertProps) {
  return (
    <div className="mt-2 inline-flex items-center text-red-600 gap-2 text-sm">
      <Error className="size-4 *:fill-red-600" />
      <span>{props.children}</span>
    </div>
  );
}

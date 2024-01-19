"use client";
import React, { Fragment } from "react";
import { Menu, MenuButtonProps, Transition } from "@headlessui/react";
import { LinkButton } from "./link-button";
import { Options } from "../icons/options";

interface DropdownProps extends MenuButtonProps<"button"> {
  children: React.ReactNode;
  onClick?: () => void;
}
export function Dropdown(props: DropdownProps) {
  return (
    <Menu as="div" className="relative group inline-block text-left z-30">
      <Menu.Button
        as={LinkButton}
        className={"opacity-0 group-hover:opacity-80  transition-opacity"}
      >
        <Options className="opacity-0 group-hover:opacity-80 transition-opacity relative size-5" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute p-1 right-2 mt-2 w-56 bg-gradient-background backdrop-blur-[2px] border-white/20 origin-top-right divide-y z-40 divide-gray-100 rounded-md border focus:outline-none">
          <div className="py-1">
            <div>{props.children}</div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export function DropdownItem(props: DropdownProps) {
  return (
    <Menu.Item>
      <div
        className={`cursor-pointer block justify-between rounded text-stone-200 px-3 py-1 text-sm hover:bg-white/20 duration-200
        ${props.className}`}
        onClick={props.onClick}
      >
        <div className="flex items-center">{props.children}</div>
      </div>
    </Menu.Item>
  );
}

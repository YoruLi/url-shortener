"use client";

import { link } from "@prisma/client";
import React from "react";
import { Copy } from "../icons/copy";

import { Dropdown, DropdownItem } from "./dropdown";
import toast from "react-hot-toast";
import Modal from "./modal";
import LinkForm from "../form/link";

import { deleteLink } from "@/app/actions";
import Delete from "../features/delete";
import { copyToClipBoard } from "@/utils/copy-to-clipboard";

export default function Card(props: link) {
  const [showEdit, setShowEdit] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);

  const handleDeleteLink = async () => {
    try {
      await deleteLink(props.id);
      toast("Link deleted", {
        icon: "✔",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something was wrong");
    } finally {
      setShowDelete(false);
    }
  };

  return (
    <div className="border space-y-2 border-white/10 w-full hover:scale-105 group transition px-4 py-5  rounded-md ">
      <div className="flex items-center justify-between gap-3 ">
        <div className="inline-flex flex-1 gap-3 items-center">
          <span className="text-sm opacity-80">Short url:</span>
          <a
            href={`https://lym28.vercel.app/go/${props.slug}`}
            target="_blank"
            rel="noreferrer"
            className=" hover:opacity-80"
          >
            {props.slug}
          </a>
          <Copy
            className="size-5 opacity-80 hover:opacity-100 hover:scale-105"
            onClick={() => copyToClipBoard(`https://lym28.vercel.app/go/${props.slug}`)}
          />
        </div>
        <Dropdown>
          <DropdownItem
            onClick={() => copyToClipBoard(`https://lym28.vercel.app/go/${props.slug}`)}
          >
            Copy short url
          </DropdownItem>
          <DropdownItem onClick={() => setShowDelete(!showDelete)}>Delete</DropdownItem>
          <DropdownItem onClick={() => setShowEdit(!showEdit)}>Edit</DropdownItem>
        </Dropdown>

        <Modal open={showEdit} close={() => setShowEdit(!open)} title={`Edit ${props.slug}`}>
          <LinkForm defaultValuesProp={props} type="Update" />
        </Modal>

        <Modal open={showDelete} close={() => setShowDelete(!open)}>
          <Delete closeModal={() => setShowDelete(!showDelete)} deleteLink={handleDeleteLink} />
        </Modal>
      </div>
      <div className="flex items-center gap-3 overflow-hidden truncate ">
        <span className="text-sm opacity-80">Original URL</span>
        <p className="text-nowrap text-primary/50 overflow-hidden hover:opacity-80">{props.url}</p>
      </div>
    </div>
  );
}

import { Dice } from "@/components/icons/dice";
import { LinkIcon } from "@/components/icons/link";
import { Input } from "@/components/ui/input";
import { LinkButton } from "@/components/ui/link-button";

import React from "react";

export default function CreateLinkPage() {
  const handleCreateLink = async () => {};
  return (
    <div className="container pt-8 mx-auto w-[90%]">
      <h1 className="title text-center mb-10">Create new link</h1>
      <form action="" className="mx-auto w-full space-y-6 [&>div>label]:leading-loose">
        <div>
          <label htmlFor="url">Original URL:</label>
          <Input
            type="text"
            id="url"
            placeholder="https://"
            className="hover:scale-105 focus:scale-105 py-2"
          />
        </div>
        <div>
          <label htmlFor="slug">Custom slug:</label>

          <div className="relative">
            <Input
              type="text"
              id="slug"
              placeholder="Custom slug"
              className="relative hover:scale-105 py-2"
            />
            <div className="absolute right-2 top-2 *:opacity-70 *:hover:opacity-100">
              <Dice />
            </div>
          </div>
          <legend className="text-gray-500 text-sm">https://lym.vercel.app/lpm/</legend>
        </div>
        <LinkButton className="hover:scale-105 !px-8 float-end rounded-md">
          Create link <LinkIcon className="opacity-80 size-5" />
        </LinkButton>
      </form>
    </div>
  );
}

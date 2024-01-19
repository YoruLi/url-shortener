import LinkForm from "@/components/form/link";

import React from "react";

export default function CreateLinkPage() {
  return (
    <div className="container pt-8 mx-auto w-[90%]">
      <h1 className="title text-center mb-10">Create new link</h1>
      <LinkForm type="Insert" />
    </div>
  );
}

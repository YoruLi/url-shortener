import React, { useTransition } from "react";
import { LinkButton } from "../ui/link-button";

export default function Delete({
  closeModal,
  deleteLink,
}: {
  closeModal: () => void;
  deleteLink: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <div className="mt-2">
        <p className="text-sm">The link will be deleted permanently, are you sure?</p>
      </div>

      <div className="mt-4 flex justify-between">
        <LinkButton
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium  focus:outline-none "
          onClick={() => startTransition(deleteLink)}
        >
          {isPending ? "Loading..." : "  Got it, thanks!"}
        </LinkButton>

        <LinkButton
          type="button"
          className="inline-flex justify-center !border-red-600 px-4 py-2 text-sm font-medium hover:bg-red-600 focus:outline-none"
          onClick={closeModal}
        >
          Cancel
        </LinkButton>
      </div>
    </>
  );
}

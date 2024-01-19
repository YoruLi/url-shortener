"use client";
import React, { useTransition } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { Input } from "../ui/input";
import TextAlert from "../ui/text-alert";
import { Dice } from "../icons/dice";
import { LinkButton } from "../ui/link-button";
import { LinkIcon } from "../icons/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createLink, updateLink } from "@/app/actions";
import { generateRandomSlug } from "@/utils/generate-random-slug";

const schema = z.object({
  url: z.string(),
  slug: z.string(),
});
type CreateLink = z.TypeOf<typeof schema>;

interface LinkFormProps {
  defaultValuesProp?: CreateLink;
  type?: "Update" | "Insert";
}

export default function LinkForm({ defaultValuesProp, type = "Insert" }: LinkFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    register,
  } = useForm<CreateLink>({
    defaultValues: defaultValuesProp,
  });

  const handleCreateLink = async (values: CreateLink) => {
    if (type === "Insert") {
      try {
        startTransition(() => createLink(values));
        router.push("/dashboard");
        toast.success("Link created successfully");
      } catch (error: any) {
        toast.error(error.message);
        console.error(error);
      }
    }

    if (type === "Update") {
      try {
        startTransition(() => updateLink(values));
        toast.success("Link updated successfully");
      } catch (error: any) {
        toast.error(error.message);
        console.error(error);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleCreateLink)}
      className="mx-auto w-full space-y-6 [&>div>label]:leading-loose "
    >
      <div>
        <label htmlFor="url">Original URL:</label>
        <Input
          type="text"
          id="url"
          placeholder="https://"
          {...register("url", {
            required: {
              value: true,
              message: "Please, dont forget enter a URL.",
            },
            pattern: {
              value: /^https?:\/\//i,
              message: "Please, enter a valid URL link. It must start with https://.",
            },
          })}
          className="hover:scale-105 focus:scale-105 py-2"
        />
        {errors.url && <TextAlert>{errors.url?.message}</TextAlert>}
      </div>

      <div>
        <label htmlFor="slug">Short URL:</label>

        <div className="relative">
          <Input
            type="text"
            id="slug"
            placeholder="Custom slug"
            {...register("slug", {
              required: {
                value: true,
                message: "Please, enter a slug or generate random.",
              },
              pattern: {
                value: /^[a-zA-z0-9_-]+$/i,
                message: "Please, enter a valid slug.",
              },
            })}
            className="relative hover:scale-105 py-2"
          />
          <div className="absolute right-2 top-2 *:opacity-70 *:hover:opacity-100">
            <Dice
              onClick={() => {
                setValue("slug", generateRandomSlug());
              }}
            />
          </div>
        </div>
        <legend className="text-gray-500 text-sm">https://lym.vercel.app/lpm/</legend>

        {errors.slug && <TextAlert>{errors.slug.message}</TextAlert>}
      </div>

      <LinkButton className="hover:scale-105 !px-8 float-end rounded-md" disabled={isPending}>
        {isPending ? "Loading..." : " Create link"} <LinkIcon className="opacity-80 size-5" />
      </LinkButton>
    </form>
  );
}

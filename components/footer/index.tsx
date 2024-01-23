import React from "react";
import { GitHub } from "../icons/github";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 mx-auto py-5 w-full opacity-80">
      <p className="text-sm text-muted-foreground text-center ">
        Made by&nbsp;
        <a
          href="https://twitter.com"
          target="__blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4 hover:opacity-80"
        >
          YoruLi
        </a>
        . Github account&nbsp;
        <a
          href="https://github.com/yoruLi/url-shortener"
          target="__blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4 size-4 inline-block hover:opacity-80"
        >
          <GitHub />
        </a>
      </p>
    </footer>
  );
}

"use client";
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";

export default function ProgressBar() {
  return (
    <Next13ProgressBar height="2px" color="#979797" options={{ showSpinner: true }} showOnShallow />
  );
}

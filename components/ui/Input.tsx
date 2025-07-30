"use client";

import React, { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`
        bg-white
        rounded
        border
        border-spore-grey/50
        focus:outline-none
        focus:ring-2
        focus:ring-psybeam-purple
        p-2
        ${props.className ?? ""}
      `}
    />
  );
}

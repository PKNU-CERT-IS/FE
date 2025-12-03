"server-only";

import React from "react";
import Link from "next/link";
import PlusSVG from "/public/icons/plus.svg";

interface NewPostButtonProps {
  href: string;
  buttonText: string;
  className?: string;
}

export default function SCNewPostButton({
  href,
  buttonText,
  className,
}: NewPostButtonProps) {
  return (
    <Link
      scroll={false}
      href={href}
      className={
        "inline-flex gap-2 px-4 py-2 action-button whitespace-nowrap sm:w-auto w-full justify-center " +
        className
      }
    >
      <PlusSVG className="w-4 h-4" />
      {buttonText}
    </Link>
  );
}

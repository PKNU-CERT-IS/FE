import * as React from "react";

import { cn } from "@/lib/utils";

const DefaultSearchBar = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border  border-gray-300 text-gray-900  px-3 py-2 text-sm placeholder:text-gray-400  focus:border-cert-red focus:outline-none dark:border-gray-700 dark:text-gray-200",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
DefaultSearchBar.displayName = "Input";

export default DefaultSearchBar;

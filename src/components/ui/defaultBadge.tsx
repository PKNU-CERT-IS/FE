import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const defaultBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground ",
        outline: "text-foreground",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof defaultBadgeVariants> {}

function DefaultBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(defaultBadgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export default DefaultBadge;

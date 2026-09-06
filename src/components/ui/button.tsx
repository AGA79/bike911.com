import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-paper text-ink hover:bg-paper/90",
        crimson: "bg-crimson text-paper hover:bg-crimson/90",
        outline:
          "border border-line bg-transparent text-paper hover:bg-elevated",
        ghost: "text-paper hover:bg-elevated",
        link: "text-paper underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 min-h-11 px-5 text-sm",
        lg: "h-12 min-h-12 px-6 text-base",
        sm: "h-9 min-h-9 px-3 text-xs",
        link: "h-auto min-h-0 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

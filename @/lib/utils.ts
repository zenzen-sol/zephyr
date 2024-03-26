import clsx, { ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Handles concatenation and merging of tailwind classes */
export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(...inputs));
}

const customTwMerge = extendTailwindMerge({
  override: {
    theme: {
      spacing: ["token", "base", "footer", "row"],
      colors: [
        "accent",
        "danger",
        "selected",
        "edit",
        "active",
        "related",
        "success",
        "error",
      ],
    },
  },
});

export const getInitials = (name: string): string => {
  var parts = name.split(" ");
  var initials = "";
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].length > 0 && parts[i] !== "") {
      initials += parts[i][0];
    }
  }
  return initials;
};

import { cn } from "@/lib/utils";
import { FC } from "react";

export type IconProps = {
  className?: string;
  strokeWidth?: number;
  sizeClassName?: string;
  strokeClassName?: string;
};

const SIZE_CLASS_NAME = "w-6 h-6";
const STROKE_CLASS_NAME = "stroke-current";

export const IconChevronRight: FC<IconProps> = ({
  className,
  sizeClassName,
  strokeClassName,
  strokeWidth = 1.5,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      className={cn(
        sizeClassName || SIZE_CLASS_NAME,
        strokeClassName || STROKE_CLASS_NAME,
        className,
      )}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

export const IconLoading: FC<IconProps> = ({
  className,
  sizeClassName,
  strokeClassName,
  strokeWidth = 1.5,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={cn(
        sizeClassName || SIZE_CLASS_NAME,
        strokeClassName || STROKE_CLASS_NAME,
        className,
      )}
      strokeWidth={strokeWidth}
    >
      <path d="M12.0003 3V6M12.0003 18V21M5.63634 5.63604L7.75766 7.75736M16.2429 16.2426L18.3643 18.3639M3 12.0006H6M18 12.0006H21M5.63634 18.3639L7.75766 16.2426M16.2429 7.75736L18.3643 5.63604" />
    </svg>
  );
};

export const IconWallet: FC<IconProps> = ({
  className,
  sizeClassName,
  strokeClassName,
  strokeWidth = 1.5,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={cn(
        sizeClassName || SIZE_CLASS_NAME,
        strokeClassName || STROKE_CLASS_NAME,
        className,
      )}
      strokeWidth={strokeWidth}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
      />
    </svg>
  );
};

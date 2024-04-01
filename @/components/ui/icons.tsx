import { FC } from "react";

export type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const STROKE_CLASSES = "w-6 h-6 stroke-current";

export const IconLoading: FC<IconProps> = ({
  className = STROKE_CLASSES,
  strokeWidth = 1.5,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      strokeWidth={strokeWidth}
    >
      <path d="M12.0003 3V6M12.0003 18V21M5.63634 5.63604L7.75766 7.75736M16.2429 16.2426L18.3643 18.3639M3 12.0006H6M18 12.0006H21M5.63634 18.3639L7.75766 16.2426M16.2429 7.75736L18.3643 5.63604" />
    </svg>
  );
};

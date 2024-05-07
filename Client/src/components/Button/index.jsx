import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
  round: "rounded-[12px]",
};
const variants = {
  fill: {
    white_A700_99: "bg-white-A700_99",
    indigo_600: "bg-indigo-600 text-white-A700",
    gray_100: "bg-gray-100 text-gray-500",
    indigo_A200_33: "bg-indigo-A200_33",
    gray_900: "bg-gray-900 text-white-A700",
    light_blue_200: "bg-light_blue-200 text-white-A700",
    white_A700_33: "bg-white-A700_33 text-white-A700",
    green_400: "bg-green-400 text-white-A700",
    indigo_A200: "bg-indigo-A200 text-white-A700",
  },
  outline: {
    white_A700_33: "border-white-A700_33 border-2 border-solid",
    gray_500_66: "border-gray-500_66 border-2 border-solid text-gray-900",
  },
};
const sizes = {
  sm: "h-[20px] px-px text-xs",
  "2xl": "h-[38px] px-2.5 text-sm",
  "3xl": "h-[38px] px-2.5",
  "6xl": "h-[48px] px-[18px] text-[22px]",
  "5xl": "h-[48px] px-4",
  "8xl": "h-[58px] px-[35px] text-sm",
  xl: "h-[30px] px-[11px] text-sm",
  lg: "h-[28px] px-[7px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "lg",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square", "round"]),
  size: PropTypes.oneOf(["sm", "2xl", "3xl", "6xl", "5xl", "8xl", "xl", "lg"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf([
    "white_A700_99",
    "indigo_600",
    "gray_100",
    "indigo_A200_33",
    "gray_900",
    "light_blue_200",
    "white_A700_33",
    "green_400",
    "indigo_A200",
    "gray_500_66",
  ]),
};

export { Button };

import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
  round: "rounded-lg",
};
const variants = {
  fill: {
    gray_800: "bg-gray-800 text-gray-500",
    gray_900_33: "bg-gray-900_33 text-white-A700",
    white_A700: "bg-white-A700 text-gray-500",
  },
  outline: {
    gray_500_33: "border-gray-500_33 border border-solid text-gray-500",
  },
};
const sizes = {
  xs: "h-[26px] text-sm",
  md: "h-[36px] pl-[9px] pr-[35px] text-sm",
  sm: "h-[32px] pl-[9px] pr-[35px] text-sm",
  lg: "h-[48px] px-3.5 text-sm",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      children,
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "fill",
      size = "lg",
      color = "",
      ...restProps
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <>
        <label
          className={`${className} flex items-center justify-center cursor-text text-sm font-medium  ${(shape && shapes[shape]) || ""} ${variants[variant]?.[color] || variants[variant] || ""} ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input ref={ref} type={type} name={name} onChange={handleChange} placeholder={placeholder} {...restProps} />
          {!!suffix && suffix}
        </label>
      </>
    );
  },
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["square", "round"]),
  size: PropTypes.oneOf(["xs", "md", "sm", "lg"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf(["gray_800", "gray_900_33", "white_A700", "gray_500_33"]),
};

export { Input };

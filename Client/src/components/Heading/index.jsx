import React from "react";

const sizes = {
  "2xl": "text-3xl font-bold md:text-[28px] sm:text-[26px]",
  xl: "text-[22px] font-bold",
  s: "text-xs font-bold",
  md: "text-sm font-bold",
  lg: "text-base font-bold",
};

const Heading = ({ children, className = "", size = "md", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-white-A700 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };

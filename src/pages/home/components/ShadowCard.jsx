import React from "react";

export const ShadowCard = ({
  source,
  title,
  subTitle,
  alt,
  children,
  ...rest
}) => {
  return (
    <div
      className="h-full relative cursor-pointer overflow-hidden shadow-card group"
      {...rest}
    >
      <div className="absolute left-0 top-0 right-0 bottom-0 transition-all shadow-mask z-10">
        {children}
      </div>
      <img
        className="w-full h-full transform group-hover:scale-105 transition-all duration-500 object-cover object-center"
        src={source}
        alt={alt || source}
      />
    </div>
  );
};

import { FC, useState } from "react";

interface ButtonProps {
  bgColor?: string;
  bgColorHover?: string;
  textColor?: string;
  textColorHover?: string;
  padding?: string;
  text: string;
  href?: string;
}

const Button: FC<ButtonProps> = ({
  bgColor = "#ea7210",
  bgColorHover = "transparent",
  padding = "16px",
  text,
  href = "#",
  textColor = "#FFFFFF",
  textColorHover = "#ea7210",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className={`border-[1px] border-primary rounded-xl hover:bg-[${bgColorHover}] duration-300 ease-linear`}
      style={{
        color: isHovered ? textColorHover : textColor,
        backgroundColor: isHovered ? bgColorHover : bgColor,
        padding: padding,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </a>
  );
};

export default Button;

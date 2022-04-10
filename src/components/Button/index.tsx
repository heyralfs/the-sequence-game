import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
}

export const Button = ({ text, ...rest }: ButtonProps) => {
	return <StyledButton {...rest}>{text}</StyledButton>;
};

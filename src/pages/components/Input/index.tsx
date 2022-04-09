import {
	forwardRef,
	InputHTMLAttributes,
	ForwardRefRenderFunction,
} from "react";
import { StyledInput } from "./style";

const BaseInput: ForwardRefRenderFunction<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement>
> = ({ ...rest }, ref) => {
	return <StyledInput ref={ref} {...rest} />;
};

export const Input = forwardRef(BaseInput);

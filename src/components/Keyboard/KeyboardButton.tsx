import { Button } from "@chakra-ui/react";

interface KeyboardButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	full?: boolean;
}

export const KeyboardButton = ({
	children,
	onClick,
	full = false,
}: KeyboardButtonProps) => {
	return (
		<Button width={full ? "100%" : "12"} height="12" onClick={onClick}>
			{children}
		</Button>
	);
};

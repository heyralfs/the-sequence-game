import { HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { IoInformation, IoSunny, IoMoon } from "react-icons/io5";

interface HeaderProps {
	openInstructions: () => void;
}

export const Header = ({ openInstructions }: HeaderProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === "dark";

	return (
		<HStack
			paddingX={4}
			paddingY={2}
			justifyContent="space-between"
			width="100%"
		>
			<IconButton
				size="xs"
				aria-label="show instructions"
				onClick={openInstructions}
			>
				<IoInformation />
			</IconButton>

			<IconButton
				size="xs"
				aria-label="toogle color mode"
				onClick={toggleColorMode}
			>
				{isDark ? <IoSunny /> : <IoMoon />}
			</IconButton>
		</HStack>
	);
};

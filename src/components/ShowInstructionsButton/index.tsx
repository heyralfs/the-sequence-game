import React from "react";
import { IoInformationCircle } from "react-icons/io5";

interface Props {
	onClick: () => void;
}

export const ShowInstructionsButton = ({ onClick }: Props) => {
	return (
		<IoInformationCircle
			color="var(--off-white)"
			onClick={onClick}
			title="Show instructions"
			size={20}
			style={{
				position: "absolute",
				top: "16px",
				left: "16px",
				cursor: "pointer",
			}}
		/>
	);
};

import { SiTwitter } from "react-icons/si";
import { StyledShareButton } from "./style";

interface ShareOnTwitterProps {
	tweet: string;
}

export const ShareOnTwitterButton = ({ tweet }: ShareOnTwitterProps) => {
	return (
		<StyledShareButton
			href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
				tweet
			)}`}
			target="_blank"
			rel="noreferrer"
		>
			<SiTwitter /> Share on Twitter
		</StyledShareButton>
	);
};

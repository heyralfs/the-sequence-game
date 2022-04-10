import { StyledFooter } from "./style";
import { SiNextdotjs, SiNotion, SiStyledcomponents } from "react-icons/si";

export const Footer = () => {
	return (
		<StyledFooter>
			<p>Made with ❤️ and</p>
			<div className="tech-icons">
				<a href="https://nextjs.org" target="_blank" rel="noreferrer">
					<SiNextdotjs title="NextJS" />
				</a>
				<a
					href="https://styled-components.com"
					target="_blank"
					rel="noreferrer"
				>
					<SiStyledcomponents title="Styled-components" />
				</a>
				<a href="https://notion.so" target="_blank" rel="noreferrer">
					<SiNotion title="Notion" />
				</a>
			</div>
		</StyledFooter>
	);
};

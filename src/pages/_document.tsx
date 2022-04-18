import Document, {
	Head,
	Html,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App: any) => (props: any) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);

			initialProps.styles = (
				<>
					{initialProps.styles}
					{sheet.getStyleElement()}
				</>
			) as unknown as React.ReactElement[];

			return initialProps;
		} finally {
			sheet.seal();
		}
	}
}

export default MyDocument;

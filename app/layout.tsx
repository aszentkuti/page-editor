import SideBar from "@/components/editorSideBar/SideBar";
import { ArticlesContextProvider } from "@/context/ArticlesConfigContext";
import { EditorContextProvider } from "@/context/EditorConfigContext";
import { getArticlesRSS } from "@/pages/api/articles";
import Grid from "@mui/material/Grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "VeryVisual",
	description: "Wow this is something - IGN",
};
const feed = await getArticlesRSS(
	"https://www.blikk.hu/aktualis?feed=true&category=/aktualis"
);

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body style={{ margin: 0, height: "100vh" }}>
				<ArticlesContextProvider>
					<EditorContextProvider>
						<Grid style={{ height: "100%" }} container padding={0}>
							<Grid xs={8} item>
								{children}
							</Grid>
							<Grid item xs={4}>
								<SideBar articles={feed.items} />
							</Grid>
						</Grid>
					</EditorContextProvider>
				</ArticlesContextProvider>
			</body>
		</html>
	);
}

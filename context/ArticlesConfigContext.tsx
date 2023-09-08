"use client";

import { getArticlesRSS } from "@/pages/api/articles";
import React, { createContext, useEffect, useState } from "react";

export interface ArticlesContext {
	articles: any;
	setArticles: any;
}
export const ArticlesContext = createContext<ArticlesContext | null>(null);

export const ArticlesContextProvider = ({ children }) => {
	const [articles, setArticles] = useState(null);

	useEffect(() => {
		async function getArticles() {
			console.log("asdfsddssdgfsdg");
			const feed = await getArticlesRSS(
				"https://www.blikk.hu/aktualis?feed=true&category=/aktualis"
			);
			console.log("ITEMS", feed);
			setArticles(feed);
		}
		getArticles();
	}, []);

	return (
		<ArticlesContext.Provider value={{ articles, setArticles }}>
			{children}
		</ArticlesContext.Provider>
	);
};

export default ArticlesContext;

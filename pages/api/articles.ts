import parse from "rss-to-json";

export async function getArticlesRSS(rssURL: string) {
	let feed = await parse(rssURL);
	feed = {
		...feed,
		items: feed.items.map((item) => ({
			...item,
			label: item.title,
			enclosures: item.enclosures[0],
		})),
	};
	return feed;
}

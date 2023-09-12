import h from "vhtml";
import { Tip, TipFrontmatter } from "./resources/tip/TipModels";
import { Author, AuthorFrontmatter } from "./references/author/AuthorModels";
import { SiteCollections } from "./models";
import { Topic, TopicFrontmatter } from "./references/topic/TopicModels";
import { referenceCollections, resourceCollections, rootPath } from "./config";
import { vi } from "vitest";
import { EleventyPage, LayoutContext } from "../src/models";
import {
	BaseItem,
	ReferenceCollection,
	ResourceCollection,
} from "../src/ResourceModels";
import { resolveAllCollections } from "../src/registration";
import {
	Tutorial,
	TutorialFrontmatter,
} from "./resources/tutorial/TutorialModels";
import {
	TutorialStep,
	TutorialStepFrontmatter,
} from "./resources/tutorial/TutorialStepModels";
import {
	Playlist,
	PlaylistFrontmatter,
} from "./resources/playlist/PlaylistModels";
import { PaginationProps } from "./pagination/Pagination.11ty";
import { Article, ArticleFrontmatter } from "./resources/article/ArticleModels";
import { Channel, ChannelFrontmatter } from "./resources/channel/ChannelModels";
import { Link, LinkFrontmatter } from "./resources/link/LinkModels";

/**
 * Reusable test data``
 */
const content = `<p>Hello <em id="world">world</em>.</p>`;
const date = new Date(Date.UTC(2023, 1, 11));
const laterDate = new Date(Date.UTC(2023, 1, 22));

const children: string[] = [
	h("", {
		dangerouslySetInnerHTML: { __html: content },
	}),
];

const tipFrontmatters: TipFrontmatter[] = [
	{
		title: "Some Tip",
		date,
		resourceType: "tip",
		author: "sa",
		topics: ["sto", "ato", "sp", "ap", "ste", "ate"],
		thumbnail: "thumbnail.png",
		obsoletes: ["/oldtips/tip1/", "/oldtips/tip2/"],
		channel: "/channels/some-channel/",
	},
	{
		title: "Another Tip",
		date: laterDate,
		resourceType: "tip",
		author: "aa",
		tags: ["tag1", "tag2"],
		topics: ["sto", "ato", "ste", "ate"],
		thumbnail: "aa.png",
	},
];
// This is data shaped like the collection API sends it: data/page/content.
const tipItems: {
	content: string;
	data: TipFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...tipFrontmatters[0] },
		page: {
			fileSlug: "some-tip",
			url: "/tips/some-tip/",
			inputPath: `${rootPath}/tips/some-tip/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...tipFrontmatters[1] },
		page: {
			fileSlug: "another-tip",
			url: "/tips/another-tip/",
			inputPath: `${rootPath}/tips/another-tip/index.md`,
			date,
		},
	},
];
// This is data shaped like on our side.
const tipDatas: {
	data: TipFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...tipItems[0].data },
		page: tipItems[0].page,
	},
	{
		content,
		data: { ...tipItems[1].data },
		page: tipItems[1].page,
	},
];

const tips = await Promise.all(
	tipDatas.map(
		async (ref) =>
			await new Tip({
				data: ref.data,
				page: ref.page,
			}).init()
	)
);

const linkFrontmatters: LinkFrontmatter[] = [
	{
		title: "Some Link",
		date,
		resourceType: "link",
		author: "sa",
		topics: ["sto", "ato", "sp", "ap", "ste", "ate"],
		thumbnail: "thumbnail.png",
	},
	{
		title: "Another Link",
		date: laterDate,
		resourceType: "link",
		author: "aa",
		topics: ["sto", "ato", "ste", "ate"],
		thumbnail: "aa.png",
	},
];
const linkItems: {
	content: string;
	data: LinkFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...linkFrontmatters[0] },
		page: {
			fileSlug: "some-link",
			url: "/links/some-link/",
			inputPath: `${rootPath}/links/some-link/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...linkFrontmatters[1] },
		page: {
			fileSlug: "another-link",
			url: "/links/another-link/",
			inputPath: `${rootPath}/links/another-link/index.md`,
			date,
		},
	},
];
const linkDatas: {
	data: LinkFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...linkItems[0].data },
		page: linkItems[0].page,
	},
	{
		content,
		data: { ...linkItems[1].data },
		page: linkItems[1].page,
	},
];

const links = await Promise.all(
	linkDatas.map(
		async (ref) =>
			await new Link({
				data: ref.data,
				page: ref.page,
			}).init()
	)
);

const channelFrontmatters: ChannelFrontmatter[] = [
	{
		title: "Some Channel",
		date,
		resourceType: "channel",
		author: "sa",
		thumbnail: "thumbnail.png",
		subnav: [{ title: "First Link", url: "/first/" }],
	},
	{
		title: "Another Channel",
		date: laterDate,
		resourceType: "channel",
		author: "aa",
		thumbnail: "aa.png",
	},
];
const channelItems: {
	content: string;
	data: ChannelFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...channelFrontmatters[0] },
		page: {
			fileSlug: "some-channel",
			url: "/channels/some-channel/",
			inputPath: `${rootPath}/channels/some-channel/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...channelFrontmatters[1] },
		page: {
			fileSlug: "another-channel",
			url: "/channels/another-channel/",
			inputPath: `${rootPath}/channels/another-channel/index.md`,
			date,
		},
	},
];
const channelDatas: {
	data: ChannelFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...channelItems[0].data },
		page: channelItems[0].page,
	},
	{
		content,
		data: { ...channelItems[1].data },
		page: channelItems[1].page,
	},
];
const channels = await Promise.all(
	channelDatas.map(
		async (ref) =>
			await new Channel({
				data: ref.data,
				page: ref.page,
			}).init()
	)
);

const articleItems: {
	content: string;
	data: ArticleFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...tipFrontmatters[0] },
		page: {
			fileSlug: "some-article",
			url: "/articles/some-article/",
			inputPath: `${rootPath}/articles/some-article/index.md`,
			date,
		},
	},
];

const articleDatas: {
	data: TipFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...articleItems[0].data },
		page: articleItems[0].page,
	},
];

const authorsFrontmatters: AuthorFrontmatter[] = [
	{
		title: "Some Author",
		resourceType: "author",
		label: "sa",
		thumbnail: "sa.png",
	},
	{
		title: "Another Author",
		resourceType: "author",
		label: "aa",
		thumbnail: "aa.png",
	},
];
// This is data shaped like the collection API sends it: data/page/content.
const authorItems: {
	content: string;
	data: AuthorFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...authorsFrontmatters[0] },
		page: {
			fileSlug: "sa",
			url: "/authors/sa/",
			inputPath: `${rootPath}/authors/sa/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...authorsFrontmatters[1] },
		page: {
			fileSlug: "aa",
			url: "/authors/aa/",
			inputPath: "./site/webstorm-pycharm-webstorm-guide/authors/aa/index.md",
			date,
		},
	},
];
// This is data shaped like on our side.
const authorDatas: {
	data: AuthorFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...authorItems[0].data },
		page: authorItems[0].page,
	},
	{
		content,
		data: { ...authorItems[1].data },
		page: authorItems[1].page,
	},
];

const topicFrontmatters: TopicFrontmatter[] = [
	{
		title: "Some Topic",
		resourceType: "topic",
		label: "sto",
		accent: "st-accent",
		icon: "st-icon.png",
	},
	{
		title: "Another Topic",
		resourceType: "topic",
		label: "ato",
		accent: "at-accent",
		icon: "at-icon.png",
	},
	{
		title: "Some Technology",
		resourceType: "topic",
		label: "ste",
		logo: "stlogo.svg",
	},
	{
		title: "Another Technology",
		resourceType: "topic",
		label: "ate",
		logo: "atlogo.svg",
	},
	{
		title: "Some Product",
		resourceType: "topic",
		label: "sp",
		logo: "some.png",
	},
	{
		title: "Another Product",
		resourceType: "topic",
		label: "ap",
		logo: "another.png",
	},
];
// This is data shaped like the collection API sends it: data/page/content.
const topicItems: {
	content: string;
	data: TopicFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...topicFrontmatters[0] },
		page: {
			fileSlug: "ato",
			url: "/topics/ato/",
			inputPath: `${rootPath}/topics/ato/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...topicFrontmatters[1] },
		page: {
			fileSlug: "sto",
			url: "/topics/sto/",
			inputPath: `${rootPath}/products/sto/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...topicFrontmatters[2] },
		page: {
			fileSlug: "ste",
			url: "/topics/ste/",
			inputPath: `${rootPath}/topics/ste/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...topicFrontmatters[3] },
		page: {
			fileSlug: "ate",
			url: "/topics/ate/",
			inputPath: `${rootPath}/topics/ate/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...topicFrontmatters[4] },
		page: {
			fileSlug: "sp",
			url: "/topics/sp/",
			inputPath: `${rootPath}/topics/sp/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...topicFrontmatters[5] },
		page: {
			fileSlug: "ap",
			url: "/topics/ap/",
			inputPath: `${rootPath}/topics/ap/index.md`,
			date,
		},
	},
];
// This is data shaped like on our side.
const topicDatas: {
	data: TopicFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...topicItems[0].data },
		page: topicItems[0].page,
	},
	{
		content,
		data: { ...topicItems[1].data },
		page: topicItems[1].page,
	},
	{
		content,
		data: { ...topicItems[2].data },
		page: topicItems[2].page,
	},
	{
		content,
		data: { ...topicItems[3].data },
		page: topicItems[3].page,
	},
	{
		content,
		data: { ...topicItems[4].data },
		page: topicItems[4].page,
	},
	{
		content,
		data: { ...topicItems[5].data },
		page: topicItems[5].page,
	},
];

export const tutorialFrontmatters: TutorialFrontmatter[] = [
	{
		title: "Some Tutorial",
		resourceType: "tutorial",
		author: "sa",
		date,
		thumbnail: "thumbnail.png",
		tutorialItems: [
			"./some-tutorialstep",
			"./another-tutorialstep",
			"./third-tutorialstep",
		],
	},
	{
		title: "Another Tutorial",
		resourceType: "tutorial",
		author: "sa",
		date: laterDate,
		thumbnail: "thumbnail.png",
		tutorialItems: [],
	},
];

export const tutorialItems: {
	content: string;
	data: TutorialFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...tutorialFrontmatters[0] },
		page: {
			fileSlug: "some-tutorial",
			url: "/tutorials/some-tutorial/",
			inputPath: `${rootPath}/tutorials/some-tutorial/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...tutorialFrontmatters[1] },
		page: {
			fileSlug: "another-tutorial",
			url: "/tutorials/another-tutorial/",
			inputPath: `${rootPath}/tutorials/another-tutorial/index.md`,
			date,
		},
	},
];

export const tutorialDatas: {
	data: TutorialFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...tutorialItems[0].data },
		page: tutorialItems[0].page,
	},
	{
		content,
		data: { ...tutorialItems[1].data },
		page: tutorialItems[1].page,
	},
];

export const tutorialStepFrontmatters: TutorialStepFrontmatter[] = [
	{
		title: "Some Tutorial Step",
		resourceType: "tutorialstep",
		author: "sa",
		date,
		thumbnail: "thumbnail.png",
	},
	{
		title: "Another Tutorial Step",
		resourceType: "tutorialstep",
		author: "sa",
		thumbnail: "thumbnail.png",
		date,
	},
	{
		title: "Third Tutorial Step",
		resourceType: "tutorialstep",
		author: "sa",
		date,
		thumbnail: "thumbnail.png",
	},
];

export const tutorialStepItems: {
	content: string;
	data: TutorialStepFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...tutorialStepFrontmatters[0] },
		page: {
			fileSlug: "some-tutorialstep",
			url: "/tutorials/some-tutorial/some-tutorialstep/",
			inputPath: `${rootPath}/tutorials/some-tutorial/some-tutorialstep/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...tutorialStepFrontmatters[1] },
		page: {
			fileSlug: "another-tutorialstep",
			url: "/tutorials/some-tutorial/another-tutorialstep/",
			inputPath: `${rootPath}/tutorials/some-tutorial/another-tutorialstep/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...tutorialStepFrontmatters[2] },
		page: {
			fileSlug: "third-tutorialstep",
			url: "/tutorials/some-tutorial/third-tutorialstep/",
			inputPath: `${rootPath}/tutorials/some-tutorial/third-tutorialstep/index.md`,
			date,
		},
	},
];
export const tutorialStepDatas: {
	data: TutorialStepFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: {
			...tutorialStepItems[0].data,
		},
		page: tutorialStepItems[0].page,
	},
	{
		content,
		data: {
			...tutorialStepItems[1].data,
		},
		page: tutorialStepItems[1].page,
	},
	{
		content,
		data: {
			...tutorialStepItems[2].data,
		},
		page: tutorialStepItems[2].page,
	},
];

export const playlistFrontmatters: PlaylistFrontmatter[] = [
	{
		title: "Some Playlist",
		resourceType: "playlist",
		author: "sa",
		date,
		thumbnail: "thumbnail.png",
		playlistItems: ["/tips/some-tip/"],
	},
	{
		title: "Another Playlist",
		resourceType: "playlist",
		author: "sa",
		thumbnail: "thumbnail.png",
		date,
		playlistItems: [],
	},
];

export const playlistItems: {
	content: string;
	data: PlaylistFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...playlistFrontmatters[0] },
		page: {
			fileSlug: "some-playlist",
			url: "/playlists/some-playlist/",
			inputPath: `${rootPath}/playlists/some-playlist/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...playlistFrontmatters[1] },
		page: {
			fileSlug: "another-playlist",
			url: "/playlists/another-playlist/",
			inputPath: `${rootPath}/playlists/another-playlist/index.md`,
			date,
		},
	},
];

export const playlistDatas: {
	data: PlaylistFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...playlistItems[0].data },
		page: playlistItems[0].page,
	},
	{
		content,
		data: { ...playlistItems[1].data },
		page: playlistItems[1].page,
	},
];

// This data structure matches collections.all
// https://www.11ty.dev/docs/collections/#collection-item-data-structure
const all: BaseItem[] = [
	...tipItems,
	...tutorialItems,
	...tutorialStepItems,
	...authorItems,
	...topicItems,
	...playlistItems,
	...articleItems,
	...channelItems,
	...linkItems,
];

const authors = await Promise.all(
	authorDatas.map(
		async (ref) =>
			await new Author({
				data: ref.data,
				page: ref.page,
			}).init()
	)
);

const topics = await Promise.all(
	topicDatas.map(
		async (ref) =>
			await new Topic({
				data: ref.data,
				page: ref.page,
			}).init()
	)
);

const articles = await Promise.all(
	articleDatas.map(
		async (ref) =>
			await new Article({
				data: ref.data,
				page: ref.page,
			}).init()
	)
);

const tutorials = await Promise.all(
	tutorialDatas.map(
		async (ref) =>
			await new Tutorial({
				data: ref.data,
				page: ref.page,
			}).init()
	)
);

const tutorialSteps = await Promise.all(
	tutorialStepDatas.map(
		async (ref) =>
			await new TutorialStep({
				data: ref.data,
				page: ref.page,
			}).init()
	)
);

const playlists = await Promise.all(
	playlistDatas.map(
		async (ref) =>
			await new Playlist({
				data: ref.data,
				page: ref.page,
			}).init()
	)
);

const allResources: ResourceCollection = new Map();
[
	...tips,
	...tutorials,
	...tutorialSteps,
	...playlists,
	...channels,
	...links,
].forEach((resource) => allResources.set(resource.url, resource));

const allReferences: ReferenceCollection = new Map();
[...authors, ...topics].forEach((reference) => {
	// @ts-ignore
	const joinKey = reference.constructor.joinKey;
	const key = `${joinKey}:${reference.label}`;
	return allReferences.set(key, reference);
});

// Make duplicates as resolved collections
const clonedCollectionItems = structuredClone(all);
const resolvedCollections = await resolveAllCollections({
	allCollectionItems: clonedCollectionItems,
	resourceCollections,
	referenceCollections,
});
const resolvedResources = Array.from(resolvedCollections.allResources.values());
const resolvedReferences = Array.from(
	resolvedCollections.allReferences.values()
);
const collections: SiteCollections = {
	all,
	allResources,
	allReferences,
};

const getResource = vi.fn();
const getReference = vi.fn();
const renderMarkdown = (content: string): string => content;
const context: LayoutContext = {
	getResources: () =>
		Array.from(fixtures.resolvedCollections.allResources.values()),
	getResource,
	getReference,
	getReferences: () =>
		Array.from(fixtures.resolvedCollections.allReferences.values()),
	renderMarkdown,
};

export const commandLineArgs = { pathprefix: undefined };

export const baseRenderData = {
	collections: resolvedCollections,
	commandLineArgs,
	content: "",
};

const paginationItems = [...tipItems, ...articleItems] as const;

const paginationProps: PaginationProps = {
	pagination: {
		items: [...paginationItems],
		pageNumber: 0,
		hrefs: paginationItems.map((ti) => ti.page.url),
		href: {
			next: "tip5",
			previous: "tip3",
			first: "tip0",
			last: "tip6",
		},
	},
};
// Now assemble for export
const fixtures = {
	articles,
	authors,
	authorItems,
	children,
	collections,
	content,
	date,
	paginationProps,
	channels,
	channelItems,
	tips,
	tipItems,
	links,
	linkItems,
	topics,
	topicItems,
	tutorials,
	tutorialItems,
	tutorialSteps,
	tutorialStepItems,
	playlists,
	playlistItems,
	all,
	context,
	resolvedCollections,
	resolvedResources,
	resolvedReferences,
};
export default fixtures;

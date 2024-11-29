import { LayoutContext } from "../../src/models";
import ListingSection from "../../_includes/pageelements/ListingSection.11ty";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";
import {
	Channel,
	ChannelFrontmatter,
	ChannelHomepageData,
} from "../../_includes/resources/channel/ChannelModels";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import {
	ARTICLE_RESOURCE,
	PLAYLIST_RESOURCE,
	TIP_RESOURCE,
	TUTORIAL_RESOURCE,
} from "../../src/resourceType";

const frontmatter: ChannelFrontmatter = {
	title: "JavaScript and TypeScript",
	subtitle: "Increase your productivity \n and make amazing apps faster.",
	resourceType: "channel",
	date: new Date(Date.UTC(2020, 1, 11)),
	author: "pwe",
	accent: "primary",
	icon: "fa-brands fa-js",
	hero: "/assets/splashes/javascript.svg",
	logo: "thumbnail.svg",
	subnav: [
		{ title: "Tips", url: "/javascript/tips/" },
		{ title: "Links", url: "/javascript/links/" },
		{ title: "Tutorials", url: "/javascript/tutorials/" },
	],
};

export default class WebStormHomepage {
	data() {
		return {
			layout: "",
			...frontmatter,
		};
	}

	render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
		const channel: Channel = this.getResource(data.page.url) as Channel;
		const tips = this.getResources({
			resourceTypes: [TIP_RESOURCE],
			channel: channel.url,
			limit: 4,
		});

		const jsdayPlaylists = this.getResources({
			resourceTypes: [PLAYLIST_RESOURCE],
			channel: channel.url,
			limit: 4,
			customFilter: (r) => r.slug.indexOf("javascript-day") >= 0,
		});

		const otherTypes = this.getResources({
			resourceTypes: [TUTORIAL_RESOURCE, ARTICLE_RESOURCE],
			channel: channel.url,
			limit: 4,
		});

		return (
			<BaseLayout {...data}>
				<HeroSection
					title={channel.title}
					subtitle={channel.subtitle!}
					image={channel.hero!}
					titleExtraClass={"has-text-white has-text-shadow"}
					subtitleExtraClass={"has-text-white has-text-shadow"}
				/>
				{tips && (
					<ListingSection
						title={`Latest tips`}
						resources={tips}
						moreLink={`${channel.url}tips/`}
					/>
				)}

				{jsdayPlaylists && (
					<ListingSection
						title={`JavaScript Days`}
						resources={jsdayPlaylists}
						separator={false}
						includeCardFooter={false}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}
				{otherTypes && (
					<ListingSection
						title={`Latest articles and tutorials`}
						resources={otherTypes}
						moreLink={`${channel.url}tutorials/`}
					/>
				)}
			</BaseLayout>
		);
	}
}

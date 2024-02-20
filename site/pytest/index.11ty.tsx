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
	LINK_RESOURCE,
	TIP_RESOURCE,
	TUTORIAL_RESOURCE,
} from "../../src/resourceType";

const frontmatter: ChannelFrontmatter = {
	title: "pytest Framework",
	subtitle: "Discover one of Python's most popular test frameworks!",
	resourceType: "channel",
	date: new Date(Date.UTC(2024, 2, 19)),
	author: "hs",
	logo: "thumbnail.png",
	hero: "/assets/pytest_splash.svg",
	subnav: [
		{ title: "pytest", url: "https://www.jetbrains.com/help/idea/pytest.html" },
	],
};

class PytestHomepage {
	data() {
		return {
			layout: "",
			...frontmatter,
		};
	}

	render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
		const channel: Channel = this.getResource(data.page.url) as Channel;

		const links = this.getResources({
			resourceTypes: [LINK_RESOURCE],
			channel: channel.url,
			limit: 8,
		});

		const all = this.getResources({
			resourceTypes: [TIP_RESOURCE, TUTORIAL_RESOURCE, LINK_RESOURCE],
			channel: channel.url,
			customFilter: (r) =>
				r.channel == channel.url || r.topics?.includes("pytest") == true,
			limit: 4,
		});

		// const tips = this.getResources({
		// 	resourceTypes: [TIP_RESOURCE],
		// 	channel: channel.url,
		// 	//customFilter: (r) =>
		// 	//r.channel == channel.url || r.topics?.includes("pytest") == true,
		// 	limit: 4,
		// });

		// const tutorials = this.getResources({
		// 	resourceTypes: [TUTORIAL_RESOURCE],
		// 	channel: channel.url,
		// 	limit: 8,
		// });

		return (
			<BaseLayout {...data}>
				<HeroSection
					title={channel.title}
					subtitle={channel.subtitle!}
					image={channel.hero!}
					titleExtraClass={"has-text-white"}
					subtitleExtraClass={"has-text-white"}
				/>

				{/*{links && (*/}
				{/*	<ListingSection*/}
				{/*		title={`Latest links`}*/}
				{/*		resources={links}*/}
				{/*		separator={false}*/}
				{/*		includeCardFooter={false}*/}
				{/*		moreLink={`${channel.url}links/`}*/}
				{/*	/>*/}
				{/*)}*/}

				{all && (
					<ListingSection
						title={`Latest tips, tutorials and links`}
						resources={all}
						includeCardFooter={true}
						includeContentType={true}
						//moreLink={`${channel.url}tips/`}
						//sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}

				{/*{tutorials && (*/}
				{/*	<ListingSection*/}
				{/*		title={`Latest tutorials`}*/}
				{/*		resources={tutorials}*/}
				{/*		separator={false}*/}
				{/*		includeCardFooter={false}*/}
				{/*		moreLink={`${channel.url}tutorials/`}*/}
				{/*	/>*/}
				{/*)}*/}
			</BaseLayout>
		);
	}
}

module.exports = PytestHomepage;

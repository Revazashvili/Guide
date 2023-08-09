import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";
import SectionListing from "../../_includes/pageelements/SectionListing.11ty";
import BlockquoteSection from "../../_includes/pageelements/BlockquoteSection.11ty";
import CallToActionSection from "../../_includes/pageelements/CallToActionSection.11ty";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";

export type DotNetHomepageData = LayoutProps &
  BaseFrontmatter & {
    subtitle?: string;
  };

export class DotNetHomepage {
  data() {
    return {
      title: ".NET Guide",
      layout: "",
      eleventyExcludeFromCollections: true,
    };
  }

  render(this: LayoutContext, data: DotNetHomepageData): JSX.Element {
    const tips = this.getResources({
      resourceType: "tip",
      tag: "dotnet_tip",
      limit: 3,
    });

    const playlists = this.getResources({
      resourceType: "playlist",
      tag: "dotnet_playlist",
      limit: 3,
    });

    return (
      <BaseLayout {...data}>
        <HeroSection
          title=".NET Tools Guide"
          subtitle="Learning resources for ReSharper, Rider and more."
          image="/assets/dotnet_splash.png"
        />
        {tips && (
          <SectionListing
            title={`Recent Tips`}
            resources={tips}
            moreLink={`/dotnet/tips/`}
          />
        )}

        <section className="section has-background-grey-lighter">
          <div className="columns">
            <div className="column is-three-quarters-desktop">
              <div className="bd-content content">
                <div className="content">
                  <h2>Learn something new, quickly</h2>
                  <p>
                    JetBrains tools included in the
                    <a href="https://www.jetbrains.com/dotnet/">
                      dotUltimate pack
                    </a>
                    are powerful developer productivity tools. What is the best
                    way to learn how to harness that power?
                  </p>
                  <p>
                    You can find useful information on our Twitter accounts,
                    <a href="https://twitter.com/ReSharper">@ReSharper</a> and
                    <a href="https://twitter.com/JetBrainsRider">
                      @JetBrainsRider
                    </a>
                    , or our
                    <a href="https://blog.jetbrains.com/dotnet/">
                      product blog
                    </a>
                    . Plus, the
                    <a href="https://www.jetbrains.com/resharper/documentation/documentation.html">
                      documentation
                    </a>
                    is always there to help. However, wouldn't it be better if
                    you had everything you needed to learn in one place?
                  </p>
                  <p>
                    We have created the .NET Tools Guide, a collection of
                    bite-sized visual resources, organized to help spark your
                    learning. We hope it helps you get into the flow and excel
                    at what you do.
                  </p>
                  <h2>Sharing Feedback and Contributing</h2>
                  <p>
                    The .NET Tools Guide is also an open project, with
                    <a href="https://github.com/jetbrains/guide">
                      a repository in GitHub
                    </a>
                    that hosts all the content. We write all the content in
                    Markdown and render a static site. If you'd like to
                    contribute to it, please refer to the
                    <a href="https://github.com/jetbrains/guide/blob/master/README.md">
                      README
                    </a>
                    for more information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BlockquoteSection
          name="Michael Kennedy"
          title="Host"
          imageSrc="https://www.jetbrains.com/pycharm/img/user-imgs/img-michael-kennedy.png"
        >
          <p className="subtitle has-text-grey">
            I'm in the unique position of asking over 100 industry experts the
            following question on my Talk Python To Me podcast. "When you write
            some Python code, what editor do you open up?" While the answers
            vary, it is frequently PyCharm. The reasons the guests give are
            usually the same reasons I've been a PyCharm advocate for years.
          </p>
          <p className="subtitle has-text-grey">
            That's just a few reasons I open PyCharm daily to build my web
            properties and manage the software that runs my business.
          </p>
        </BlockquoteSection>

        {playlists && (
          <SectionListing
            title={`Recent Playlists`}
            resources={playlists}
            moreLink={`/dotnet/playlists/`}
          />
        )}

        <CallToActionSection
          title="Use your IDE on your favorite cloud platform."
          message="Experience a new compact application that connects you to lorem ipsum garbage stuff hey!"
          url="#"
          imageUrl="https://static.shuffle.dev/uploads/files/30/30bcf69416b378dce9b87d07a3491e56c3e9fdc6/Gateway-1680x1100.webp"
        />
      </BaseLayout>
    );
  }
}

module.exports = DotNetHomepage;

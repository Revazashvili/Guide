// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { SeeAlsos } from "../seealso/SeeAlso.11ty";
import SidebarPublished, {
  SidebarPublishedProps,
} from "./SidebarPublished.11ty";
import { SidebarDoclinkProps } from "./SidebarDoclink.11ty";
import Sidebar from "./Sidebar.11ty";
import SidebarReferencesGroup from "./SidebarReferencesGroup.11ty";
import SidebarDoclinks from "./SidebarDoclinks.11ty";
import { Author } from "../references/author/AuthorModels";
import { Topic } from "../references/topic/TopicModels";

export type TipSidebarProps = {
  displayDate: string;
  author: Author;
  topics: Topic[];
  hasBody?: boolean;
  seealsos?: SeeAlsos;
  longVideo: any;
};
const TipSidebar = ({
  author,
  hasBody,
  displayDate,
  longVideo,
  seealsos,
  topics,
}: TipSidebarProps): JSX.Element => {
  const published: SidebarPublishedProps = {
    author,
    displayDate,
  };
  const links: SidebarDoclinkProps[] = [];
  if (hasBody) {
    links.push({
      label: "In Depth",
      target: "in-depth",
    });
  }
  if (seealsos) {
    links.push({
      label: "See Also",
      target: "see-also",
    });
  }
  if (longVideo) {
    links.push({
      label: "Full Video",
      target: "full-video",
    });
  }
  return (
    <Sidebar>
      <SidebarPublished {...published} />
      <SidebarReferencesGroup
        reftype={`topics`}
        accent={`success`}
        references={topics}
      />
      <SidebarDoclinks links={links} />
    </Sidebar>
  );
};

export default TipSidebar;

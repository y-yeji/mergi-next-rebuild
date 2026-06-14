import Postcard from "../common/Postcard";
import StatusBadge from "../common/StatusBadge";

interface PostcardSectionList {
  title: string;
  badgeType: "success" | "warning" | "danger" | "done";
  badgeText: string;
}

const postList = [
  {
    id: 1,
    usernickName: "파파고",
    content:
      "멋진프로젝트를 만들어봅시다 주제는 파파고 api를 이용한 어쩌고입니다 모집합니다모집합니다모집합니다모집...",
    created_at: 20250813,
  },
  {
    id: 2,
    usernickName: "파파고",
    content:
      "멋진프로젝트를 만들어봅시다 주제는 파파고 api를 이용한 어쩌고입니다 모집합니다모집합니다모집합니다모집...",
    created_at: 20250813,
  },
  {
    id: 3,
    usernickName: "파파고",
    content:
      "멋진프로젝트를 만들어봅시다 주제는 파파고 api를 이용한 어쩌고입니다 모집합니다모집합니다모집합니다모집...",
    created_at: 20250813,
  },
  {
    id: 4,
    usernickName: "파파고",
    content:
      "멋진프로젝트를 만들어봅시다 주제는 파파고 api를 이용한 어쩌고입니다 모집합니다모집합니다모집합니다모집...",
    created_at: 20250813,
  },
];

const PostcardSectionList = ({
  title,
  badgeType,
  badgeText,
}: PostcardSectionList) => {
  return (
    <article className="mb-15">
      <h2 className="flex items-center  gap-[10px] mb-6 h1-b text-gray-90">
        {title}
        <StatusBadge badgeType={badgeType} badgeText={badgeText} />
      </h2>
      <div className="flex gap-[30px]">
        {postList.map((item) => (
          <Postcard
            key={item.id}
            postId={item.id}
            usernickName={item.usernickName}
            content={item.content}
            created_at={item.created_at}
          />
        ))}
      </div>
    </article>
  );
};

export default PostcardSectionList;

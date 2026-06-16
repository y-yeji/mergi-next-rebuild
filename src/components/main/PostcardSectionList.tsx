import { PostRpcRow } from "@/types/post";
import Postcard from "../common/Postcard";
import StatusBadge from "../common/StatusBadge";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CustomCarouselButtons } from "../common/CarouselButtom";

interface PostcardSectionList {
  title: string;
  badgeType: "success" | "warning" | "danger" | "done";
  badgeText: string;
  posts: PostRpcRow[];
}

const PostcardSectionList = ({
  title,
  badgeType,
  badgeText,
  posts,
}: PostcardSectionList) => {
  return (
    <Carousel
      className="w-full overflow-hidden"
      opts={{ loop: true, align: "start" }}
    >
      <article className="mb-15">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-[10px] h1-b text-gray-90">
            {title}
            <StatusBadge badgeType={badgeType} badgeText={badgeText} />
          </h2>
          <div className="flex gap-2">
            <CustomCarouselButtons />
          </div>
        </div>
        <CarouselContent className="ml-0">
          {posts.map((post) => (
            <CarouselItem key={post.id} className="pr-6 pl-0 basis-[280px]">
              <Postcard
                key={post.id}
                postId={post.id}
                usernickName={post.name ?? "알 수 없음"}
                content={post.content}
                end_date={post.end_date}
                tecthStack={post.techStack ?? []}
                position={post.position ?? []}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </article>
    </Carousel>
  );
};

export default PostcardSectionList;

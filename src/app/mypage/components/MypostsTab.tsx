import Postcard from "@/components/common/Postcard";
import { Button } from "@/components/ui/button";
import { id } from "date-fns/locale";
import Link from "next/link";

interface MyPostsTabProps {
  post: {
    id: number;
    content: string;
    end_date: string;
    recruit_field: string;
    post_positions: { position: string }[];
    post_stacks: { stack: string }[];
  }[];
  userNickName: string | undefined;
}

const MyPostsTab = ({ post, userNickName }: MyPostsTabProps) => {
  const hasPost = post.length > 0;

  return (
    <div className="pb-10">
      {hasPost ? (
        <section className="flex flex-wrap gap-4 py-4">
          {post.map((post) => (
            <Postcard
              key={post.id}
              postId={post.id}
              usernickName={userNickName ?? "알 수 없음"}
              content={post.content}
              end_date={post.end_date}
              techStack={post.post_stacks.map((s) => s.stack)}
              position={post.recruit_field.split(", ")}
            />
          ))}
        </section>
      ) : (
        <section className="h-[715px] mx-auto mt-48">
          <div className="flex flex-col justify-center items-center">
            <h3 className="h3-b text-center text-primary-4 mb-5">
              아직 작성한 모집글이 없습니다.
            </h3>
            <Link href="/">
              <Button className="w-[177px] h-[41px]  py-[8.5px] px-[25px] text-center rounded-lg body-large-m text-white bg-primary-3 hover:bg-primary-3  cursor-pointer">
                모집하러 가볼까요?
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default MyPostsTab;

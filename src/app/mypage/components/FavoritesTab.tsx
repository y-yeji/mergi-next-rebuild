import Postcard from "@/components/common/Postcard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FavoritesTabProps {
  favoritePost: {
    id: number;
    content: string;
    end_date: string;
    recruit_field: string;
    author: string;
    authorName: string;
    post_positions: { position: string }[];
    post_stacks: { stack: string }[];
    // user_list: { name: string }[];
  }[];
}

const FavoritesTab = ({ favoritePost }: FavoritesTabProps) => {
  const hasFavoritePost = favoritePost.length > 0;
  return (
    <div className="px-4">
      {hasFavoritePost ? (
        <section>
          <ul className="flex flex-wrap justify-between gap-4 py-4">
            {favoritePost.map((postItem) => (
              <li key={postItem.id} className="mb-8 last:mb-0">
                <Postcard
                  key={postItem.id}
                  postId={postItem.id}
                  usernickName={postItem.authorName}
                  content={postItem.content}
                  end_date={postItem.end_date}
                  techStack={postItem.post_stacks.map((s) => s.stack)}
                  position={postItem.recruit_field.split(", ")}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="h-[715px] mx-auto mt-48">
          <div className="flex flex-col justify-center items-center">
            <h3 className="h3-b text-center text-primary-4 mb-5">
              찜 목록이 없습니다.
            </h3>
            <Link href="/">
              <Button className="w-[177px] h-[41px]  py-[8.5px] px-[25px] text-center rounded-lg body-large-m text-white bg-primary-3 hover:bg-primary-3  cursor-pointer">
                찾아보러 가볼까요?
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};
export default FavoritesTab;

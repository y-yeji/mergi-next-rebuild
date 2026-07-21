import Postcard from "@/components/common/Postcard";
import { Button } from "@/components/ui/button";
import { PostRpcRow } from "@/types/post";
import Link from "next/link";
interface FavoritesTabProps {
  favoritePost: (PostRpcRow & { name?: string })[];
}

const FavoritesTab = ({ favoritePost }: FavoritesTabProps) => {
  const hasFavoritePost = favoritePost.length > 0;
  return (
    <div className="px-4">
      {hasFavoritePost ? (
        <section>
          <ul className="flex flex-wrap gap-4 py-4">
            {favoritePost.map((post) => (
              <li key={post.id} className="mb-8 last:mb-0">
                <Postcard
                  postId={post.id}
                  usernickName={post.name ?? "알 수 없음"}
                  content={post.content}
                  end_date={post.end_date}
                  techStack={post.techStack ?? []}
                  position={post.position ?? []}
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

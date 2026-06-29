import { createClient } from "@/lib/supabase/server";
import MypageView from "./components/MypageView";
import { redirect } from "next/navigation";

const Page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  console.log("user:", user);
  console.log("user.id:", user.id);
  const { data: profile, error } = await supabase
    .from("user_list")
    .select(
      `
    *,
    user_list_positions (
      id,
      position,
      user_list_stacks (
        stacks
      )
    )
  `,
    )
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: post, error: postError } = await supabase
    .from("post")
    .select(
      `
    *,
    post_positions (
      position
    ),
    post_stacks (
      stack
    )
  `,
    )
    .eq("author", user.id);

  console.log("post:", post);
  console.log("postError:", postError);
  console.log("post raw:", JSON.stringify(post, null, 2));

  return <MypageView profile={profile} post={post ?? []} />;
};

export default Page;

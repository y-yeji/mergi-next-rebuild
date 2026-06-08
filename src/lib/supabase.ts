import { createBrowserClient } from "@supabase/ssr";
import type {
  Database as GeneratedDatabase,
  Json,
} from "@/types/database.types";

import { PostCommentEntity } from "@/types/type";
import { PostFilters, PostPaginationResult, PostRpcRow } from "@/types/post";

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

export const createClient = () => {
  if (client) return client;

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  return client;
};

export interface Database extends GeneratedDatabase {
  public: {
    Tables: GeneratedDatabase["public"]["Tables"];
    Views: GeneratedDatabase["public"]["Views"];
    Enums: GeneratedDatabase["public"]["Enums"];
    CompositeTypes: GeneratedDatabase["public"]["CompositeTypes"];

    Functions: GeneratedDatabase["public"]["Functions"] & {
      get_all_posts: {
        Args: {
          filters: PostFilters;
          size: number;
        };
        Returns: PostRpcRow[];
      };

      get_filtered_posts_with_pagination: {
        Args: {
          filters: PostFilters;
          page: number;
          page_size: number;
        };
        Returns: PostPaginationResult;
      };

      get_my_apply_posts: {
        Args: {
          filters: PostFilters;
          page: number;
          page_size: number;
        };
        Returns: PostPaginationResult;
      };

      get_user_bookmarks_with_pagination: {
        Args: {
          filters: PostFilters;
          page: number;
          page_size: number;
        };
        Returns: PostPaginationResult;
      };

      get_post_by_user_with_pagination: {
        Args: {
        filters: PostFilters;
          page: number;
          page_size: number;
          user_id: string;
        };
        Returns: PostPaginationResult;
      };

      check_username_duplicate: {
        Args: {
          user_name: string;
        };
        Returns: boolean;
      };
      toggle_post_like: {
        Args: {
          input_post_id: number;
        };
        Returns: {
          isLiked: boolean;
          postId: number;
        };
      };

      get_user_post_likes: {
        Args: Record<PropertyKey, never>;
        Returns: {
          post_id: number;
        }[];
      };

      toggle_bookmark: {
        Args: {
          post_id: number;
        };
        Returns: {
          isBookmarked: boolean;
          postId: number;
        };
      };
      add_post_comment: {
        Args: {
          p_post_id: number;
          p_content: string;
        };
        Returns: boolean;
      };

      get_comments_by_post: {
        Args: {
          p_post_id: number;
        };
        Returns: PostCommentEntity[];
      };

      delete_post_comment: {
        Args: {
          p_comment_id: number;
          p_post_id: number;
        };
        Returns: boolean;
      };

      update_post_comment: {
        Args: {
          p_comment_id: number;
          p_content: string;
          p_post_id: number;
        };
        Returns: boolean;
      };

      is_user_post_author: {
        Args: { post_id: number };
        Returns: boolean;
      };
    };
  };
}

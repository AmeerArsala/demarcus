import type { IReactionGroups } from "./adapter";

export type InputPosition = "top" | "bottom";

export type CommentOrder = "oldest" | "newest";

export type DemarcusMessage = string | "SIGN_OUT";

export interface ITokenRequest {
  session: string;
}

export interface ITokenResponse {
  token: string;
}

export interface IRepoConfig {
  origins?: string[];
  originsRegex?: string[];
  defaultCommentOrder?: CommentOrder;
}

export interface IDiscussionData {
  id: string;
  url: string;
  locked: boolean;
  repository: {
    nameWithOwner: string;
  };
  reactionCount: number;
  totalCommentCount: number;
  totalReplyCount: number;
  reactions: IReactionGroups;
}

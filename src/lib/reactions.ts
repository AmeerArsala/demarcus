import type {
  IComment,
  IGiscussion,
  IReactionGroups,
  IReply,
} from "./types/adapter.ts";

export const Reactions = {
  THUMBS_UP: "👍",
  THUMBS_DOWN: "👎",
  LAUGH: "😄",
  HOORAY: "🎉",
  CONFUSED: "😕",
  HEART: "❤️",
  ROCKET: "🚀",
  EYES: "👀",
} as const;

export const ReactionIDs = {
  THUMBS_UP: "+1",
  THUMBS_DOWN: "-1",
  LAUGH: "Laugh",
  HOORAY: "Hooray",
  CONFUSED: "Confused",
  HEART: "Love",
  ROCKET: "Rocket",
  EYES: "Eyes",
} as const;

export type Reaction = keyof typeof Reactions;

function updateReactionGroups(
  reactionGroups: IReactionGroups,
  reaction: Reaction,
) {
  const diff = reactionGroups[reaction].viewerHasReacted ? -1 : 1;
  return [
    {
      ...reactionGroups,
      [reaction]: {
        count: reactionGroups[reaction].count + diff,
        viewerHasReacted: !reactionGroups[reaction].viewerHasReacted,
      },
    },
    diff,
  ] as [IReactionGroups, number];
}

export function updateDiscussionReaction(
  page: IGiscussion,
  reaction: Reaction,
) {
  const [newReactions, diff] = updateReactionGroups(
    page.discussion.reactions,
    reaction,
  );
  return {
    ...page,
    discussion: {
      ...page.discussion,
      reactionCount: page.discussion.reactionCount + diff,
      reactions: newReactions,
    },
  } as IGiscussion;
}

export function updateCommentReaction<T extends IComment | IReply = IComment>(
  comment: T,
  reaction: Reaction,
) {
  const [newReactions] = updateReactionGroups(comment.reactions, reaction);
  return {
    ...comment,
    reactions: newReactions,
  } as T;
}

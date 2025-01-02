import type { GCreateDiscussionInput } from "@lib/demarcus/types/github";
import { HOST_URL } from "@lib/demarcus/constants";

export async function createDiscussion(
  repo: string,
  input: GCreateDiscussionInput
): Promise<string> {
  const res = (await fetch(`${HOST_URL}/api/discussions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ repo, input }),
  }).then((r) => r.json())) as any;
  return res.id;
}
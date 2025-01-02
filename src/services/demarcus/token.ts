import type { IError } from "@lib/types/adapter.ts";
import type { ITokenRequest, ITokenResponse } from "@lib/types/demarcus.ts";
import { HOST_URL } from "@lib/constants.ts";

export async function getToken(session: string) {
  const reqBody = JSON.stringify({ session } as ITokenRequest);

  const result: ITokenResponse | IError = await fetch(
    `${HOST_URL}/api/oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqBody,
    },
  ).then((r) => r.json());

  if ("error" in result) throw new Error(result.error);

  const { token } = result;
  if (!token) throw new Error("Unable to retrieve token.");

  return token;
}

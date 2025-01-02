import { createContext } from "react";
import type { CommentOrder, InputPosition } from "./types/demarcus";
import { HOST_URL } from "@lib/demarcus/constants";

interface IAuthContext {
  token: string;
  origin: string;
  getLoginUrl: (origin: string) => string;
  onSignOut: () => void;
}

export function getLoginUrl(origin: string, trailingSlashOnRedirect: 1 | 0) {
  return `${HOST_URL}/api/oauth/authorize?redirect_uri=${encodeURIComponent(origin)}&trailing_slash=${trailingSlashOnRedirect}`;
}

const defaultGetLoginUrl = (origin: string) => getLoginUrl(origin, 0);

export const AuthContext = createContext<IAuthContext>({
  token: "",
  origin: "",
  getLoginUrl: defaultGetLoginUrl,
  onSignOut() {
    return;
  },
});

interface IConfigContext {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  term: string;
  description: string;
  backLink: string;
  number: number;
  strict: boolean;
  reactionsEnabled: boolean;
  inputPosition: InputPosition;
  defaultCommentOrder: CommentOrder;
}

export const ConfigContext = createContext<IConfigContext>({
  repo: "",
  repoId: "",
  category: "",
  categoryId: "",
  term: "",
  description: "",
  backLink: "",
  number: 0,
  strict: false,
  reactionsEnabled: true,
  inputPosition: "bottom",
  defaultCommentOrder: "oldest",
});

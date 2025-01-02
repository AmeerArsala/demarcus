import { atom } from "nanostores";
import type { DemarcusMessage } from "./types/demarcus.ts";

export const message = atom<DemarcusMessage>("");

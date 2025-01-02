import { atom } from "nanostores";
import type { DemarcusMessage } from "./types/demarcus";

export const message = atom<DemarcusMessage>("");

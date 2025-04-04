export const characters = ["joseok", "yumi"] as const;
export type Character = (typeof characters)[number];
export interface Assistant {
  id?: string;
  character?: Character;
  threadId?: string;
}
export type AssistantCharacter = keyof typeof assistantMap;
export const assistantMap: Record<Character, string> = {
  joseok: "asst_bXvo0TUKd3WumDq2wdLxTK5R",
  yumi: "asst_a3t8TALA1RTcD4gV3zcn7LQX",
};

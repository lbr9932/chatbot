import { notFound } from "next/navigation";
import Chat from "./Chat";
import {
  AssistantCharacter,
  characters as baseCharacters,
} from "@/constants/assistant";

export default async function Page({
  params,
}: {
  params: Promise<{ character: AssistantCharacter }>;
}) {
  const { character } = await params;

  if (!character || !baseCharacters.includes(character)) {
    return notFound();
  }

  return <Chat character={character} />;
}

import { notFound } from "next/navigation";
import Chat from "./Chat";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  return <Chat />;
}

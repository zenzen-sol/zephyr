import { database } from "@/lib/database";
import Header from "./Header";

export default async function Home() {
  const db = await database();

  return (
    <main className="mx-auto max-w-5xl">
      <Header />
    </main>
  );
}

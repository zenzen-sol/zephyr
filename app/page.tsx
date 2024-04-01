import AddAccountForm from "./AddAccountForm";
import Header from "./Header";

export default async function Home() {
  return (
    <main className="mx-auto max-w-5xl">
      <Header />
      <AddAccountForm />
    </main>
  );
}

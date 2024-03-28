import SignUpForm from "./components/SignUpForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello Home !</h1>
      <SignUpForm />
    </main>
  );
}

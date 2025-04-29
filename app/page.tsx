import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
  return (
    <div className="flex justify-around items-center p-2 text-center">
      <h1 className="text-3xl font-semibold">
        Fit<span className="text-blue-700">To</span>Work
      </h1>
    </div>
  );
}

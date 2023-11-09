import AuthBackground from "@/components/Auth/AuthBackground";
import Header from "@/components/Header";
import { authOptions } from "@/lib/util/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GitHub } from "react-feather";

export default async function Home() {
  const session: any = await getServerSession(authOptions);

  if (session && session.accessToken) {
    redirect("/me");
  }

  function getFormattedDate(): string {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const today = new Date();
    const dayName = daysOfWeek[today.getDay()];
    const date = today.getDate();
    const monthName = monthsOfYear[today.getMonth()];
    const year = today.getFullYear();

    return `${dayName} ${date} ${monthName} ${year}`;
  }

  return (
    <main className="flex min-h-screen flex-col bg-light_bg dark:bg-dark_bg items-center justify-center">
      <Header />

      <div className="h-[80vh] absolute bottom-0 overflow-auto w-1/2 items-start justify-start flex flex-col">
        <h4 className="font-semibold underline text-2xl text-black dark:text-white">
          {getFormattedDate()}
        </h4>

        <p className="font-lyon mt-2 text-lg text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)]">
          Let's get started! Click the button below to create your first todo
        </p>

        <button className="rounded-full text-sm bg-black dark:bg-white shadow-lg px-4 py-3 text-white dark:text-black font-semibold mt-5">
          Create Todo
        </button>
      </div>

      <div
        className="absolute bottom-5 right-5 flex flex-row items-center justify-center text-black dark:text-white"
        style={{ fontSize: "0.8rem" }}
      >
        Made with ❤️ by{" "}
        <a
          href="https://github.com/jacobslunga"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 brush ml-1 flex flex-row items-center justify-center"
        >
          @jacobslunga
          <GitHub className="text-black dark:text-white ml-2" size={15} />
        </a>
      </div>

      {!session && <AuthBackground />}
    </main>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function JoinTheExperiment() {
  const supabase = await createClient();

  // Get session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = !!user;
  const buttonLabel = isLoggedIn ? "Go to Your Logbook" : "Create Your Account";
  const buttonHref = isLoggedIn ? "/dashboard/plants" : "/signup";

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-10 py-20">
      <div className="bg-gradient-to-br from-future-lime/20 to-milk-bio rounded-3xl p-10 text-center shadow">
        <h2 className="text-3xl font-bold text-moss-shadow mb-4">
          Ready to Start Your Own Culture?
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          {isLoggedIn
            ? "Jump back into your logbook and keep growing your collection."
            : "Create an account, log your first plant, and join our growing community of experimenters and growers."}
        </p>
        <Link
          href={buttonHref}
          className="inline-block bg-[var(--future-lime)] hover:bg-lime-500 text-black font-semibold px-6 py-3 rounded-full transition-colors"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}

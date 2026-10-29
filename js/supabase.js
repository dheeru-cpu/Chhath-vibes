
/* Chhath Vibes — Supabase connection */
(function () {
  const SUPABASE_URL = "https://jpejjdknjmwqvwrfdgka.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_gNJY3sEOrktnOSRzis71Jw_7NXE5ZKs";

  if (
    !window.supabase ||
    typeof window.supabase.createClient !== "function"
  ) {
    console.error(
      "[Chhath Vibes] Supabase SDK load nahi hua."
    );
    return;
  }

  window.chhathSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  console.info("[Chhath Vibes] Supabase client ready.");
})();

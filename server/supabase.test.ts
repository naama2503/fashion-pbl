import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";

describe("Supabase Connection", () => {
  it("should connect to Supabase and verify credentials", async () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseKey).toBeDefined();

    const supabase = createClient(supabaseUrl!, supabaseKey!);
    
    // Test connection by fetching auth user (should work even if not authenticated)
    const { data, error } = await supabase.auth.getSession();
    
    // Connection successful if no network error
    expect(error).toBeNull();
  });
});

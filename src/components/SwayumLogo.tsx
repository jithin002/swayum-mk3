
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const LOGO_KEY = "header_logo";

const SwayumLogo: React.FC<{ size?: number }> = ({ size = 44 }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogoUrl() {
      setLoading(true);
      const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("key", LOGO_KEY)
        .maybeSingle();
      if (error || !data?.value) {
        setLogoUrl(null);
      } else {
        setLogoUrl(data.value);
      }
      setLoading(false);
    }
    fetchLogoUrl();
  }, []);

  if (loading) {
    return (
      <div
        className="rounded-full bg-gray-200 animate-pulse"
        style={{ width: size, height: size }}
        aria-label="Logo loading"
      />
    );
  }

  if (!logoUrl) {
    // Fallback to a generic placeholder (orange circle with S)
    return (
      <div
        className="rounded-full bg-swayum-orange flex items-center justify-center text-white font-bold"
        style={{ width: size, height: size, fontSize: size / 2 }}
        aria-label="Fallback logo"
      >
        S
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt="SwaYum logo"
      className="rounded-full object-cover border-2 border-white bg-white"
      style={{
        width: size,
        height: size,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
      onError={(e) => {
        // fallback on error
        (e.target as HTMLImageElement).src =
          "https://placehold.co/44x44/orange/FFF?text=S";
      }}
      loading="lazy"
    />
  );
};

export default SwayumLogo;

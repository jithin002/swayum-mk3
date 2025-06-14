
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SwayumLogoProps {
  className?: string;
  size?: number;
}

const PLACEHOLDER = "/placeholder.svg";

const LOGO_KEY = "header_logo";

// Try to fetch the logo from a hypothetical "settings" table or storage
const getLogoUrl = async (): Promise<string | null> => {
  // 1. Try to fetch from a "settings" table where logo_url is stored
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", LOGO_KEY)
    .single();

  if (error || !data?.value) {
    // 2. Optionally: fallback to a public storage bucket path
    // const { data: storageData } = supabase.storage
    //   .from("public-assets")
    //   .getPublicUrl("swayum-logo.png");
    // return storageData?.publicUrl ?? null;

    return null;
  }
  return data.value;
};

const SwayumLogo: React.FC<SwayumLogoProps> = ({ className = "", size = 40 }) => {
  const [logoUrl, setLogoUrl] = useState<string>(PLACEHOLDER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getLogoUrl().then((url) => {
      if (mounted) {
        setLogoUrl(url || PLACEHOLDER);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div
        className={`h-[${size}px] w-[${size}px] rounded-full bg-gray-100 animate-pulse mr-2 border shadow ${className}`}
        style={{ minWidth: size, minHeight: size }}
        aria-label="Logo loading"
      />
    );
  }

  return (
    <img
      src={logoUrl}
      alt="SwaYum Logo"
      className={`object-cover rounded-full mr-2 border shadow ${className}`}
      style={{ height: size, width: size, background: "white" }}
      loading="lazy"
    />
  );
};

export default SwayumLogo;

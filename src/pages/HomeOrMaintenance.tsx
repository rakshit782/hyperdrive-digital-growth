import { useState, useEffect } from "react";
import Index from "./Index";
import Maintenance from "./Maintenance";
import { fetchSiteSettings } from "@/hooks/useSiteSettings";

export default function HomeOrMaintenance() {
  const [isMaintenance, setIsMaintenance] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const local = localStorage.getItem("maintenance_mode");
    return local === "true";
  });

  useEffect(() => {
    // 1. Fetch live status from database
    fetchSiteSettings()
      .then((data) => {
        const active = data.maintenance_mode === true;
        setIsMaintenance(active);
        localStorage.setItem("maintenance_mode", active ? "true" : "false");
      })
      .catch((err) => {
        console.warn("Could not check maintenance mode, defaulting to live:", err);
      });

    // 2. Listen to real-time updates from Dashboard toggles
    const handleUpdate = () => {
      const local = localStorage.getItem("maintenance_mode");
      setIsMaintenance(local === "true");
    };

    window.addEventListener("maintenance-mode-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("maintenance-mode-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  if (isMaintenance) {
    return <Maintenance />;
  }

  return <Index />;
}

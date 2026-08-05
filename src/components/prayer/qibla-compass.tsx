"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QiblaCompass() {
  const [heading, setHeading] = useState<number | null>(null);
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isCalibrating, setIsCalibrating] = useState(false);

  const MECCA_LAT = 21.422487;
  const MECCA_LNG = 39.826206;

  const calculateQibla = (lat: number, lng: number) => {
    const latK = MECCA_LAT * (Math.PI / 180.0);
    const lngK = MECCA_LNG * (Math.PI / 180.0);
    const phi = lat * (Math.PI / 180.0);
    const lambda = lng * (Math.PI / 180.0);

    const y = Math.sin(lngK - lambda);
    const x = Math.cos(phi) * Math.tan(latK) - Math.sin(phi) * Math.cos(lngK - lambda);
    
    let qibla = Math.atan2(y, x) * (180.0 / Math.PI);
    qibla = (qibla + 360) % 360;
    setQiblaAngle(qibla);
  };

  const startCompass = async () => {
    setIsCalibrating(true);
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => calculateQibla(pos.coords.latitude, pos.coords.longitude),
          (err) => setError("Akses lokasi ditolak. Qibla mungkin tidak akurat.")
        );
      } else {
        setError("Browser tidak support Geolocation");
      }

      // Fallback if AbsoluteOrientationSensor is not available
      if (window.DeviceOrientationEvent) {
        // @ts-ignore
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          // @ts-ignore
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission !== 'granted') throw new Error('Permission denied');
        }
        
        window.addEventListener("deviceorientationabsolute", handleOrientation as any);
        // Fallback for devices without absolute orientation
        window.addEventListener("deviceorientation", handleOrientation);
      } else {
        setError("Browser tidak support sensor kompas.");
      }
    } catch (e: any) {
      setError(e.message || "Gagal mengaktifkan kompas");
    } finally {
      setIsCalibrating(false);
    }
  };

  const handleOrientation = (e: DeviceOrientationEvent) => {
    // @ts-ignore
    let h = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    if (h !== null && !isNaN(h)) setHeading(h);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation as any);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const isPointingToQibla = heading !== null && qiblaAngle !== null && Math.abs(heading - qiblaAngle) < 5;

  return (
    <div className="rounded-xl border bg-card p-6 flex flex-col items-center justify-center text-center">
      <h3 className="font-display font-bold text-xl mb-6">Arah Kiblat</h3>
      
      <div className="relative w-48 h-48 mb-8">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-muted flex items-center justify-center">
          <div className="absolute top-2 font-bold text-muted-foreground text-xs">U</div>
          <div className="absolute bottom-2 font-bold text-muted-foreground text-xs">S</div>
          <div className="absolute right-2 font-bold text-muted-foreground text-xs">T</div>
          <div className="absolute left-2 font-bold text-muted-foreground text-xs">B</div>
        </div>

        {heading !== null && qiblaAngle !== null ? (
          <>
            {/* Kaaba Indicator */}
            <motion.div
              className="absolute inset-0 z-10"
              animate={{ rotate: qiblaAngle - heading }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-emerald text-white p-1 rounded-full shadow-lg z-20">
                🕋
              </div>
            </motion.div>

            {/* Compass Needle */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-1 h-32 bg-primary rounded-full relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full" />
              </div>
            </div>
            
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gold rounded-full z-30" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Compass className="h-16 w-16 text-muted-foreground/30 animate-pulse" />
          </div>
        )}
      </div>

      {isPointingToQibla && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-emerald font-bold mb-4 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald"></span>
          </span>
          Arah Kiblat Tepat!
        </motion.div>
      )}

      {heading === null && !error && (
        <Button onClick={startCompass} disabled={isCalibrating}>
          {isCalibrating ? "Kalibrasi..." : "Aktifkan Kompas"}
        </Button>
      )}

      {error && (
        <p className="text-sm text-destructive mt-4 px-4 bg-destructive/10 py-2 rounded-lg">{error}</p>
      )}
    </div>
  );
}

import { useState, useEffect, useRef, useCallback } from "react";

export function useAutoCollapse(timeout = 3000) {
  const [folded, setFolded] = useState(false); // starts expanded
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    // Clear old timer
    if (timerRef.current) clearTimeout(timerRef.current);
    // Start a new timer that will fold after inactivity
    timerRef.current = setTimeout(() => {
      setFolded(true);
    }, timeout);
  }, [timeout]);

  const handleInteraction = useCallback(() => {
    // Expand on interaction
    setFolded(false);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    // Start the timer on mount (so it folds after 3s if no interaction)
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer]);

  return { folded, setFolded, handleInteraction };
}

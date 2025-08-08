// hooks/useTimer.tsx
// Hook pour gérer le compteur temporel d'urgence avec persistance
// Reset quotidien automatique pour maintenir l'urgence

'use client';

import { useState, useEffect, useCallback } from 'react';

interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
  isActive: boolean;
  formattedTime: string;
}

const TIMER_DURATION = 7 * 60 * 60 + 38 * 60 + 29; // 7h 38min 29s en secondes
const STORAGE_KEY = 'maju_timer';
const LAST_RESET_KEY = 'maju_timer_reset';

export const useTimer = () => {
  const [timer, setTimer] = useState<TimerState>({
    hours: 7,
    minutes: 38,
    seconds: 29,
    isActive: true,
    formattedTime: 'Il reste 7h 38min 29s',
  });

  // Formater le temps restant
  const formatTime = useCallback((totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `Il reste ${hours}h ${minutes.toString().padStart(2, '0')}min ${seconds.toString().padStart(2, '0')}s`;
    } else if (minutes > 0) {
      return `Il reste ${minutes}min ${seconds.toString().padStart(2, '0')}s`;
    } else {
      return `Il reste ${seconds}s`;
    }
  }, []);

  // Vérifier si on doit reset le timer (nouveau jour)
  const shouldResetTimer = useCallback((): boolean => {
    const lastReset = localStorage.getItem(LAST_RESET_KEY);
    const today = new Date().toDateString();
    
    return !lastReset || lastReset !== today;
  }, []);

  // Initialiser le timer depuis localStorage ou créer nouveau
  const initializeTimer = useCallback(() => {
    if (typeof window === 'undefined') return TIMER_DURATION;

    // Reset quotidien
    if (shouldResetTimer()) {
      localStorage.setItem(LAST_RESET_KEY, new Date().toDateString());
      localStorage.setItem(STORAGE_KEY, TIMER_DURATION.toString());
      return TIMER_DURATION;
    }

    // Récupérer depuis localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const savedTime = parseInt(saved, 10);
      return savedTime > 0 ? savedTime : TIMER_DURATION;
    }

    return TIMER_DURATION;
  }, [shouldResetTimer]);

  // Mettre à jour le state du timer
  const updateTimerState = useCallback((remainingSeconds: number) => {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    setTimer({
      hours,
      minutes,
      seconds,
      isActive: remainingSeconds > 0,
      formattedTime: formatTime(remainingSeconds),
    });
  }, [formatTime]);

  // Démarrer le timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let remainingTime = initializeTimer();

    // Mettre à jour immédiatement l'état
    updateTimerState(remainingTime);

    interval = setInterval(() => {
      remainingTime -= 1;

      if (remainingTime <= 0) {
        remainingTime = 0;
        if (interval) clearInterval(interval);
      }

      // Sauvegarder dans localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, remainingTime.toString());
      }

      updateTimerState(remainingTime);
    }, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [initializeTimer, updateTimerState]);

  // Forcer le reset du timer (pour debug ou cas spéciaux)
  const resetTimer = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, TIMER_DURATION.toString());
      localStorage.setItem(LAST_RESET_KEY, new Date().toDateString());
    }
    updateTimerState(TIMER_DURATION);
  }, [updateTimerState]);

  return {
    ...timer,
    resetTimer,
  };
};
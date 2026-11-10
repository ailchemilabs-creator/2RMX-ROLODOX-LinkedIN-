import { useState, useEffect, useCallback, useMemo } from 'react';
import { TourType, WalkthroughState, WalkthroughStep } from './types';
import { getStepsForTour } from './walkthroughSteps';

const STORAGE_KEY = 'rolodox_walkthrough_state_v1';

const defaultState: WalkthroughState = {
  hasStarted: false,
  hasCompleted: false,
  hasDismissed: false,
  lastStepIndex: 0,
  activeTourType: 'full'
};

export function useWalkthroughState() {
  const [persistedState, setPersistedState] = useState<WalkthroughState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch {
      // localStorage error fallback
    }
    return defaultState;
  });

  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [activeTourType, setActiveTourType] = useState<TourType>(persistedState.activeTourType || 'full');

  // Active steps based on selected tour type
  const steps: WalkthroughStep[] = useMemo(() => {
    return getStepsForTour(activeTourType);
  }, [activeTourType]);

  const currentStep: WalkthroughStep | undefined = steps[currentStepIndex];

  // Save changes to localStorage
  const saveState = useCallback((patch: Partial<WalkthroughState>) => {
    setPersistedState(prev => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage quota error
      }
      return next;
    });
  }, []);

  // Auto-launch for first-time users after brief 700ms render settling
  useEffect(() => {
    if (!persistedState.hasCompleted && !persistedState.hasDismissed && !persistedState.hasStarted) {
      const timer = window.setTimeout(() => {
        setIsActive(true);
        setCurrentStepIndex(0);
        setActiveTourType('full');
        saveState({ hasStarted: true, activeTourType: 'full' });
      }, 750);
      return () => window.clearTimeout(timer);
    }
  }, [persistedState.hasCompleted, persistedState.hasDismissed, persistedState.hasStarted, saveState]);

  const startTour = useCallback((tourType: TourType = 'full', fromBeginning = true) => {
    setActiveTourType(tourType);
    setCurrentStepIndex(fromBeginning ? 0 : persistedState.lastStepIndex || 0);
    setIsActive(true);
    saveState({ hasStarted: true, activeTourType: tourType, hasDismissed: false });
  }, [persistedState.lastStepIndex, saveState]);

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      saveState({ lastStepIndex: nextIdx });
    } else {
      // Completed last step
      setIsActive(false);
      saveState({ hasCompleted: true, lastStepIndex: 0 });
    }
  }, [currentStepIndex, steps.length, saveState]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      saveState({ lastStepIndex: prevIdx });
    }
  }, [currentStepIndex, saveState]);

  const skipTour = useCallback(() => {
    setIsActive(false);
    saveState({ hasDismissed: true });
  }, [saveState]);

  const finishTour = useCallback(() => {
    setIsActive(false);
    saveState({ hasCompleted: true, lastStepIndex: 0 });
  }, [saveState]);

  const resetOnboarding = useCallback(() => {
    const freshState: WalkthroughState = {
      hasStarted: false,
      hasCompleted: false,
      hasDismissed: false,
      lastStepIndex: 0,
      activeTourType: 'full'
    };
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setPersistedState(freshState);
    setCurrentStepIndex(0);
    setActiveTourType('full');
    setIsActive(true);
  }, []);

  return {
    isActive,
    currentStepIndex,
    currentStep,
    steps,
    totalSteps: steps.length,
    activeTourType,
    hasCompleted: persistedState.hasCompleted,
    hasDismissed: persistedState.hasDismissed,
    startTour,
    nextStep,
    prevStep,
    skipTour,
    finishTour,
    resetOnboarding
  };
}

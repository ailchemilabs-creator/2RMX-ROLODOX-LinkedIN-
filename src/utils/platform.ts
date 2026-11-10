import { useState, useEffect } from 'react';

export type PlatformMode = 'auto' | 'ios' | 'android';
export type ActivePlatform = 'ios' | 'android';

export function detectNativePlatform(): ActivePlatform {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'ios';
  }

  const ua = navigator.userAgent || '';
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPad|iPhone|iPod/i.test(ua) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isAndroid) return 'android';
  if (isIOS) return 'ios';

  // For desktop browsers, default to iOS HIG presentation
  return 'ios';
}

export function usePlatform() {
  const [mode, setMode] = useState<PlatformMode>(() => {
    try {
      const saved = localStorage.getItem('rolodox_platform_mode_v1');
      if (saved === 'ios' || saved === 'android' || saved === 'auto') return saved;
    } catch {}
    return 'auto';
  });

  const [activePlatform, setActivePlatform] = useState<ActivePlatform>(() => {
    return mode === 'auto' ? detectNativePlatform() : mode;
  });

  useEffect(() => {
    const resolved = mode === 'auto' ? detectNativePlatform() : mode;
    setActivePlatform(resolved);

    // Synchronize HTML root class for platform-specific CSS rules
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('platform-ios', 'platform-android');
      root.classList.add(resolved === 'ios' ? 'platform-ios' : 'platform-android');
    }

    try {
      localStorage.setItem('rolodox_platform_mode_v1', mode);
    } catch {}
  }, [mode]);

  const togglePlatform = () => {
    setMode(prev => {
      if (prev === 'auto') return 'ios';
      if (prev === 'ios') return 'android';
      return 'auto';
    });
  };

  return {
    mode,
    setMode,
    activePlatform,
    isIOS: activePlatform === 'ios',
    isAndroid: activePlatform === 'android',
    togglePlatform
  };
}

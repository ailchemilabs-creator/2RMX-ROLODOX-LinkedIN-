import React, { useRef, useEffect } from 'react';
import { WalkthroughSpotlight } from './WalkthroughSpotlight';
import { WalkthroughTooltip } from './WalkthroughTooltip';
import { useWalkthroughPosition } from './useWalkthroughPosition';
import { WalkthroughStep } from './types';

interface OnboardingWalkthroughProps {
  isActive: boolean;
  currentStep: WalkthroughStep | undefined;
  currentStepIndex: number;
  totalSteps: number;
  activeTab: string;
  onNavigateTab: (tab: any) => void;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

export const OnboardingWalkthrough: React.FC<OnboardingWalkthroughProps> = ({
  isActive,
  currentStep,
  currentStepIndex,
  totalSteps,
  activeTab,
  onNavigateTab,
  onNext,
  onPrev,
  onSkip,
  onFinish
}) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // Automatically switch tab if current step targets a different view
  useEffect(() => {
    if (isActive && currentStep?.targetTab && currentStep.targetTab !== activeTab) {
      onNavigateTab(currentStep.targetTab);
    }
  }, [isActive, currentStep, activeTab, onNavigateTab]);

  const { tooltipStyle, targetRect, placement, isReady } = useWalkthroughPosition({
    targetId: currentStep?.targetId,
    tooltipRef,
    isActive,
    stepIndex: currentStepIndex
  });

  if (!isActive || !currentStep) {
    return null;
  }

  return (
    <div id="walkthrough-overlay-container" className="fixed inset-0 z-50 pointer-events-none">
      {/* Spotlight Mask with Rounded Cutout */}
      <WalkthroughSpotlight
        targetRect={targetRect}
        onBackdropClick={() => {
          // Subtle click on backdrop: do not dismiss aggressively, let user stay focused
        }}
      />

      {/* Floating Tooltip with Flip & Shift Collision Detection */}
      <div className="pointer-events-auto">
        <WalkthroughTooltip
          step={currentStep}
          stepIndex={currentStepIndex}
          totalSteps={totalSteps}
          tooltipStyle={tooltipStyle}
          placement={placement}
          onNext={onNext}
          onPrev={onPrev}
          onSkip={onSkip}
          onFinish={onFinish}
          tooltipRef={tooltipRef}
        />
      </div>
    </div>
  );
};

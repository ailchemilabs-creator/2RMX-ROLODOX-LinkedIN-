export type TourType = 'full' | 'maintenance' | 'strategy';

export interface WalkthroughStep {
  id: string;
  targetId?: string;
  title: string;
  purpose: string;
  action?: string;
  targetTab?: 'contacts' | 'events' | 'strategy' | 'visualizer' | 'profile';
  section?: string;
}

export interface WalkthroughState {
  hasStarted: boolean;
  hasCompleted: boolean;
  hasDismissed: boolean;
  lastStepIndex: number;
  activeTourType: TourType;
}

export interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
}

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface TooltipStyle {
  position: 'fixed';
  top: number;
  left: number;
  width: number;
  maxWidth: number;
  maxHeight: number;
}

export interface PositionResult {
  tooltipStyle: TooltipStyle;
  targetRect: TargetRect | null;
  placement: TooltipPlacement;
  isReady: boolean;
}

import { WalkthroughStep, TourType } from './types';

export const fullTourSteps: WalkthroughStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Remix Rolodox',
    purpose: 'A strategic relationship planner and personal CRM engineered for modern networkers, founders, and professionals.',
    action: 'Follow this quick walkthrough to explore core relationship tools and workflows.',
    section: 'Overview'
  },
  {
    id: 'directory-search',
    targetId: 'search-input',
    targetTab: 'contacts',
    title: 'Smart Directory & Search',
    purpose: 'Instantly find any contact by name, role, skill tags, or attended event. Filter with dynamic categories or build custom sorting groups.',
    action: 'Type any keyword or tag to quickly segment your entire rolodex.',
    section: 'Directory'
  },
  {
    id: 'relationship-maintenance',
    targetId: 'header-maintain-btn',
    targetTab: 'contacts',
    title: 'Maintenance & Cadence To-Do',
    purpose: 'Never let crucial relationships go cold. Monitor contacts due for follow-ups, track cadence cycles, and log conversation notes.',
    action: 'Check the badge counter to see contacts requiring outreach today.',
    section: 'Maintenance'
  },
  {
    id: 'event-planner',
    targetId: 'nav-tab-events',
    targetTab: 'events',
    title: 'Strategic Event Planning',
    purpose: 'Organize upcoming conferences and meetups. Define target attendee profiles and set concrete goals before attending.',
    action: 'Switch between Board and List views to plan your event calendar.',
    section: 'Events'
  },
  {
    id: 'strategy-pathways',
    targetId: 'nav-tab-strategy',
    targetTab: 'strategy',
    title: 'Warm Introduction Pathways',
    purpose: 'Map multi-hop referral chains from people you know to dream targets. Add intermediary roles, attachments, and priorities.',
    action: 'Construct warm bridges rather than relying on cold outreach.',
    section: 'Strategy'
  },
  {
    id: 'network-topology',
    targetId: 'nav-tab-visualizer',
    targetTab: 'visualizer',
    title: 'Interactive Network Topology',
    purpose: 'Explore your entire ecosystem rendered in a real-time D3 physics simulation. See how contacts, events, and pathways connect.',
    action: 'Drag nodes to reposition them or inspect connection degrees.',
    section: 'Visualizer'
  },
  {
    id: 'platform-and-profile',
    targetId: 'platform-switch-btn',
    targetTab: 'profile',
    title: 'Adaptive OS Engine & Profile',
    purpose: 'Switch seamlessly between Apple Human Interface Guidelines and Google Material Design 3 interfaces, and maintain your personal bio.',
    action: 'Click the OS pill to toggle design modes anytime.',
    section: 'Settings'
  }
];

export const maintenanceTourSteps: WalkthroughStep[] = [
  {
    id: 'maintenance-intro',
    targetId: 'header-maintain-btn',
    targetTab: 'contacts',
    title: 'Cadence Engine',
    purpose: 'Your relationship health dashboard. Contacts are flagged automatically when their configured follow-up cadence expires.',
    action: 'Click Maintain to open the slide-out reminder queue.',
    section: 'Maintenance'
  },
  {
    id: 'maintenance-search',
    targetId: 'search-input',
    targetTab: 'contacts',
    title: 'Filter by Maintenance Tags',
    purpose: 'Identify people who have urgent follow-up deadlines or who need a warm touchpoint this week.',
    action: 'Filter contacts to review their last touchpoint date.',
    section: 'Directory'
  },
  {
    id: 'maintenance-drawer-trigger',
    targetId: 'sidebar-hamburger-menu-btn',
    targetTab: 'contacts',
    title: 'Quick Access Drawer',
    purpose: 'Open the relationship drawer from anywhere to log quick call notes or reschedule follow-up dates.',
    action: 'Keep your rolodex active and responsive.',
    section: 'Drawer'
  }
];

export const strategyTourSteps: WalkthroughStep[] = [
  {
    id: 'strategy-intro',
    targetId: 'nav-tab-strategy',
    targetTab: 'strategy',
    title: 'Pathway Architecture',
    purpose: 'Break down hard-to-reach targets into achievable warm introductions through mutual connections.',
    action: 'Plan your introduction roadmap step-by-step.',
    section: 'Strategy'
  },
  {
    id: 'strategy-visualizer-link',
    targetId: 'nav-tab-visualizer',
    targetTab: 'visualizer',
    title: 'Visualizing Your Bridges',
    purpose: 'See your introduction strategies mapped directly onto the force-directed relationship graph.',
    action: 'Spot secondary pathways and shared bridges across contacts.',
    section: 'Visualizer'
  }
];

export function getStepsForTour(tourType: TourType): WalkthroughStep[] {
  switch (tourType) {
    case 'maintenance':
      return maintenanceTourSteps;
    case 'strategy':
      return strategyTourSteps;
    case 'full':
    default:
      return fullTourSteps;
  }
}

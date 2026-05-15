import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SidebarPosition = 'left' | 'right';
export type SidebarMode = 'fixed' | 'floating' | 'compact';
export type TopNavMode = 'top' | 'dock';
export type LayoutDensity = 'compact' | 'relaxed';

export interface WidgetConfig {
  id: string;
  type: string;
  title: string;
  visible: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface LayoutState {
  // Sidebar
  sidebarPosition: SidebarPosition;
  sidebarMode: SidebarMode;
  sidebarCollapsed: boolean;
  
  // Navigation
  topNavMode: TopNavMode;
  showBottomDock: boolean;
  showRightPanel: boolean;
  
  // Dashboard
  widgets: WidgetConfig[];
  layoutDensity: LayoutDensity;
  
  // Appearance
  theme: 'glass-dark' | 'clean-light' | 'cyber-neon';
  primaryColor: string;
  
  // Actions
  setSidebarPosition: (pos: SidebarPosition) => void;
  setSidebarMode: (mode: SidebarMode) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTopNavMode: (mode: TopNavMode) => void;
  setShowBottomDock: (show: boolean) => void;
  setShowRightPanel: (show: boolean) => void;
  updateWidgets: (widgets: WidgetConfig[]) => void;
  setLayoutDensity: (density: LayoutDensity) => void;
  setTheme: (theme: LayoutState['theme']) => void;
  setPrimaryColor: (color: string) => void;
  resetLayout: () => void;
}

const initialWidgets: WidgetConfig[] = [
  { id: 'stats-revenue', type: 'stats', title: 'Revenue', visible: true, x: 0, y: 0, w: 3, h: 2 },
  { id: 'stats-customers', type: 'stats', title: 'Customers', visible: true, x: 3, y: 0, w: 3, h: 2 },
  { id: 'live-map', type: 'map', title: 'Live Tracking', visible: true, x: 0, y: 2, w: 6, h: 4 },
  { id: 'collection-analytics', type: 'chart', title: 'Collection Analytics', visible: true, x: 6, y: 0, w: 6, h: 6 },
  { id: 'recent-activity', type: 'activity', title: 'Recent Activity', visible: true, x: 0, y: 6, w: 6, h: 4 },
  { id: 'driver-status', type: 'list', title: 'Driver Status', visible: true, x: 6, y: 6, w: 6, h: 4 },
];

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      sidebarPosition: 'left',
      sidebarMode: 'fixed',
      sidebarCollapsed: false,
      topNavMode: 'top',
      showBottomDock: true,
      showRightPanel: true,
      widgets: initialWidgets,
      layoutDensity: 'relaxed',
      theme: 'glass-dark',
      primaryColor: '#3b82f6',

      setSidebarPosition: (sidebarPosition) => set({ sidebarPosition }),
      setSidebarMode: (sidebarMode) => set({ sidebarMode }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      setTopNavMode: (topNavMode) => set({ topNavMode }),
      setShowBottomDock: (showBottomDock) => set({ showBottomDock }),
      setShowRightPanel: (showRightPanel) => set({ showRightPanel }),
      updateWidgets: (widgets) => set({ widgets }),
      setLayoutDensity: (layoutDensity) => set({ layoutDensity }),
      setTheme: (theme) => set({ theme }),
      setPrimaryColor: (primaryColor) => set({ primaryColor }),
      resetLayout: () => set({
        sidebarPosition: 'left',
        sidebarMode: 'fixed',
        sidebarCollapsed: false,
        topNavMode: 'top',
        showBottomDock: true,
        showRightPanel: true,
        widgets: initialWidgets,
        layoutDensity: 'relaxed',
        theme: 'glass-dark',
        primaryColor: '#3b82f6',
      }),
    }),
    {
      name: 'erp-layout-storage',
    }
  )
);

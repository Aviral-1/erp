import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Tab {
  id: string;
  label: string;
  href: string;
  icon: string;
}

interface TabsState {
  tabs: Tab[];
  activeTabId: string;
  secondaryTabId: string | null;
  splitMode: boolean;
  addTab: (tab: Tab) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  setSecondaryTab: (id: string | null) => void;
  toggleSplitMode: () => void;
}

export const useTabsStore = create<TabsState>()(
  persist(
    (set) => ({
      tabs: [{ id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' }],
      activeTabId: 'dashboard',
      secondaryTabId: null,
      splitMode: false,
      addTab: (tab) => set((state) => {
        if (state.tabs.find(t => t.id === tab.id)) {
          return { activeTabId: tab.id };
        }
        return { tabs: [...state.tabs, tab], activeTabId: tab.id };
      }),
      removeTab: (id) => set((state) => {
        const newTabs = state.tabs.filter(t => t.id !== id);
        let newActiveId = state.activeTabId;
        if (state.activeTabId === id && newTabs.length > 0) {
          newActiveId = newTabs[newTabs.length - 1].id;
        }
        const newSecondaryId = state.secondaryTabId === id ? null : state.secondaryTabId;
        return { tabs: newTabs, activeTabId: newActiveId, secondaryTabId: newSecondaryId, splitMode: newTabs.length > 1 ? state.splitMode : false };
      }),
      setActiveTab: (id) => set({ activeTabId: id }),
      setSecondaryTab: (id) => set({ secondaryTabId: id }),
      toggleSplitMode: () => set((state) => ({ splitMode: !state.splitMode })),
    }),
    {
      name: 'erp-tabs-storage',
    }
  )
);

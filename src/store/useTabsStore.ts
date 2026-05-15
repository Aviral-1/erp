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
  addTab: (tab: Tab) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
}

export const useTabsStore = create<TabsState>()(
  persist(
    (set) => ({
      tabs: [{ id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' }],
      activeTabId: 'dashboard',
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
        return { tabs: newTabs, activeTabId: newActiveId };
      }),
      setActiveTab: (id) => set({ activeTabId: id }),
    }),
    {
      name: 'erp-tabs-storage',
    }
  )
);

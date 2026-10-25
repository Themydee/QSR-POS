import { useState } from 'react';
import type { UserProfile, OutletData } from './types.ts';
import {
  MOCK_USERS,
  INITIAL_OUTLETS,
  INITIAL_ATTENTION_ITEMS,
  HOURLY_SALES,
  OUTLET_HOURLY_SALES,
  MENU_ITEMS,
  RECENT_ACTIVITIES,
  LEKKI_TEAM,
  LEKKI_SHIFT_RECONCILIATION,
} from './data/mockManagementData.ts';
import { LoginPage } from './components/LoginPage.tsx';
import { AdminNavbar } from './components/AdminNavbar.tsx';
import { AdminSidebar } from './components/AdminSidebar.tsx';
import { OwnerOverviewView } from './components/OwnerOverviewView.tsx';
import { OwnerOutletsView } from './components/OwnerOutletsView.tsx';
import { OwnerMenuPricingView } from './components/OwnerMenuPricingView.tsx';
import { OwnerReportsView } from './components/OwnerReportsView.tsx';
import { OutletManagerView } from './components/OutletManagerView.tsx';

export function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(MOCK_USERS[0]);
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [outlets, setOutlets] = useState<OutletData[]>(INITIAL_OUTLETS);
  const [selectedOutlet, setSelectedOutlet] = useState<OutletData>(INITIAL_OUTLETS[0]);
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);

  // If user is logged out, show Login Page
  if (!currentUser) {
    return (
      <LoginPage
        onLogin={(user) => {
          setCurrentUser(user);
          if (user.role === 'admin') {
            setCurrentTab('overview');
          } else {
            setCurrentTab('outlet-overview');
            const foundOutlet = outlets.find((o) => o.id === user.outletId);
            if (foundOutlet) setSelectedOutlet(foundOutlet);
          }
        }}
      />
    );
  }

  // Active outlet for manager
  const activeManagerOutlet =
    outlets.find((o) => o.id === currentUser.outletId) || selectedOutlet;

  // Toggle operations
  const handleToggleAcceptOrders = (outletId: string) => {
    setOutlets((prev) =>
      prev.map((o) =>
        o.id === outletId ? { ...o, acceptingOrders: !o.acceptingOrders } : o
      )
    );
    if (selectedOutlet.id === outletId) {
      setSelectedOutlet((prev) => ({
        ...prev,
        acceptingOrders: !prev.acceptingOrders,
      }));
    }
  };

  const handleToggleDelivery = (outletId: string) => {
    setOutlets((prev) =>
      prev.map((o) =>
        o.id === outletId ? { ...o, deliveryEnabled: !o.deliveryEnabled } : o
      )
    );
    if (selectedOutlet.id === outletId) {
      setSelectedOutlet((prev) => ({
        ...prev,
        deliveryEnabled: !prev.deliveryEnabled,
      }));
    }
  };

  const handleTogglePickup = (outletId: string) => {
    setOutlets((prev) =>
      prev.map((o) =>
        o.id === outletId ? { ...o, pickupEnabled: !o.pickupEnabled } : o
      )
    );
    if (selectedOutlet.id === outletId) {
      setSelectedOutlet((prev) => ({
        ...prev,
        pickupEnabled: !prev.pickupEnabled,
      }));
    }
  };

  const handleToggleItemStatus = (itemId: string, outletKey: string) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const currentStatus = item.outletPricing[outletKey]?.status || 'Available';
        const nextStatus =
          currentStatus === 'Available'
            ? 'Low stock'
            : currentStatus === 'Low stock'
            ? 'Unavailable'
            : 'Available';

        return {
          ...item,
          outletPricing: {
            ...item.outletPricing,
            [outletKey]: {
              ...item.outletPricing[outletKey],
              status: nextStatus,
            },
          },
        };
      })
    );
  };

  const handleOpenKitchen = () => {
    window.open('http://localhost:3002/', '_blank');
  };

  // Determine breadcrumb
  let breadcrumb = 'Overview';
  if (currentUser.role === 'admin') {
    if (currentTab === 'outlets') breadcrumb = 'Outlets';
    else if (currentTab === 'menu') breadcrumb = 'Menu & pricing';
    else if (currentTab === 'reports') breadcrumb = 'Reports';
  } else {
    breadcrumb = `${activeManagerOutlet.name} / ${
      currentTab === 'outlet-overview'
        ? 'Dashboard'
        : currentTab === 'outlet-menu'
        ? 'Stock & 86ing'
        : currentTab === 'outlet-team'
        ? 'Shift & Till'
        : 'Reports'
    }`;
  }

  return (
    <div className="min-h-screen bg-[#fbf9f5] flex">
      {/* Sidebar */}
      <AdminSidebar
        currentUser={currentUser}
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenKitchen={handleOpenKitchen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar
          currentUser={currentUser}
          breadcrumb={breadcrumb}
          onSwitchUser={(user) => {
            setCurrentUser(user);
            if (user.role === 'admin') {
              setCurrentTab('overview');
            } else {
              setCurrentTab('outlet-overview');
              const found = outlets.find((o) => o.id === user.outletId);
              if (found) setSelectedOutlet(found);
            }
          }}
          onLogout={() => setCurrentUser(null)}
        />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {currentUser.role === 'admin' ? (
            <>
              {currentTab === 'overview' && (
                <OwnerOverviewView
                  outlets={outlets}
                  attentionItems={INITIAL_ATTENTION_ITEMS}
                  hourlySales={HOURLY_SALES}
                  onSelectOutlet={(outlet) => {
                    setSelectedOutlet(outlet);
                    setCurrentTab('outlets');
                  }}
                  onNavigateToOutlets={() => setCurrentTab('outlets')}
                />
              )}

              {currentTab === 'outlets' && (
                <OwnerOutletsView
                  outlets={outlets}
                  selectedOutlet={selectedOutlet}
                  recentActivities={RECENT_ACTIVITIES}
                  onSelectOutlet={(outlet) => setSelectedOutlet(outlet)}
                  onToggleAcceptOrders={handleToggleAcceptOrders}
                  onToggleDelivery={handleToggleDelivery}
                  onTogglePickup={handleTogglePickup}
                  onOpenKitchen={handleOpenKitchen}
                />
              )}

              {currentTab === 'menu' && (
                <OwnerMenuPricingView
                  menuItems={menuItems}
                  onToggleOutletItemStatus={handleToggleItemStatus}
                />
              )}

              {currentTab === 'reports' && (
                <OwnerReportsView
                  outlets={outlets}
                  hourlySales={HOURLY_SALES}
                />
              )}
            </>
          ) : (
            /* Scoped Outlet Manager View */
            <OutletManagerView
              outlet={activeManagerOutlet}
              hourlySales={OUTLET_HOURLY_SALES[activeManagerOutlet.id] || HOURLY_SALES}
              menuItems={menuItems}
              teamMembers={LEKKI_TEAM}
              shiftReconciliation={LEKKI_SHIFT_RECONCILIATION}
              onToggleAcceptOrders={handleToggleAcceptOrders}
              onToggleDelivery={handleToggleDelivery}
              onTogglePickup={handleTogglePickup}
              onToggleItemStatus={handleToggleItemStatus}
              onOpenKitchen={handleOpenKitchen}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

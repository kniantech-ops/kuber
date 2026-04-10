import { Tabs } from 'expo-router';
import { colors } from '@/theme/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundAlt,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Home' }} />
      <Tabs.Screen name="chits" options={{ title: 'Chits' }} />
      <Tabs.Screen name="members" options={{ title: 'Members' }} />
      <Tabs.Screen name="payments" options={{ title: 'Payments' }} />
      <Tabs.Screen name="reports" options={{ title: 'Reports' }} />
      <Tabs.Screen name="more" options={{ title: 'More' }} />
      <Tabs.Screen name="chits/new" options={{ href: null }} />
      <Tabs.Screen name="chits/[id]" options={{ href: null }} />
      <Tabs.Screen name="members/new" options={{ href: null }} />
      <Tabs.Screen name="members/[id]" options={{ href: null }} />
      <Tabs.Screen name="payments/collect" options={{ href: null }} />
      <Tabs.Screen name="payments/history" options={{ href: null }} />
      <Tabs.Screen name="more/security" options={{ href: null }} />
      <Tabs.Screen name="more/language" options={{ href: null }} />
      <Tabs.Screen name="more/backup" options={{ href: null }} />
      <Tabs.Screen name="more/subscription" options={{ href: null }} />
    </Tabs>
  );
}

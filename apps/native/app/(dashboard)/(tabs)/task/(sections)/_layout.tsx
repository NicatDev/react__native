import { NavbarTopTabs } from "../../../../../components/navbar/top-tabs";

export default function DashboardSectionsLayout() {
  return (
    <NavbarTopTabs>
      <NavbarTopTabs.Screen name="connections" options={{ title: "Qoşulmalar" }} />
      <NavbarTopTabs.Screen name="problems" options={{ title: "Problemlər" }} />
    </NavbarTopTabs>
  );
}

import { Stack } from 'expo-router';


export default function Layout() {
  return (
    <Stack
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="bookings" />
      <Stack.Screen
        name="profile"
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="booking/[bookingId]"
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="booking/create"
      />
    </Stack>
  );
}

import { Redirect } from 'expo-router';

/**
 * For now, redirecting the user to bookings screen
 * can make this the home page, but unsure why the layout route does not encapsalte this index file
 * This is where the user is directed going to '/'
 */

const AppHome = () => {
  return <Redirect href="/bookings" />
};

export default AppHome;

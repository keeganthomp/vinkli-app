import { router } from 'expo-router';
import { useLocalSearchParams, Slot } from 'expo-router';
import { useEffect } from 'react';

const ArtistPublicProfile = () => {
  const { artistId } = useLocalSearchParams();
  // redirect to booking for now
  // TODO: build out public artist profile
  useEffect(() => {
    router.replace(`/artist/${artistId}/new-booking`);
  }, []);

  return null;
};

export default ArtistPublicProfile;

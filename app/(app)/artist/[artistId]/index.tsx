import { Redirect } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const ArtistPublicProfile = () => {
  const { artistId } = useLocalSearchParams();
  return <Redirect href={`/artist/${artistId}/new-booking`} />;
};

export default ArtistPublicProfile;

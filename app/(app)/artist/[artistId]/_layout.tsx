import { GET_PUBLIC_ARTIST_PROFILE } from '@graphql/queries/user';
import { useQuery } from '@apollo/client';
import { useLocalSearchParams, Slot } from 'expo-router';
import { View, ActivityIndicator, Text, Platform } from 'react-native';
import { PublicArtistProfileQuery, Artist } from '@graphql/types';
import ErrorCard from '@components/Error';
import theme from '@theme';
import { Ionicons } from '@expo/vector-icons';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'new-booking',
};

const ArtistInfo = ({ artist }: { artist: Artist }) => {
  return (
    <View
      style={{
        paddingVertical: 6,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Ionicons name="person-circle-outline" size={34} color="black" />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '300',
            paddingLeft: 4,
          }}
        >
          {artist.name}
        </Text>
      </View>
    </View>
  );
};

const PublicLayout = () => {
  const { artistId } = useLocalSearchParams();
  const { data, loading, error, refetch } = useQuery<PublicArtistProfileQuery>(
    GET_PUBLIC_ARTIST_PROFILE,
    {
      variables: {
        artistId,
      },
    },
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <ErrorCard
        onRefresh={refetch}
        hasLogout={false}
        message={error?.message || 'Error fetching artist'}
      />
    );
  }

  return (
    <View>
      <ArtistInfo artist={data?.publicArtistProfile as Artist} />
      <View
        style={{
          height: 1,
          backgroundColor: theme.lightGray,
          width: '100%',
          marginVertical: 16,
        }}
      />
      <Slot />
    </View>
  );
};

export default PublicLayout;

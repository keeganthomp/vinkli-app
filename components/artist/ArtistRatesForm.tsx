import { ScrollView, ActivityIndicator, View } from 'react-native';
import { useForm } from 'react-hook-form';
import FormTextInput from '@components/FormTextInput';
import Button from '@components/Button';
import { useMutation } from '@apollo/client';
import { UPDATE_ARTIST_RATES } from '@graphql/mutations/user';
import { Artist, UpdateArtistRatesMutation } from '@graphql/types';
import Toast from 'react-native-toast-message';

type RatesFormValues = {
  hourlyRate: number;
  consultationFee?: number;
};

type Props = {
  artist?: Artist;
};

const ArtistRatesForm = ({ artist }: Props) => {
  const [updateArtistRates] =
    useMutation<UpdateArtistRatesMutation>(UPDATE_ARTIST_RATES);
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<RatesFormValues>({
    defaultValues: {
      hourlyRate: artist?.hourlyRate || 0,
      consultationFee: artist?.consultationFee || 0,
    },
  });

  const handleUpdateRates = async (data: RatesFormValues) => {
    const { hourlyRate, consultationFee } = data;
    const isHourlyNumber = !isNaN(Number(hourlyRate));
    const isConsultationNumber = !isNaN(Number(consultationFee));
    if (!isHourlyNumber || !isConsultationNumber) {
      throw new Error('Invalid rates - not numbers');
    }
    const hourlyRateNumber = Number(hourlyRate);
    const consultationFeeNumber = Number(consultationFee);
    try {
      await updateArtistRates({
        variables: {
          hourlyRate: hourlyRateNumber,
          consultationFee: consultationFeeNumber,
        },
      });
      Toast.show({
        type: 'success',
        text1: 'Rates updated',
        text2: 'Your rates have been updated',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error updating rates',
        text2: error?.message || 'Something went wrong',
      });
    }
  };

  return (
    <ScrollView>
      {isSubmitting ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <FormTextInput
            control={control}
            label="Consultation Fee"
            name="consultationFee"
            placeholder="Enter your consultation fee"
            keyboardType="numeric"
            containerStyle={{
              paddingBottom: 24,
            }}
          />
          <FormTextInput
            control={control}
            label="Hourly Rate"
            name="hourlyRate"
            placeholder="Enter your hourly rate"
            keyboardType="numeric"
            containerStyle={{
              paddingBottom: 24,
            }}
          />
          <Button label="Save" onPress={handleSubmit(handleUpdateRates)} />
        </>
      )}
    </ScrollView>
  );
};

export default ArtistRatesForm;

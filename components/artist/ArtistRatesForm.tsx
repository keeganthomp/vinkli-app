import { ActivityIndicator, View } from 'react-native';
import { useForm } from 'react-hook-form';
import Button from '@components/Button';
import { useMutation } from '@apollo/client';
import { UPDATE_ARTIST_RATES } from '@graphql/mutations/user';
import { Artist, UpdateArtistRatesMutation } from '@graphql/types';
import Toast from 'react-native-toast-message';
import FormDollarInput from '@components/inputs/FormDollarInput';
import { useMemo } from 'react';

type RatesFormValues = {
  hourlyRate?: string;
  consultationFee?: string;
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
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<RatesFormValues>({
    defaultValues: {
      hourlyRate: artist?.hourlyRate ? artist.hourlyRate?.toString() : '',
      consultationFee: artist?.consultationFee
        ? artist.consultationFee?.toString()
        : '',
    },
  });
  const [newHourlyRate, newConsultationFee] = watch([
    'hourlyRate',
    'consultationFee',
  ]);

  const hasUpdatedRates = useMemo(() => {
    const hasHourlyChanged =
      newHourlyRate && artist?.hourlyRate !== Number(newHourlyRate);
    const hasConsultationChanged =
      newConsultationFee &&
      artist?.consultationFee !== Number(newConsultationFee);
    return hasHourlyChanged || hasConsultationChanged;
  }, [
    newHourlyRate,
    newConsultationFee,
    artist?.hourlyRate,
    artist?.consultationFee,
  ]);

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
    <View>
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
          <FormDollarInput
            control={control}
            label="Consultation Fee"
            name="consultationFee"
            placeholder="Enter your consultation fee"
            inputMode="numeric"
            containerStyle={{
              paddingBottom: 24,
            }}
          />
          <FormDollarInput
            control={control}
            label="Hourly Rate"
            name="hourlyRate"
            placeholder="Enter your hourly rate"
            inputMode="numeric"
            containerStyle={{
              paddingBottom: 24,
            }}
          />
          {hasUpdatedRates && (
            <Button
              label="Save"
              disabled={!isValid || isSubmitting}
              onPress={handleSubmit(handleUpdateRates)}
            />
          )}
        </>
      )}
    </View>
  );
};

export default ArtistRatesForm;

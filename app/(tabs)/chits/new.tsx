import { router } from 'expo-router';
import { useState } from 'react';
import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { chitsRepo } from '@/db/repositories/chits.repo';
import { colors } from '@/theme/colors';

export default function NewChitScreen() {
  const [name, setName] = useState('');
  const [chitValue, setChitValue] = useState('');
  const [subscriptionAmount, setSubscriptionAmount] = useState('');
  const [totalMembers, setTotalMembers] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name || !chitValue || !subscriptionAmount || !totalMembers) {
      setError('Please fill in all fields.');
      return;
    }

    setSaving(true);
    setError('');
    await chitsRepo.create({
      name,
      chitValue: Math.round(Number(chitValue) * 100),
      subscriptionAmount: Math.round(Number(subscriptionAmount) * 100),
      totalMembers: Number(totalMembers),
    });
    router.back();
  };

  return (
    <AppScreen>
      <SectionHeader title="Create Chit Group" subtitle="Core form scaffolded for auction, lucky draw, and fixed groups" />
      <GlassCard style={{ gap: 12 }}>
        <AppInput placeholder="Chit name" value={name} onChangeText={setName} />
        <AppInput placeholder="Chit value in rupees" keyboardType="number-pad" value={chitValue} onChangeText={setChitValue} />
        <AppInput placeholder="Monthly subscription" keyboardType="number-pad" value={subscriptionAmount} onChangeText={setSubscriptionAmount} />
        <AppInput placeholder="Total members" keyboardType="number-pad" value={totalMembers} onChangeText={setTotalMembers} />
        {error ? <AppText style={{ color: colors.danger }}>{error}</AppText> : null}
        <AppButton label={saving ? 'Saving...' : 'Save Draft'} onPress={() => void handleSave()} />
      </GlassCard>
    </AppScreen>
  );
}

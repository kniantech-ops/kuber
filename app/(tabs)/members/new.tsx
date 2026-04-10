import { router } from 'expo-router';
import { useState } from 'react';
import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { membersRepo } from '@/db/repositories/members.repo';
import { colors } from '@/theme/colors';

export default function NewMemberScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [idProofNumber, setIdProofNumber] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name || !phone) {
      setError('Name and phone number are required.');
      return;
    }

    setSaving(true);
    setError('');
    await membersRepo.create({
      name,
      phone,
      city,
      idProofNumber,
    });
    router.back();
  };

  return (
    <AppScreen>
      <SectionHeader title="Add Member" subtitle="Foundation form for KYC and multi-chit assignment" />
      <GlassCard style={{ gap: 12 }}>
        <AppInput placeholder="Member name" value={name} onChangeText={setName} />
        <AppInput placeholder="Phone number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        <AppInput placeholder="City" value={city} onChangeText={setCity} />
        <AppInput placeholder="ID proof number" value={idProofNumber} onChangeText={setIdProofNumber} />
        {error ? <AppText style={{ color: colors.danger }}>{error}</AppText> : null}
        <AppButton label={saving ? 'Saving...' : 'Save Member'} onPress={() => void handleSave()} />
      </GlassCard>
    </AppScreen>
  );
}

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, UsersRound, Award, CreditCard } from 'lucide-react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import Card from '../common/Card';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.charcoal.DEFAULT,
    marginBottom: SPACING.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -SPACING.xs,
  },
  actionButton: {
    width: '48%',
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.charcoal.DEFAULT,
  },
});

export const QuickActions: React.FC = () => {
  const router = useRouter();

  const actions = [
    {
      title: 'Book Court',
      icon: <Calendar size={24} color={COLORS.primary.DEFAULT} />,
      onPress: () => router.push('/booking'),
      backgroundColor: COLORS.secondary.light,
    },
    {
      title: 'Find Match',
      icon: <UsersRound size={24} color={COLORS.success.DEFAULT} />,
      onPress: () => router.push('/matches'),
      backgroundColor: COLORS.success.light,
    },
    {
      title: 'Leaderboard',
      icon: <Award size={24} color={COLORS.warning.DEFAULT} />,
      onPress: () => router.push('/more/leaderboard'),
      backgroundColor: COLORS.warning.light,
    },
    {
      title: 'Membership',
      icon: <CreditCard size={24} color={COLORS.primary.dark} />,
      onPress: () => router.push('/more/membership'),
      backgroundColor: COLORS.primary.light,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionButton, { backgroundColor: action.backgroundColor }]}
            onPress={action.onPress}
          >
            <View style={styles.iconContainer}>{action.icon}</View>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuickActions;
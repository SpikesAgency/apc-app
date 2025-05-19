import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import { User } from '@/types';

interface WelcomeCardProps {
  user: User;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ user }) => {
  return (
    <Card
      style={styles.card}
      elevation="medium"
      backgroundColor={COLORS.primary.DEFAULT}
      padding="medium"
    >
      <View style={styles.backgroundImageContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/2403507/pexels-photo-2403507.jpeg' }}
          style={styles.backgroundImage}
          blurRadius={2}
        />
        <View style={styles.overlay} />
      </View>

      <View style={styles.content}>
        <View style={styles.userInfo}>
          <Avatar
            imageUrl={user.photoUrl}
            name={user.name}
            size="large"
            showBorder
            borderColor={COLORS.white}
          />
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{user.name}</Text>
            <View style={styles.membershipBadge}>
              <Text style={styles.membershipText}>
                {user.membershipType === 'member' ? 'Member' : 'Guest'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.stats.gamesPlayed}</Text>
            <Text style={styles.statLabel}>Games</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.stats.wins}</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.stats.level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 16,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(233, 125, 43, 0.85)',
  },
  content: {
    zIndex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  textContainer: {
    marginLeft: SPACING.md,
  },
  welcomeText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.white,
    opacity: 0.9,
  },
  nameText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xl,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  membershipBadge: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  membershipText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xs,
    color: COLORS.primary.DEFAULT,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: SPACING.sm,
    marginTop: SPACING.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.white,
  },
  statLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xs,
    color: COLORS.white,
    opacity: 0.9,
  },
  separator: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default WelcomeCard;
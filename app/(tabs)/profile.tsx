import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Edit, Settings, Award, Calendar, Zap } from 'lucide-react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import Header from '@/components/common/Header';
import Card from '@/components/common/Card';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import SkillRating from '@/components/common/SkillRating';
import Button from '@/components/common/Button';
import ProgressBar from '@/components/common/ProgressBar';
import { currentUser } from '@/data/users';

export default function ProfileScreen() {
  const router = useRouter();
  const user = currentUser;
  
  // Calculate win rate
  const winRate = user.stats.gamesPlayed > 0 
    ? Math.round((user.stats.wins / user.stats.gamesPlayed) * 100) 
    : 0;
  
  // Calculate XP progress to next level
  const xpToNextLevel = user.stats.level * 150;
  const xpProgress = (user.stats.xp % xpToNextLevel) / xpToNextLevel;
  
  const handleEditProfile = () => {
    router.push('/profile/edit');
  };
  
  const handleSettingsPress = () => {
    router.push('/more/settings');
  };
  
  const renderStatItem = (label: string, value: string | number) => (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Profile"
        showBackButton={false}
        rightComponent={
          <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsButton}>
            <Settings size={24} color={COLORS.charcoal.DEFAULT} />
          </TouchableOpacity>
        }
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeaderContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3651335/pexels-photo-3651335.jpeg' }}
            style={styles.coverImage}
          />
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Avatar
                imageUrl={user.photoUrl}
                name={user.name}
                size="xlarge"
                showBorder
                borderColor={COLORS.white}
              />
              <TouchableOpacity 
                style={styles.editButton}
                onPress={handleEditProfile}
              >
                <Edit size={16} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{user.name}</Text>
              
              <View style={styles.badgeRow}>
                <Badge
                  label={user.membershipType === 'member' ? 'Member' : 'Guest'}
                  variant={user.membershipType === 'member' ? 'primary' : 'secondary'}
                  size="small"
                  style={styles.memberBadge}
                />
                {user.membershipType === 'member' && (
                  <Text style={styles.membershipText}>
                    Expires: {new Date(user.membershipExpiry || '').toLocaleDateString()}
                  </Text>
                )}
              </View>
              
              <View style={styles.skillContainer}>
                <Text style={styles.skillLabel}>Skill Level:</Text>
                <SkillRating rating={user.skillLevel} size="medium" />
              </View>
            </View>
          </View>
        </View>
        
        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            {renderStatItem('Games', user.stats.gamesPlayed)}
            {renderStatItem('Wins', user.stats.wins)}
            {renderStatItem('Win Rate', `${winRate}%`)}
            {renderStatItem('Streak', user.stats.winStreak)}
          </View>
        </Card>
        
        <Card style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelIconContainer}>
              <Zap size={24} color={COLORS.primary.DEFAULT} />
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle}>Level {user.stats.level}</Text>
              <Text style={styles.xpText}>
                {user.stats.xp % xpToNextLevel} / {xpToNextLevel} XP to Level {user.stats.level + 1}
              </Text>
            </View>
          </View>
          
          <ProgressBar
            progress={xpProgress}
            height={12}
            progressColor={COLORS.primary.DEFAULT}
            style={styles.progressBar}
          />
        </Card>
        
        <View style={styles.sectionHeader}>
          <Award size={20} color={COLORS.charcoal.DEFAULT} />
          <Text style={styles.sectionTitle}>Achievements</Text>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.badgesContainer}
        >
          {user.stats.badges.map((badge) => (
            <Card 
              key={badge.id} 
              style={styles.badgeCard}
              elevation="small"
            >
              <Image 
                source={{ uri: badge.imageUrl }} 
                style={styles.badgeImage}
              />
              <Text style={styles.badgeName}>{badge.name}</Text>
              <Text style={styles.badgeDescription}>
                {badge.description}
              </Text>
              <Text style={styles.badgeDate}>
                {new Date(badge.dateEarned).toLocaleDateString()}
              </Text>
            </Card>
          ))}
        </ScrollView>
        
        <View style={styles.sectionHeader}>
          <Calendar size={20} color={COLORS.charcoal.DEFAULT} />
          <Text style={styles.sectionTitle}>Activity</Text>
        </View>
        
        <Card style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>Recent Games</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {user.stats.gamesPlayed > 0 ? (
            <View style={styles.recentGamesContainer}>
              {/* Render recent games */}
              <Text style={styles.gameInfo}>
                You have played {user.stats.gamesPlayed} games in total.
              </Text>
              <Button
                title="View Game History"
                variant="outline"
                size="small"
                onPress={() => router.push('/profile/games')}
                style={styles.viewHistoryButton}
              />
            </View>
          ) : (
            <View style={styles.noGamesContainer}>
              <Text style={styles.noGamesText}>
                You haven't played any games yet.
              </Text>
              <Button
                title="Book a Court"
                onPress={() => router.push('/booking')}
                size="small"
                style={styles.bookButton}
              />
            </View>
          )}
        </Card>
        
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  scrollView: {
    flex: 1,
  },
  settingsButton: {
    padding: SPACING.xs,
  },
  profileHeaderContainer: {
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
  },
  coverImage: {
    height: 150,
    width: '100%',
  },
  profileHeader: {
    flexDirection: 'row',
    padding: SPACING.md,
    marginTop: -50,
  },
  avatarContainer: {
    marginRight: SPACING.md,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary.DEFAULT,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: SPACING.xs,
  },
  name: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xl,
    color: COLORS.charcoal.DEFAULT,
    marginBottom: SPACING.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  memberBadge: {
    marginRight: SPACING.sm,
  },
  membershipText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xs,
    color: COLORS.gray[600],
  },
  skillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  skillLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.charcoal.DEFAULT,
    marginRight: SPACING.xs,
  },
  statsCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    padding: SPACING.sm,
  },
  statValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.charcoal.DEFAULT,
  },
  statLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xs,
    color: COLORS.gray[600],
    marginTop: 2,
  },
  levelCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  levelIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.md,
    color: COLORS.charcoal.DEFAULT,
  },
  xpText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xs,
    color: COLORS.gray[600],
  },
  progressBar: {
    marginBottom: SPACING.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.charcoal.DEFAULT,
    marginLeft: SPACING.xs,
  },
  badgesContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  badgeCard: {
    width: 140,
    marginRight: SPACING.md,
    alignItems: 'center',
  },
  badgeImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: SPACING.sm,
  },
  badgeName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.md,
    color: COLORS.charcoal.DEFAULT,
    textAlign: 'center',
    marginBottom: 2,
  },
  badgeDescription: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xs,
    color: COLORS.gray[600],
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  badgeDate: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xs,
    color: COLORS.primary.DEFAULT,
  },
  activityCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  activityTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.md,
    color: COLORS.charcoal.DEFAULT,
  },
  viewAllText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.primary.DEFAULT,
  },
  recentGamesContainer: {
    alignItems: 'center',
    padding: SPACING.sm,
  },
  gameInfo: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.gray[600],
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  viewHistoryButton: {
    minWidth: 150,
  },
  noGamesContainer: {
    alignItems: 'center',
    padding: SPACING.md,
  },
  noGamesText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.gray[600],
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  bookButton: {
    minWidth: 150,
  },
  bottomSpace: {
    height: 100,
  },
});
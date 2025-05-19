import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Clock, Users } from 'lucide-react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import { MatchRequest } from '@/types';
import Card from '../common/Card';
import Badge from '../common/Badge';
import SkillRating from '../common/SkillRating';

interface OpenMatchesProps {
  matches: MatchRequest[];
}

export const OpenMatches: React.FC<OpenMatchesProps> = ({ matches }) => {
  const router = useRouter();
  
  const handleMatchPress = (matchId: string) => {
    router.push(`/matches/${matchId}`);
  };

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'Today';
    }
    
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const renderMatchItem = ({ item }: { item: MatchRequest }) => {
    const playersCount = item.playersJoined.length;
    const playersNeeded = item.playersNeeded - playersCount;
    
    return (
      <TouchableOpacity onPress={() => handleMatchPress(item.id)}>
        <Card style={styles.matchCard} elevation="small">
          <View style={styles.matchHeader}>
            <Badge
              label={item.courtType.toUpperCase()}
              variant={item.courtType === 'padel' ? 'primary' : 'secondary'}
              size="small"
            />
            <View style={styles.skillLevel}>
              <Text style={styles.skillText}>Skill Level:</Text>
              <SkillRating rating={item.skillLevel.min} size="small" />
              <Text style={styles.skillText}>-</Text>
              <SkillRating rating={item.skillLevel.max} size="small" />
            </View>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Calendar size={16} color={COLORS.gray[600]} />
              <Text style={styles.detailText}>
                {getFormattedDate(item.date)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Clock size={16} color={COLORS.gray[600]} />
              <Text style={styles.detailText}>
                {item.startTime} - {item.endTime}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Users size={16} color={COLORS.gray[600]} />
              <Text style={styles.detailText}>
                {playersCount} / {item.playersNeeded} Players
              </Text>
            </View>
          </View>
          
          <View style={styles.playersNeededContainer}>
            <Text style={styles.playersNeededText}>
              {playersNeeded > 0
                ? `${playersNeeded} player${playersNeeded > 1 ? 's' : ''} needed`
                : 'Match is full'}
            </Text>
            <TouchableOpacity
              style={[
                styles.joinButton,
                playersNeeded === 0 && styles.disabledButton,
              ]}
              onPress={() => handleMatchPress(item.id)}
              disabled={playersNeeded === 0}
            >
              <Text style={styles.joinButtonText}>
                {playersNeeded > 0 ? 'Join' : 'View'}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Open Matches</Text>
        <TouchableOpacity onPress={() => router.push('/matches')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {matches.length > 0 ? (
        <FlatList
          data={matches}
          renderItem={renderMatchItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Card style={styles.emptyCard} elevation="small">
          <Text style={styles.emptyText}>No open matches</Text>
          <TouchableOpacity 
            style={styles.createMatchButton}
            onPress={() => router.push('/matches/create')}
          >
            <Text style={styles.createMatchText}>Create Match</Text>
          </TouchableOpacity>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.charcoal.DEFAULT,
  },
  viewAllText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.primary.DEFAULT,
  },
  listContainer: {
    paddingRight: SPACING.md,
  },
  matchCard: {
    width: 280,
    marginRight: SPACING.md,
    marginBottom: SPACING.xs,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  skillLevel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xs,
    color: COLORS.gray[600],
    marginRight: SPACING.xs,
  },
  detailsContainer: {
    marginBottom: SPACING.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  detailText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray[600],
    marginLeft: SPACING.xs,
  },
  playersNeededContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  playersNeededText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.gray[600],
  },
  joinButton: {
    backgroundColor: COLORS.primary.DEFAULT,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: COLORS.gray[400],
  },
  joinButtonText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.white,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  emptyText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.gray[500],
    marginBottom: SPACING.md,
  },
  createMatchButton: {
    backgroundColor: COLORS.primary.DEFAULT,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
  },
  createMatchText: {
    fontFamily: FONT.medium,
    color: COLORS.white,
    fontSize: SIZES.sm,
  },
});

export default OpenMatches;
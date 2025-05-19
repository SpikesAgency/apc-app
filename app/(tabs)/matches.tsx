import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Clock, Filter, Info, Users } from 'lucide-react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import Header from '@/components/common/Header';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import Avatar from '@/components/common/Avatar';
import SkillRating from '@/components/common/SkillRating';
import { MatchRequest } from '@/types';
import { matchRequests } from '@/data/matchRequests';
import { users } from '@/data/users';
import { format } from 'date-fns';

export default function MatchesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'open' | 'my'>('open');
  const [filter, setFilter] = useState<'all' | 'padel' | 'pickleball'>('all');
  
  // Filter matches based on the active tab and filter
  const filteredMatches = matchRequests.filter(match => {
    if (activeTab === 'my') {
      return match.creatorId === 'user1' || match.playersJoined.includes('user1');
    }
    
    if (filter !== 'all') {
      return match.courtType === filter && match.status === 'open';
    }
    
    return match.status === 'open';
  });
  
  const handleMatchPress = (matchId: string) => {
    router.push(`/matches/${matchId}`);
  };
  
  const handleCreateMatch = () => {
    router.push('/matches/create');
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
    
    return format(date, 'EEE, MMM d');
  };
  
  const renderMatchItem = ({ item }: { item: MatchRequest }) => {
    const playersCount = item.playersJoined.length;
    const playersNeeded = item.playersNeeded - playersCount;
    
    // Get user data for joined players
    const joinedPlayers = item.playersJoined.map(id => 
      users.find(user => user.id === id)
    ).filter(user => user);
    
    return (
      <Card style={styles.matchCard} elevation="small">
        <View style={styles.matchHeader}>
          <View style={styles.matchInfo}>
            <Badge
              label={item.courtType.toUpperCase()}
              variant={item.courtType === 'padel' ? 'primary' : 'secondary'}
              size="small"
            />
            <Text style={styles.matchDate}>
              {getFormattedDate(item.date)} · {item.startTime}
            </Text>
          </View>
          
          <View style={styles.skillLevel}>
            <Text style={styles.skillText}>Skill:</Text>
            <SkillRating rating={item.skillLevel.min} size="small" />
            <Text style={styles.skillText}>-</Text>
            <SkillRating rating={item.skillLevel.max} size="small" />
          </View>
        </View>
        
        <View style={styles.playersSection}>
          <Text style={styles.playersTitle}>
            {playersCount}/{item.playersNeeded} Players joined
          </Text>
          
          <View style={styles.avatarsRow}>
            {joinedPlayers.map((player, index) => (
              player && (
                <View key={player.id} style={styles.playerAvatarContainer}>
                  <Avatar
                    imageUrl={player.photoUrl}
                    name={player.name}
                    size="medium"
                    style={styles.playerAvatar}
                  />
                  {index === 0 && (
                    <Badge
                      label="Host"
                      variant="warning"
                      size="small"
                      style={styles.hostBadge}
                    />
                  )}
                </View>
              )
            ))}
            
            {Array.from({ length: playersNeeded }).map((_, index) => (
              <View key={`empty-${index}`} style={styles.emptyAvatar}>
                <Users size={24} color={COLORS.gray[400]} />
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.matchFooter}>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => handleMatchPress(item.id)}
          >
            <Info size={16} color={COLORS.charcoal.DEFAULT} />
            <Text style={styles.infoText}>Details</Text>
          </TouchableOpacity>
          
          <Button
            title={playersNeeded > 0 ? 'Join Match' : 'View Chat'}
            onPress={() => handleMatchPress(item.id)}
            size="small"
            variant={playersNeeded > 0 ? 'primary' : 'secondary'}
          />
        </View>
      </Card>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Find Matches"
        showBackButton={false}
      />
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'open' && styles.activeTab
          ]}
          onPress={() => setActiveTab('open')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'open' && styles.activeTabText
            ]}
          >
            Open Matches
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'my' && styles.activeTab
          ]}
          onPress={() => setActiveTab('my')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'my' && styles.activeTabText
            ]}
          >
            My Matches
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'open' && (
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === 'all' && styles.activeFilterChip
            ]}
            onPress={() => setFilter('all')}
          >
            <Text 
              style={[
                styles.filterText,
                filter === 'all' && styles.activeFilterText
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === 'padel' && styles.activeFilterChip
            ]}
            onPress={() => setFilter('padel')}
          >
            <Text 
              style={[
                styles.filterText,
                filter === 'padel' && styles.activeFilterText
              ]}
            >
              Padel
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === 'pickleball' && styles.activeFilterChip
            ]}
            onPress={() => setFilter('pickleball')}
          >
            <Text 
              style={[
                styles.filterText,
                filter === 'pickleball' && styles.activeFilterText
              ]}
            >
              Pickleball
            </Text>
          </TouchableOpacity>
        </View>
      )}
      
      {filteredMatches.length > 0 ? (
        <FlatList
          data={filteredMatches}
          renderItem={renderMatchItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.matchesList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {activeTab === 'open' 
              ? 'No open matches available' 
              : 'You haven\'t joined any matches yet'}
          </Text>
          <Button
            title="Create a Match"
            onPress={handleCreateMatch}
            style={styles.createButton}
          />
        </View>
      )}
      
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleCreateMatch}
        >
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary.DEFAULT,
  },
  tabText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.gray[600],
  },
  activeTabText: {
    color: COLORS.primary.DEFAULT,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
  filterChip: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 16,
    backgroundColor: COLORS.gray[200],
    marginRight: SPACING.sm,
  },
  activeFilterChip: {
    backgroundColor: COLORS.primary.DEFAULT,
  },
  filterText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.charcoal.DEFAULT,
  },
  activeFilterText: {
    color: COLORS.white,
  },
  matchesList: {
    padding: SPACING.md,
  },
  matchCard: {
    marginBottom: SPACING.md,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  matchInfo: {
    flexDirection: 'column',
  },
  matchDate: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.gray[600],
    marginTop: SPACING.xs,
  },
  skillLevel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xs,
    color: COLORS.gray[600],
    marginHorizontal: 2,
  },
  playersSection: {
    marginBottom: SPACING.md,
  },
  playersTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.charcoal.DEFAULT,
    marginBottom: SPACING.sm,
  },
  avatarsRow: {
    flexDirection: 'row',
  },
  playerAvatarContainer: {
    marginRight: SPACING.sm,
  },
  playerAvatar: {
    marginBottom: SPACING.xs,
  },
  hostBadge: {
    position: 'absolute',
    bottom: -4,
    left: 0,
    right: 0,
    borderRadius: 4,
  },
  emptyAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  matchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.xs,
  },
  infoText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.charcoal.DEFAULT,
    marginLeft: SPACING.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  emptyText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.gray[500],
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  createButton: {
    width: 200,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.create({
      shadow: {
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
      }
    }).shadow,
  },
  floatingButtonText: {
    fontFamily: FONT.bold,
    fontSize: 24,
    color: COLORS.white,
  },
});
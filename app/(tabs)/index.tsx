import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import Header from '@/components/common/Header';
import WelcomeCard from '@/components/home/WelcomeCard';
import QuickActions from '@/components/home/QuickActions';
import UpcomingBookings from '@/components/home/UpcomingBookings';
import OpenMatches from '@/components/home/OpenMatches';
import { currentUser } from '@/data/users';
import { getUpcomingBookings } from '@/data/bookings';
import { getOpenMatchRequests } from '@/data/matchRequests';
import { getUnreadNotificationsCount } from '@/data/notifications';

export default function HomeScreen() {
  const upcomingBookings = getUpcomingBookings(currentUser.id);
  const openMatches = getOpenMatchRequests();
  const unreadNotifications = getUnreadNotificationsCount(currentUser.id);

  const handleNotificationsPress = () => {
    // Navigate to notifications screen
    console.log('Navigate to notifications');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Alaçatı Padel Club"
        showNotificationIcon
        notificationCount={unreadNotifications}
        onNotificationPress={handleNotificationsPress}
      />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeCard user={currentUser} />
        <QuickActions />
        <UpcomingBookings bookings={upcomingBookings} />
        <OpenMatches matches={openMatches} />
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
});
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, MapPin, Users } from 'lucide-react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import { Booking } from '@/types';
import Card from '../common/Card';
import Badge from '../common/Badge';

interface UpcomingBookingsProps {
  bookings: Booking[];
}

export const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({ bookings }) => {
  const router = useRouter();
  
  const handleBookingPress = (bookingId: string) => {
    router.push(`/booking/${bookingId}`);
  };

  const renderBookingItem = ({ item }: { item: Booking }) => {
    // Format the date for display
    const bookingDate = new Date(`${item.date}T${item.startTime}`);
    const today = new Date();
    
    const isToday = 
      bookingDate.getDate() === today.getDate() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear();
    
    const dayDisplay = isToday 
      ? 'Today' 
      : bookingDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    // Format the time for display
    const startTime = bookingDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const endTime = new Date(`${item.date}T${item.endTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    
    return (
      <TouchableOpacity onPress={() => handleBookingPress(item.id)}>
        <Card style={styles.bookingCard} elevation="small">
          <View style={styles.bookingHeader}>
            <View>
              <Text style={styles.courtName}>Court: {item.courtId.replace('court', '')}</Text>
              <Text style={styles.dateText}>{dayDisplay}</Text>
            </View>
            <Badge
              label={item.isPrivate ? 'Private' : 'Public'}
              variant={item.isPrivate ? 'warning' : 'success'}
              size="small"
            />
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Clock size={16} color={COLORS.gray[600]} />
              <Text style={styles.detailText}>{startTime} - {endTime}</Text>
            </View>
            <View style={styles.detailRow}>
              <MapPin size={16} color={COLORS.gray[600]} />
              <Text style={styles.detailText}>Alaçatı Padel Club</Text>
            </View>
            <View style={styles.detailRow}>
              <Users size={16} color={COLORS.gray[600]} />
              <Text style={styles.detailText}>{item.players.length} Players</Text>
            </View>
          </View>
          
          <View style={styles.bookingFooter}>
            <Badge
              label={item.paymentStatus.toUpperCase()}
              variant={item.paymentStatus === 'paid' ? 'success' : 'warning'}
              size="small"
            />
            <Text style={styles.priceText}>{item.totalAmount} ₺</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
        <TouchableOpacity onPress={() => router.push('/booking/history')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Card style={styles.emptyCard} elevation="small">
          <Text style={styles.emptyText}>No upcoming bookings</Text>
          <TouchableOpacity 
            style={styles.bookNowButton}
            onPress={() => router.push('/booking')}
          >
            <Text style={styles.bookNowText}>Book Now</Text>
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
  bookingCard: {
    width: 280,
    marginRight: SPACING.md,
    marginBottom: SPACING.xs,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  courtName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.md,
    color: COLORS.charcoal.DEFAULT,
  },
  dateText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray[600],
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
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  priceText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.md,
    color: COLORS.primary.DEFAULT,
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
  bookNowButton: {
    backgroundColor: COLORS.primary.DEFAULT,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
  },
  bookNowText: {
    fontFamily: FONT.medium,
    color: COLORS.white,
    fontSize: SIZES.sm,
  },
});

export default UpcomingBookings;
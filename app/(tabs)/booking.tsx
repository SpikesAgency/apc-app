import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar as CalendarIcon, Clock, Filter, Sun } from 'lucide-react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import Header from '@/components/common/Header';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { CourtType, Court } from '@/types';
import { courts, getAvailableTimeSlots } from '@/data/courts';
import { format, addDays } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  scrollView: {
    flex: 1,
  },
  typeSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
  typeButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 20,
    marginHorizontal: SPACING.sm,
    backgroundColor: COLORS.gray[200],
  },
  selectedTypeButton: {
    backgroundColor: COLORS.primary.DEFAULT,
  },
  typeText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.charcoal.DEFAULT,
  },
  selectedTypeText: {
    color: COLORS.white,
  },
  sectionContainer: {
    marginVertical: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.md,
    color: COLORS.charcoal.DEFAULT,
    marginLeft: SPACING.xs,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    padding: SPACING.xs,
  },
  filterText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.charcoal.DEFAULT,
    marginLeft: SPACING.xs,
  },
  dateListContainer: {
    paddingHorizontal: SPACING.md,
  },
  dateItem: {
    width: 56,
    height: 72,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedDateItem: {
    backgroundColor: COLORS.primary.DEFAULT,
  },
  dateDay: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.charcoal.DEFAULT,
  },
  dateNumber: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.charcoal.DEFAULT,
  },
  selectedDateText: {
    color: COLORS.white,
  },
  courtListContainer: {
    paddingHorizontal: SPACING.md,
  },
  courtCard: {
    width: 200,
    height: 160,
    borderRadius: 12,
    marginRight: SPACING.md,
    overflow: 'hidden',
  },
  selectedCourtCard: {
    borderWidth: 2,
    borderColor: COLORS.primary.DEFAULT,
  },
  courtImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  courtOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  courtInfo: {
    padding: SPACING.sm,
  },
  courtName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.md,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  courtFeatures: {
    flexDirection: 'row',
  },
  featureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginRight: SPACING.xs,
  },
  featureText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xs,
    color: COLORS.white,
    marginLeft: 2,
  },
  courtRates: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: SPACING.sm,
  },
  rateText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xs,
    color: COLORS.white,
  },
  noCourtCard: {
    marginHorizontal: SPACING.md,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  noCourtText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.gray[500],
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SPACING.md,
  },
  timeItem: {
    width: '22%',
    height: 40,
    margin: '1.5%',
    borderRadius: 8,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray[300],
  },
  selectedTimeItem: {
    backgroundColor: COLORS.primary.DEFAULT,
    borderColor: COLORS.primary.DEFAULT,
  },
  unavailableTimeItem: {
    backgroundColor: COLORS.gray[200],
    borderColor: COLORS.gray[300],
  },
  timeText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.charcoal.DEFAULT,
  },
  selectedTimeText: {
    color: COLORS.white,
  },
  unavailableTimeText: {
    color: COLORS.gray[500],
  },
  summaryCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  summaryTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.charcoal.DEFAULT,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.gray[600],
  },
  summaryValue: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.charcoal.DEFAULT,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray[200],
    marginVertical: SPACING.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  priceLabel: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.charcoal.DEFAULT,
  },
  priceValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.primary.DEFAULT,
  },
  continueButton: {
    marginTop: SPACING.sm,
  },
  bottomSpace: {
    height: 100,
  },
});

export default function BookingScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<CourtType>('padel');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  
  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  
  // Filter courts by type
  const filteredCourts = courts.filter(court => court.type === selectedType && court.isAvailable);
  
  // Get available time slots
  const availableTimeSlots = getAvailableTimeSlots();
  
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleCourtSelect = (court: Court) => {
    setSelectedCourt(court);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTimeSlot(time);
  };
  
  const handleContinue = () => {
    if (selectedCourt && selectedTimeSlot) {
      // In a real app, you'd navigate to a booking details screen
      console.log('Booking details:', {
        court: selectedCourt,
        date: selectedDate,
        time: selectedTimeSlot
      });
      router.push('/booking/details');
    }
  };
  
  const renderDateItem = ({ item }: { item: Date }) => {
    const day = format(item, 'eee');
    const dayNum = format(item, 'd');
    const isSelected = 
      selectedDate.getDate() === item.getDate() && 
      selectedDate.getMonth() === item.getMonth();
    
    return (
      <TouchableOpacity
        style={[
          styles.dateItem,
          isSelected && styles.selectedDateItem
        ]}
        onPress={() => handleDateSelect(item)}
      >
        <Text 
          style={[
            styles.dateDay, 
            isSelected && styles.selectedDateText
          ]}
        >
          {day}
        </Text>
        <Text 
          style={[
            styles.dateNumber,
            isSelected && styles.selectedDateText
          ]}
        >
          {dayNum}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCourtItem = ({ item }: { item: Court }) => {
    const isSelected = selectedCourt?.id === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.courtCard,
          isSelected && styles.selectedCourtCard
        ]}
        onPress={() => handleCourtSelect(item)}
      >
        <Image 
          source={{ uri: item.imageUrl }}
          style={styles.courtImage}
        />
        <View style={styles.courtOverlay} />
        
        <View style={styles.courtInfo}>
          <Text style={styles.courtName}>{item.name}</Text>
          <View style={styles.courtFeatures}>
            {item.isIndoor && (
              <View style={styles.featureTag}>
                <Text style={styles.featureText}>Indoor</Text>
              </View>
            )}
            {item.hasLights && (
              <View style={styles.featureTag}>
                <Sun size={12} color={COLORS.white} />
                <Text style={styles.featureText}>Lights</Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.courtRates}>
          <Text style={styles.rateText}>
            Member: {item.hourlyRate.member} ₺
          </Text>
          <Text style={styles.rateText}>
            Guest: {item.hourlyRate.guest} ₺
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Book a Court"
        showBackButton
      />
      
      <ScrollView style={styles.scrollView}>
        {/* Court Type Selection */}
        <View style={styles.typeSelectionContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === 'padel' && styles.selectedTypeButton
            ]}
            onPress={() => setSelectedType('padel')}
          >
            <Text 
              style={[
                styles.typeText,
                selectedType === 'padel' && styles.selectedTypeText
              ]}
            >
              Padel
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === 'pickleball' && styles.selectedTypeButton
            ]}
            onPress={() => setSelectedType('pickleball')}
          >
            <Text 
              style={[
                styles.typeText,
                selectedType === 'pickleball' && styles.selectedTypeText
              ]}
            >
              Pickleball
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Date Selection */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <CalendarIcon size={18} color={COLORS.charcoal.DEFAULT} />
            <Text style={styles.sectionTitle}>Select Date</Text>
          </View>
          
          <FlatList
            data={dates}
            renderItem={renderDateItem}
            keyExtractor={(item) => item.toISOString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateListContainer}
          />
        </View>
        
        {/* Court Selection */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Courts</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={16} color={COLORS.charcoal.DEFAULT} />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
          </View>
          
          {filteredCourts.length > 0 ? (
            <FlatList
              data={filteredCourts}
              renderItem={renderCourtItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.courtListContainer}
            />
          ) : (
            <Card style={styles.noCourtCard}>
              <Text style={styles.noCourtText}>
                No {selectedType} courts available
              </Text>
            </Card>
          )}
        </View>
        
        {/* Time Selection */}
        {selectedCourt && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Clock size={18} color={COLORS.charcoal.DEFAULT} />
              <Text style={styles.sectionTitle}>Select Time</Text>
            </View>
            
            <View style={styles.timeGrid}>
              {timeSlots.map((time) => {
                // Check if time slot is available
                const isAvailable = true; // In a real app, check availability
                
                return (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeItem,
                      !isAvailable && styles.unavailableTimeItem,
                      selectedTimeSlot === time && styles.selectedTimeItem
                    ]}
                    onPress={() => isAvailable && handleTimeSelect(time)}
                    disabled={!isAvailable}
                  >
                    <Text 
                      style={[
                        styles.timeText,
                        !isAvailable && styles.unavailableTimeText,
                        selectedTimeSlot === time && styles.selectedTimeText
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
        
        {/* Booking Summary */}
        {selectedCourt && selectedTimeSlot && (
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Court:</Text>
              <Text style={styles.summaryValue}>{selectedCourt.name}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date:</Text>
              <Text style={styles.summaryValue}>
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Time:</Text>
              <Text style={styles.summaryValue}>
                {selectedTimeSlot} - {selectedTimeSlot.split(':')[0]}:59
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Total:</Text>
              <Text style={styles.priceValue}>
                {selectedCourt.hourlyRate.member} ₺
              </Text>
            </View>
            
            <Button
              title="Continue to Details"
              onPress={handleContinue}
              style={styles.continueButton}
            />
          </Card>
        )}
        
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}
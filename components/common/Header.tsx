import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { ArrowLeft, Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import Badge from './Badge';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showNotificationIcon?: boolean;
  notificationCount?: number;
  onNotificationPress?: () => void;
  rightComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showNotificationIcon = false,
  notificationCount = 0,
  onNotificationPress,
  rightComponent,
  style,
  backgroundColor = COLORS.white,
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={[styles.header, { backgroundColor }, style]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
            <ArrowLeft size={24} color={COLORS.charcoal.DEFAULT} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightContainer}>
        {showNotificationIcon && (
          <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
            <Bell size={24} color={COLORS.charcoal.DEFAULT} />
            {notificationCount > 0 && (
              <View style={styles.badgeContainer}>
                <Badge 
                  label={notificationCount > 9 ? '9+' : notificationCount.toString()} 
                  variant="error"
                  size="small"
                  style={styles.badge}
                />
              </View>
            )}
          </TouchableOpacity>
        )}
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.charcoal.DEFAULT,
    flex: 1,
    textAlign: 'center',
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: SPACING.xs,
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
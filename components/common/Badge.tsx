import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'small',
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return COLORS.primary.DEFAULT;
      case 'secondary':
        return COLORS.secondary.DEFAULT;
      case 'success':
        return COLORS.success.DEFAULT;
      case 'warning':
        return COLORS.warning.DEFAULT;
      case 'error':
        return COLORS.error.DEFAULT;
      case 'info':
        return COLORS.gray[400];
      default:
        return COLORS.primary.DEFAULT;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
        return COLORS.charcoal.DEFAULT;
      default:
        return COLORS.white;
    }
  };

  const getSize = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: SPACING.xs,
          paddingVertical: 2,
          borderRadius: 4,
          fontSize: SIZES.xs,
        };
      case 'medium':
        return {
          paddingHorizontal: SPACING.sm,
          paddingVertical: 4,
          borderRadius: 6,
          fontSize: SIZES.sm,
        };
      case 'large':
        return {
          paddingHorizontal: SPACING.md,
          paddingVertical: SPACING.xs,
          borderRadius: 8,
          fontSize: SIZES.md,
        };
    }
  };

  const sizeStyle = getSize();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: getBackgroundColor(),
          paddingHorizontal: sizeStyle.paddingHorizontal,
          paddingVertical: sizeStyle.paddingVertical,
          borderRadius: sizeStyle.borderRadius,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: getTextColor(),
            fontSize: sizeStyle.fontSize,
          },
          textStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: FONT.medium,
    textAlign: 'center',
  },
});

export default Badge;
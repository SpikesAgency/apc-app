import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SHADOWS, SPACING } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'small' | 'medium' | 'large' | 'none';
  padding?: 'none' | 'small' | 'medium' | 'large';
  backgroundColor?: string;
  borderRadius?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 'small',
  padding = 'medium',
  backgroundColor = COLORS.white,
  borderRadius = 12,
}) => {
  const getShadowStyle = () => {
    switch (elevation) {
      case 'small':
        return SHADOWS.small;
      case 'medium':
        return SHADOWS.medium;
      case 'large':
        return SHADOWS.large;
      case 'none':
        return {};
    }
  };

  const getPaddingStyle = () => {
    switch (padding) {
      case 'small':
        return { padding: SPACING.sm };
      case 'medium':
        return { padding: SPACING.md };
      case 'large':
        return { padding: SPACING.lg };
      case 'none':
        return { padding: 0 };
    }
  };

  return (
    <View
      style={[
        styles.card,
        getShadowStyle(),
        getPaddingStyle(),
        { backgroundColor, borderRadius },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: SPACING.xs,
    overflow: 'hidden',
  },
});

export default Card;
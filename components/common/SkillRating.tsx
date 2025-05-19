import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Star } from 'lucide-react-native';
import { COLORS, SPACING } from '@/constants/theme';

interface SkillRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  activeColor?: string;
  inactiveColor?: string;
}

export const SkillRating: React.FC<SkillRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'medium',
  style,
  activeColor = COLORS.primary.DEFAULT,
  inactiveColor = COLORS.gray[300],
}) => {
  const getStarSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 20;
      case 'large':
        return 24;
    }
  };

  const starSize = getStarSize();
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <Star
        key={i}
        size={starSize}
        fill={i <= rating ? activeColor : 'transparent'}
        color={i <= rating ? activeColor : inactiveColor}
        strokeWidth={1.5}
      />
    );
  }

  return (
    <View style={[styles.container, style]}>
      {stars}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
});

export default SkillRating;
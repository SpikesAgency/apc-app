import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, FONT, SIZES } from '@/constants/theme';

interface AvatarProps {
  imageUrl?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  style?: ViewStyle;
  borderColor?: string;
  showBorder?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  name,
  size = 'medium',
  style,
  borderColor = COLORS.primary.DEFAULT,
  showBorder = false,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 32;
      case 'medium':
        return 48;
      case 'large':
        return 64;
      case 'xlarge':
        return 96;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return SIZES.sm;
      case 'medium':
        return SIZES.md;
      case 'large':
        return SIZES.lg;
      case 'xlarge':
        return SIZES.xl;
    }
  };

  const sizeValue = getSize();
  const fontSize = getFontSize();
  
  const getInitials = () => {
    if (!name) return '';
    
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    
    return name.substring(0, 2).toUpperCase();
  };

  const borderStyle = showBorder
    ? {
        borderWidth: 2,
        borderColor,
      }
    : {};

  return (
    <View
      style={[
        styles.container,
        {
          width: sizeValue,
          height: sizeValue,
          borderRadius: sizeValue / 2,
          ...borderStyle,
        },
        style,
      ]}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={[
            styles.image,
            {
              width: sizeValue,
              height: sizeValue,
              borderRadius: sizeValue / 2,
            },
          ]}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={[
            styles.initials,
            {
              fontSize,
            },
          ]}
        >
          {getInitials()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray[300],
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  initials: {
    fontFamily: FONT.bold,
    color: COLORS.charcoal.DEFAULT,
  },
});

export default Avatar;
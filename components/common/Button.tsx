import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
  ...rest
}) => {
  const getContainerStyle = () => {
    let containerStyle: ViewStyle = {};

    switch (variant) {
      case 'primary':
        containerStyle = {
          backgroundColor: COLORS.primary.DEFAULT,
        };
        break;
      case 'secondary':
        containerStyle = {
          backgroundColor: COLORS.secondary.DEFAULT,
        };
        break;
      case 'outline':
        containerStyle = {
          backgroundColor: COLORS.transparent,
          borderWidth: 1,
          borderColor: COLORS.primary.DEFAULT,
        };
        break;
      case 'ghost':
        containerStyle = {
          backgroundColor: COLORS.transparent,
        };
        break;
    }

    switch (size) {
      case 'small':
        containerStyle = {
          ...containerStyle,
          paddingVertical: SPACING.xs,
          paddingHorizontal: SPACING.sm,
          minHeight: 36,
        };
        break;
      case 'medium':
        containerStyle = {
          ...containerStyle,
          paddingVertical: SPACING.sm,
          paddingHorizontal: SPACING.md,
          minHeight: 44,
        };
        break;
      case 'large':
        containerStyle = {
          ...containerStyle,
          paddingVertical: SPACING.md,
          paddingHorizontal: SPACING.lg,
          minHeight: 52,
        };
        break;
    }

    if (disabled || isLoading) {
      containerStyle.opacity = 0.6;
    }

    return containerStyle;
  };

  const getTextStyle = () => {
    let textStyleForVariant: TextStyle = {};

    switch (variant) {
      case 'primary':
        textStyleForVariant = {
          color: COLORS.white,
        };
        break;
      case 'secondary':
        textStyleForVariant = {
          color: COLORS.charcoal.DEFAULT,
        };
        break;
      case 'outline':
      case 'ghost':
        textStyleForVariant = {
          color: COLORS.primary.DEFAULT,
        };
        break;
    }

    switch (size) {
      case 'small':
        textStyleForVariant = {
          ...textStyleForVariant,
          fontSize: SIZES.sm,
        };
        break;
      case 'medium':
        textStyleForVariant = {
          ...textStyleForVariant,
          fontSize: SIZES.md,
        };
        break;
      case 'large':
        textStyleForVariant = {
          ...textStyleForVariant,
          fontSize: SIZES.lg,
        };
        break;
    }

    return textStyleForVariant;
  };

  const containerStyle = getContainerStyle();
  const buttonTextStyle = getTextStyle();

  const renderContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? COLORS.white : COLORS.primary.DEFAULT}
        />
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <>
          {icon}
          <Text style={[styles.text, buttonTextStyle, textStyle, { marginLeft: SPACING.sm }]}>
            {title}
          </Text>
        </>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <>
          <Text style={[styles.text, buttonTextStyle, textStyle, { marginRight: SPACING.sm }]}>
            {title}
          </Text>
          {icon}
        </>
      );
    }

    return (
      <Text style={[styles.text, buttonTextStyle, textStyle]}>
        {title}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle, style]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      {...rest}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONT.medium,
    textAlign: 'center',
  }
});

export default Button;
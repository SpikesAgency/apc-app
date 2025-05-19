import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

// Prevent the splash screen from automatically hiding
SplashScreen.preventAutoHideAsync();

export function useFonts() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        // Load fonts
        await Font.loadAsync({
          'Poppins-Regular': Poppins_400Regular,
          'Poppins-Medium': Poppins_500Medium,
          'Poppins-Bold': Poppins_700Bold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Set the loaded state to true regardless of error
        setIsLoaded(true);
      }
    }

    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isLoaded) {
      // Hide the splash screen once fonts are loaded
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  return { isLoaded, onLayoutRootView };
}
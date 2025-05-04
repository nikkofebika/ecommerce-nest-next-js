import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from 'context/AuthContext';
import ReactClientProvider from 'context/QueryClientProvider';
import {ThemeProvider} from 'context/ThemeContext';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from 'routes/root-navigator';

export default function App(): React.JSX.Element {
  return (
    <ReactClientProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <ThemeProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </ThemeProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </ReactClientProvider>
  );
}

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './src/config/firebase';
import { NotificacoesProvider } from './src/context/NotificacoesContext';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import Tabs from './src/navigation/Tabs';
import Agendamento from './src/screens/Agendamento';
import Produtos from './src/screens/Produtos';

const Stack = createNativeStackNavigator();
const azul = '#1E5FD8';
const fundo = '#F2F7FF';

function AreaLogada() {
  return (
    <NotificacoesProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: azul },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: fundo },
        }}
      >
        <Stack.Screen name="Principal" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="Agendamento"
          component={Agendamento}
          options={({ route }) => ({
            title:
              route.params?.servico === 'tosa'
                ? 'Agendar tosa'
                : route.params?.servico === 'consulta'
                  ? 'Agendar consulta'
                  : 'Agendar banho',
          })}
        />
        <Stack.Screen name="Produtos" component={Produtos} options={{ title: 'Loja' }} />
      </Stack.Navigator>
    </NotificacoesProvider>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (u) => {
      setUsuario(u);
      setCarregando(false);
    });
    return cancelar;
  }, []);

  if (carregando) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: fundo }}>
        <ActivityIndicator size="large" color={azul} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {usuario ? (
        <AreaLogada />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

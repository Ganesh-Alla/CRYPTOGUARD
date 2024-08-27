import { Stack } from 'expo-router';
import React from 'react';


export default function Layout() {

  return (
    <>
   <Stack className="w-full"
      screenOptions={{
        title: 'CNS',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#1f2f6a',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      />
      </>
  );
}

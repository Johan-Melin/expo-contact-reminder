import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Warm Connection</Text>
        <Text style={styles.title}>History</Text>
        <Text style={styles.body}>
          This tab is wired and ready for the interaction journal screen from the exported
          designs.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fbf8ff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  eyebrow: {
    color: '#2d6a4f',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    color: '#161a32',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  body: {
    color: '#404943',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 320,
  },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { DonationCards } from '../components/DonationCards';
import { Colors } from '../constants/Colors';

export default function CausesScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.pageHero}>
          <Text style={styles.pageTitle}>Our Causes</Text>
          <Text style={styles.pageSubtitle}>
            Choose where you want to make an impact. 100% of your donation goes to the cause.
          </Text>
        </View>
        
        {/* We reuse the DonationCards component here as it contains the core logic */}
        <View style={styles.cardsWrapper}>
          <DonationCards />
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Why Donate?</Text>
          <Text style={styles.infoText}>
            Your contributions provide essential resources to orphanages that often struggle with funding. 
            Whether it's a hot meal, a warm coat, or a school book, every item brings hope.
          </Text>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  pageHero: {
    backgroundColor: '#FFEDD5',
    paddingVertical: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    maxWidth: 600,
  },
  cardsWrapper: {
    backgroundColor: Colors.surface,
  },
  infoSection: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  infoText: {
    textAlign: 'center',
    maxWidth: 700,
    color: Colors.textLight,
    lineHeight: 24,
    fontSize: 16,
  },
});

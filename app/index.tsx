import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { DonationCards } from '../components/DonationCards';
import { SearchForm } from '../components/SearchForm';
import { HowItWorks } from '../components/HowItWorks';
import { Stats } from '../components/Stats';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { Colors } from '../constants/Colors';
import { useFrameworkReady } from '../hooks/useFrameworkReady';

export default function HomeScreen() {
  useFrameworkReady();
  
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Hero />
        <DonationCards />
        <SearchForm />
        <HowItWorks />
        <Stats />
        <Testimonials />
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
});

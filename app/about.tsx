import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Image } from 'react-native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SectionTitle } from '../components/SectionTitle';
import { Colors, Layout } from '../constants/Colors';
import { Target, Users, Globe } from 'lucide-react-native';

export default function AboutScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const ValueItem = ({ icon: Icon, title, desc }: any) => (
    <View style={styles.valueItem}>
      <View style={styles.iconBox}>
        <Icon size={32} color={Colors.primary} />
      </View>
      <Text style={styles.valueTitle}>{title}</Text>
      <Text style={styles.valueDesc}>{desc}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <View style={styles.pageHero}>
          <Text style={styles.pageTitle}>About Us</Text>
          <Text style={styles.pageSubtitle}>Building bridges of hope for children worldwide.</Text>
        </View>

        <View style={styles.content}>
          {/* Mission Section */}
          <View style={[styles.section, isMobile && styles.sectionMobile]}>
            <View style={styles.textColumn}>
              <Text style={styles.heading}>Our Mission</Text>
              <Text style={styles.paragraph}>
                At Hope for Orphans, we believe that every child deserves a safe home, nutritious food, and quality education. 
                Our mission is to connect generous donors directly with verified orphanages and care centres that are doing 
                the hard work on the ground.
              </Text>
              <Text style={styles.paragraph}>
                Founded in 2020, we have grown from a small local initiative to a global platform supporting over 120 
                institutions across 15 countries. We prioritise transparency, ensuring that your contributions make a 
                tangible difference.
              </Text>
            </View>
            <View style={styles.imagePlaceholder}>
               <Users size={80} color={Colors.secondary} />
               <Text style={{marginTop: 16, color: Colors.textLight, fontWeight: '600'}}>Community First</Text>
            </View>
          </View>

          {/* Values Section */}
          <View style={{ marginVertical: 60 }}>
            <SectionTitle title="Our Core Values" subtitle="The principles that guide our every action." />
            <View style={[styles.valuesGrid, isMobile && styles.valuesGridMobile]}>
              <ValueItem 
                icon={Target} 
                title="Transparency" 
                desc="We provide clear reports on how every pound (£) is spent." 
              />
              <ValueItem 
                icon={Users} 
                title="Compassion" 
                desc="We treat every child and partner with dignity and kindness." 
              />
              <ValueItem 
                icon={Globe} 
                title="Sustainability" 
                desc="We focus on long-term solutions, not just quick fixes." 
              />
            </View>
          </View>

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
    paddingVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 18,
    color: Colors.textLight,
    textAlign: 'center',
    maxWidth: 600,
  },
  content: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  section: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
  },
  sectionMobile: {
    flexDirection: 'column-reverse',
  },
  textColumn: {
    flex: 1,
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: Colors.textLight,
    marginBottom: 16,
  },
  imagePlaceholder: {
    flex: 1,
    height: 300,
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  valuesGrid: {
    flexDirection: 'row',
    gap: 24,
  },
  valuesGridMobile: {
    flexDirection: 'column',
  },
  valueItem: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  valueTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  valueDesc: {
    textAlign: 'center',
    color: Colors.textLight,
    lineHeight: 22,
  },
});

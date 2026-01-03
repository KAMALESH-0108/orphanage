import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { Colors, Layout } from '../constants/Colors';
import { HeartHandshake, Clock, GraduationCap, Stethoscope } from 'lucide-react-native';

export default function VolunteerScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const OpportunityCard = ({ icon: Icon, title, desc }: any) => (
    <View style={styles.oppCard}>
      <View style={styles.iconContainer}>
        <Icon size={28} color={Colors.primary} />
      </View>
      <Text style={styles.oppTitle}>{title}</Text>
      <Text style={styles.oppDesc}>{desc}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.pageHero}>
          <Text style={styles.pageTitle}>Volunteer With Us</Text>
          <Text style={styles.pageSubtitle}>
            Give your time and talent to make a lasting difference in a child's life.
          </Text>
        </View>

        <View style={styles.content}>
          
          {/* Opportunities Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ways to Help</Text>
            <View style={[styles.grid, isMobile && styles.gridMobile]}>
              <OpportunityCard 
                icon={GraduationCap} 
                title="Teaching & Tutoring" 
                desc="Help children with homework, language skills, and basic education." 
              />
              <OpportunityCard 
                icon={Stethoscope} 
                title="Medical Support" 
                desc="Doctors and nurses needed for periodic health check-ups." 
              />
              <OpportunityCard 
                icon={HeartHandshake} 
                title="Care & Play" 
                desc="Spend quality time playing games and organising activities." 
              />
              <OpportunityCard 
                icon={Clock} 
                title="Event Support" 
                desc="Assist with fundraising events and community awareness drives." 
              />
            </View>
          </View>

          {/* Application Form */}
          <View style={styles.formSection}>
            <View style={styles.formCard}>
              {!submitted ? (
                <>
                  <Text style={styles.formHeader}>Volunteer Application</Text>
                  <Text style={styles.formSubHeader}>Fill out the form below to join our community.</Text>
                  
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput style={styles.input} placeholder="Jane Doe" />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput style={styles.input} placeholder="jane@example.com" keyboardType="email-address" />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Area of Interest</Text>
                    <TextInput style={styles.input} placeholder="e.g. Teaching, Medical, General" />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Availability</Text>
                    <TextInput style={styles.input} placeholder="e.g. Weekends, Summer" />
                  </View>

                  <Button 
                    title={loading ? "Submitting..." : "Join the Team"} 
                    onPress={handleSubmit}
                    loading={loading}
                    style={{ marginTop: 16 }}
                  />
                </>
              ) : (
                <View style={styles.successState}>
                  <HeartHandshake size={64} color={Colors.success} />
                  <Text style={styles.successTitle}>Welcome Aboard!</Text>
                  <Text style={styles.successText}>
                    Thank you for your interest in volunteering. Our coordinator will reach out to you shortly to schedule an orientation.
                  </Text>
                  <Button title="Back to Home" variant="outline" onPress={() => setSubmitted(false)} style={{marginTop: 24}} />
                </View>
              )}
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
  content: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  section: {
    marginBottom: 60,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  gridMobile: {
    flexDirection: 'column',
  },
  oppCard: {
    flex: 1,
    minWidth: 250,
    backgroundColor: Colors.white,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  oppTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  oppDesc: {
    color: Colors.textLight,
    lineHeight: 22,
  },
  formSection: {
    alignItems: 'center',
  },
  formCard: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: Colors.white,
    padding: 40,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  formHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  formSubHeader: {
    textAlign: 'center',
    color: Colors.textLight,
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: '#F9FAFB',
    outlineStyle: 'none',
  },
  successState: {
    alignItems: 'center',
    padding: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.success,
    marginTop: 16,
    marginBottom: 12,
  },
  successText: {
    textAlign: 'center',
    color: Colors.textLight,
    fontSize: 16,
    lineHeight: 24,
  },
});

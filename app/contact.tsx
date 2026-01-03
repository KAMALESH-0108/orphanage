import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, useWindowDimensions, Alert } from 'react-native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { Colors, Layout } from '../constants/Colors';
import { Mail, Phone, MapPin, Send } from 'lucide-react-native';

export default function ContactScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      // In a real app, this would submit to Supabase
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.pageHero}>
          <Text style={styles.pageTitle}>Contact Us</Text>
          <Text style={styles.pageSubtitle}>We'd love to hear from you. Get in touch with our team.</Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.grid, isMobile && styles.gridMobile]}>
            
            {/* Contact Info */}
            <View style={styles.infoColumn}>
              <Text style={styles.heading}>Get in Touch</Text>
              <Text style={styles.paragraph}>
                Have questions about our programmes or want to partner with us? Reach out using the details below or fill out the form.
              </Text>
              
              <View style={styles.contactItem}>
                <View style={styles.iconBox}><Mail size={20} color={Colors.primary} /></View>
                <View>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Text style={styles.contactValue}>hello@hopefororphans.org</Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <View style={styles.iconBox}><Phone size={20} color={Colors.primary} /></View>
                <View>
                  <Text style={styles.contactLabel}>Phone</Text>
                  <Text style={styles.contactValue}>+44 20 1234 5678</Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <View style={styles.iconBox}><MapPin size={20} color={Colors.primary} /></View>
                <View>
                  <Text style={styles.contactLabel}>Office</Text>
                  <Text style={styles.contactValue}>123 Charity Lane, London, UK</Text>
                </View>
              </View>
            </View>

            {/* Contact Form */}
            <View style={styles.formColumn}>
              <View style={styles.formCard}>
                {!sent ? (
                  <>
                    <Text style={styles.formTitle}>Send a Message</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Full Name</Text>
                      <TextInput style={styles.input} placeholder="John Doe" placeholderTextColor="#9CA3AF" />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Email Address</Text>
                      <TextInput style={styles.input} placeholder="john@example.com" placeholderTextColor="#9CA3AF" keyboardType="email-address" />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Message</Text>
                      <TextInput 
                        style={[styles.input, styles.textArea]} 
                        placeholder="How can we help?" 
                        placeholderTextColor="#9CA3AF" 
                        multiline 
                        numberOfLines={4}
                      />
                    </View>

                    <Button 
                      title={loading ? "Sending..." : "Send Message"} 
                      onPress={handleSubmit}
                      loading={loading}
                      icon={!loading ? <Send size={18} color={Colors.white} /> : undefined}
                    />
                  </>
                ) : (
                  <View style={styles.successState}>
                    <Text style={styles.successTitle}>Message Sent!</Text>
                    <Text style={styles.successText}>Thank you for contacting us. We will get back to you shortly.</Text>
                    <Button title="Send Another" variant="outline" onPress={() => setSent(false)} style={{marginTop: 20}} />
                  </View>
                )}
              </View>
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
  grid: {
    flexDirection: 'row',
    gap: 60,
  },
  gridMobile: {
    flexDirection: 'column',
  },
  infoColumn: {
    flex: 1,
  },
  formColumn: {
    flex: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: Colors.textLight,
    lineHeight: 24,
    marginBottom: 32,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  formCard: {
    backgroundColor: Colors.white,
    padding: 32,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 24,
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
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  successState: {
    alignItems: 'center',
    padding: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.success,
    marginBottom: 12,
  },
  successText: {
    textAlign: 'center',
    color: Colors.textLight,
    fontSize: 16,
    lineHeight: 24,
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { Colors, Layout } from '../constants/Colors';
import { CheckSquare, Square } from 'lucide-react-native';

export default function RequestHelpScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [needs, setNeeds] = useState<string[]>([]);

  const toggleNeed = (need: string) => {
    if (needs.includes(need)) {
      setNeeds(needs.filter(n => n !== need));
    } else {
      setNeeds([...needs, need]);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const NeedCheckbox = ({ label }: { label: string }) => {
    const isChecked = needs.includes(label);
    return (
      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={() => toggleNeed(label)}
        activeOpacity={0.7}
      >
        {isChecked ? (
          <CheckSquare size={20} color={Colors.primary} />
        ) : (
          <Square size={20} color={Colors.textLight} />
        )}
        <Text style={[styles.checkboxLabel, isChecked && styles.checkboxLabelChecked]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.pageHero}>
          <Text style={styles.pageTitle}>Request Help</Text>
          <Text style={styles.pageSubtitle}>
            Are you an orphanage or care centre in need? Register with us to receive support.
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.formCard}>
            {!submitted ? (
              <>
                <Text style={styles.sectionHeader}>Organisation Details</Text>
                
                <View style={[styles.row, isMobile && styles.rowMobile]}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Organisation Name</Text>
                    <TextInput style={styles.input} placeholder="e.g. Sunshine Home" />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Registration Number</Text>
                    <TextInput style={styles.input} placeholder="Govt. Reg. No." />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Location / Address</Text>
                  <TextInput style={styles.input} placeholder="Full address including city and country" />
                </View>

                <View style={[styles.row, isMobile && styles.rowMobile]}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contact Person</Text>
                    <TextInput style={styles.input} placeholder="Director Name" />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contact Phone</Text>
                    <TextInput style={styles.input} placeholder="+1 234..." />
                  </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.sectionHeader}>Current Needs</Text>
                <Text style={styles.helperText}>Select all that apply to your current situation:</Text>
                
                <View style={styles.checkboxGrid}>
                  <NeedCheckbox label="Food & Nutrition" />
                  <NeedCheckbox label="Clothing" />
                  <NeedCheckbox label="Education / Books" />
                  <NeedCheckbox label="Medical Supplies" />
                  <NeedCheckbox label="Infrastructure Repair" />
                  <NeedCheckbox label="Volunteer Support" />
                  <NeedCheckbox label="Financial Aid" />
                  <NeedCheckbox label="Toys & Recreation" />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Additional Details</Text>
                  <TextInput 
                    style={[styles.input, styles.textArea]} 
                    placeholder="Tell us more about your specific requirements..." 
                    multiline 
                    numberOfLines={4}
                  />
                </View>

                <Button 
                  title={loading ? "Submitting..." : "Submit Application"} 
                  onPress={handleSubmit}
                  loading={loading}
                  style={{ marginTop: 16 }}
                />
              </>
            ) : (
              <View style={styles.successState}>
                <Text style={styles.successTitle}>Application Received</Text>
                <Text style={styles.successText}>
                  Your request has been submitted successfully. Our verification team will review your details and contact you within 3-5 business days.
                </Text>
                <Button title="Return Home" variant="outline" onPress={() => setSubmitted(false)} style={{marginTop: 20}} />
              </View>
            )}
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
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  rowMobile: {
    flexDirection: 'column',
    gap: 0,
  },
  inputGroup: {
    flex: 1,
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
    height: 100,
    textAlignVertical: 'top',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 24,
  },
  helperText: {
    color: Colors.textLight,
    marginBottom: 16,
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: Colors.textLight,
    fontSize: 15,
  },
  checkboxLabelChecked: {
    color: Colors.text,
    fontWeight: '600',
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

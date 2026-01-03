import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Colors, Layout } from '../constants/Colors';
import { SectionTitle } from './SectionTitle';
import { MousePointerClick, CreditCard, Gift, Smile } from 'lucide-react-native';

const Step = ({ icon: Icon, number, title, description }: any) => (
  <View style={styles.step}>
    <View style={styles.iconWrapper}>
      <Icon size={32} color={Colors.primary} />
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{number}</Text>
      </View>
    </View>
    <Text style={styles.stepTitle}>{title}</Text>
    <Text style={styles.stepDescription}>{description}</Text>
  </View>
);

export const HowItWorks = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SectionTitle title="How It Works" />
        
        <View style={[styles.stepsContainer, isMobile && styles.stepsContainerMobile]}>
          <Step 
            number="1"
            icon={MousePointerClick}
            title="Choose a Cause"
            description="Browse through our verified orphanages and specific needs."
          />
          <Step 
            number="2"
            icon={CreditCard}
            title="Make a Donation"
            description="Select an amount or item to donate securely online."
          />
          <Step 
            number="3"
            icon={Gift}
            title="We Deliver"
            description="Our team ensures your donation reaches the children directly."
          />
          <Step 
            number="4"
            icon={Smile}
            title="See the Impact"
            description="Receive updates and photos of the smiles you created."
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    paddingVertical: 80,
  },
  content: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  stepsContainerMobile: {
    flexDirection: 'column',
    gap: 40,
  },
  step: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  numberBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  numberText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 15,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
});

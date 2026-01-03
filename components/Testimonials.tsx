import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Colors, Layout } from '../constants/Colors';
import { SectionTitle } from './SectionTitle';
import { Quote } from 'lucide-react-native';
import { TESTIMONIALS } from '../data/mock';

const TestimonialCard = ({ item }: { item: any }) => (
  <View style={styles.card}>
    <Quote size={32} color={Colors.primary} style={{ opacity: 0.3, marginBottom: 16 }} />
    <Text style={styles.quote}>"{item.quote}"</Text>
    <View style={styles.authorContainer}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.author.charAt(0)}</Text>
      </View>
      <View>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
    </View>
  </View>
);

export const Testimonials = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SectionTitle title="Stories of Hope" subtitle="Hear from our donors and the communities we serve." />
        
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBEB',
    paddingVertical: 80,
  },
  content: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    gap: 24,
  },
  gridMobile: {
    flexDirection: 'column',
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 32,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quote: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  author: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  role: {
    fontSize: 14,
    color: Colors.textLight,
  },
});

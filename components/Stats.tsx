import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Colors, Layout } from '../constants/Colors';
import { Users, Heart, Home, Award } from 'lucide-react-native';

const StatItem = ({ icon: Icon, value, label }: any) => (
  <View style={styles.statItem}>
    <Icon size={40} color={Colors.white} style={{ opacity: 0.8 }} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export const Stats = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        <StatItem icon={Users} value="15,000+" label="Children Helped" />
        <StatItem icon={Heart} value="$2.5M" label="Donations Raised" />
        <StatItem icon={Home} value="120" label="Orphanages Supported" />
        <StatItem icon={Award} value="500+" label="Active Volunteers" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingVertical: 60,
  },
  content: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  contentMobile: {
    flexDirection: 'column',
    gap: 40,
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    minWidth: 150,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.white,
    marginTop: 16,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
});

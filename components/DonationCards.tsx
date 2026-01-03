import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Colors, Layout } from '../constants/Colors';
import { Utensils, Shirt, Gamepad2, Banknote } from 'lucide-react-native';
import { SectionTitle } from './SectionTitle';
import { Button } from './Button';
import { DONATION_CATEGORIES } from '../data/mock';
import { DonationModal } from './DonationModal';
import { DonationCategory } from '../types';

const iconMap: Record<string, any> = {
  Utensils,
  Shirt,
  Gamepad2,
  Banknote,
};

export const DonationCards = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

  const [selectedCategory, setSelectedCategory] = useState<DonationCategory | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDonatePress = (item: DonationCategory) => {
    setSelectedCategory(item);
    setModalVisible(true);
  };

  const getContainerStyle = () => {
    if (isDesktop) return styles.gridDesktop;
    if (isTablet) return styles.gridTablet;
    return styles.gridMobile;
  };

  const DonationItem = ({ item }: { item: DonationCategory }) => {
    const Icon = iconMap[item.iconName] || Banknote;
    
    return (
      <View style={styles.card}>
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Icon size={32} color={Colors.white} />
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <Button 
          title="Donate" 
          variant="outline" 
          style={{ marginTop: 'auto', width: '100%', borderColor: item.color }} 
          textStyle={{ color: item.color }}
          onPress={() => handleDonatePress(item)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SectionTitle 
          title="Ways to Help" 
          subtitle="Choose a category to make a direct impact on a child's life today." 
        />
        
        <View style={getContainerStyle()}>
          {DONATION_CATEGORIES.map((item) => (
            <DonationItem key={item.id} item={item} />
          ))}
        </View>
      </View>

      <DonationModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        category={selectedCategory} 
      />
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
  gridDesktop: {
    flexDirection: 'row',
    gap: 24,
  },
  gridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  gridMobile: {
    flexDirection: 'column',
    gap: 24,
  },
  card: {
    flex: 1,
    minWidth: 250,
    backgroundColor: Colors.background,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 15,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
});

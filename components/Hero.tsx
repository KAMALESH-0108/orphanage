import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Layout } from '../constants/Colors';
import { Button } from './Button';
import { Heart, HandHeart } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export const Hero = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.background, '#FFEDD5']}
        style={styles.background}
      />
      <View style={[styles.content, { paddingHorizontal: isMobile ? 20 : 40 }]}>
        <View style={[styles.textContainer, isMobile && styles.textContainerMobile]}>
          <Text style={[styles.badge, isMobile && { alignSelf: 'center' }]}>Hope for Orphans</Text>
          <Text style={[styles.title, isMobile && styles.textCenter]}>
            Bring a <Text style={styles.highlight}>Smile</Text> to {'\n'}Every Child's Face
          </Text>
          <Text style={[styles.description, isMobile && styles.textCenter]}>
            Join our mission to provide food, shelter, and education to orphans around the world. Your small contribution makes a big impact.
          </Text>
          
          <View style={[styles.buttonGroup, isMobile && styles.buttonGroupMobile]}>
            <Button 
              title="Donate Now" 
              icon={<Heart size={20} color={Colors.white} />}
              style={isMobile ? styles.buttonMobile : styles.button}
              onPress={() => router.push('/causes')}
            />
            <Button 
              title="Request Help" 
              variant="outline"
              icon={<HandHeart size={20} color={Colors.primary} />}
              style={isMobile ? styles.buttonMobile : styles.button}
              onPress={() => router.push('/request-help')}
            />
          </View>
        </View>
        
        {!isMobile && (
          <View style={styles.imageContainer}>
             <View style={styles.decorativeCircle}>
                <Heart size={120} color={Colors.white} fill={Colors.white} style={{ opacity: 0.9 }} />
             </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 600,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  textContainer: {
    flex: 1,
    maxWidth: 600,
  },
  textContainerMobile: {
    alignItems: 'center',
  },
  badge: {
    color: Colors.primary,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 16,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.text,
    lineHeight: 56,
    marginBottom: 24,
  },
  highlight: {
    color: Colors.primary,
  },
  textCenter: {
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: Colors.textLight,
    lineHeight: 28,
    marginBottom: 40,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  buttonGroupMobile: {
    flexDirection: 'column',
    width: '100%',
  },
  button: {
    minWidth: 160,
  },
  buttonMobile: {
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorativeCircle: {
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  }
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Colors, Layout } from '../constants/Colors';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react-native';
import { Link } from 'expo-router';

export const Footer = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const FooterLink = ({ href, children }: { href: string, children: string }) => (
    <Link href={href as any} asChild>
      <TouchableOpacity>
        <Text style={styles.link}>{children}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        
        <View style={styles.column}>
          <Text style={styles.logo}>Hope for Orphans</Text>
          <Text style={styles.description}>
            Connecting generous hearts with children in need. Together, we can build a brighter future.
          </Text>
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialIcon}><Facebook size={20} color={Colors.white} /></TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}><Twitter size={20} color={Colors.white} /></TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}><Instagram size={20} color={Colors.white} /></TouchableOpacity>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={styles.heading}>Quick Links</Text>
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/causes">Our Causes</FooterLink>
          <FooterLink href="/volunteer">Volunteer</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </View>

        <View style={styles.column}>
          <Text style={styles.heading}>Contact Us</Text>
          <View style={styles.contactRow}>
            <Mail size={16} color={Colors.secondary} style={{ marginTop: 4 }} />
            <Text style={styles.contactText}>hello@hopefororphans.org</Text>
          </View>
          <View style={styles.contactRow}>
            <Phone size={16} color={Colors.secondary} style={{ marginTop: 4 }} />
            <Text style={styles.contactText}>+44 20 1234 5678</Text>
          </View>
          <View style={styles.contactRow}>
            <MapPin size={16} color={Colors.secondary} style={{ marginTop: 4 }} />
            <Text style={styles.contactText}>123 Charity Lane, London, UK</Text>
          </View>
        </View>
        
      </View>
      
      <View style={styles.bottomBar}>
        <Text style={styles.copyright}>© 2025 Hope for Orphans. All rights reserved.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#271C19', // Very dark brown
    paddingTop: 60,
  },
  content: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 60,
    gap: 40,
  },
  contentMobile: {
    flexDirection: 'column',
  },
  column: {
    flex: 1,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 16,
  },
  description: {
    color: '#A8A29E',
    lineHeight: 24,
    marginBottom: 24,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 20,
  },
  link: {
    color: '#D6D3D1',
    marginBottom: 12,
    fontSize: 15,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  contactText: {
    color: '#D6D3D1',
    flex: 1,
    lineHeight: 22,
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 24,
    alignItems: 'center',
  },
  copyright: {
    color: '#78716C',
    fontSize: 14,
  },
});

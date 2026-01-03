import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import { Colors, Layout } from '../constants/Colors';
import { Menu, X, Heart } from 'lucide-react-native';
import { Button } from './Button';
import { Link, useRouter, usePathname } from 'expo-router';

export const Header = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const NavLink = ({ href, title }: { href: string, title: string }) => (
    <Link href={href as any} asChild>
      <TouchableOpacity>
        <Text style={[
          styles.navLink, 
          isActive(href) && styles.navLinkActive
        ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );

  const MobileNavLink = ({ href, title }: { href: string, title: string }) => (
    <Link href={href as any} asChild>
      <TouchableOpacity 
        style={styles.mobileNavLink}
        onPress={() => setMenuOpen(false)}
      >
        <Text style={[
          styles.mobileNavText,
          isActive(href) && { color: Colors.primary, fontWeight: '700' }
        ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.logoContainer}>
            <Heart size={24} color={Colors.primary} fill={Colors.primary} />
            <Text style={styles.logoText}>Hope<Text style={{color: Colors.primary}}>Orphans</Text></Text>
          </TouchableOpacity>
        </Link>

        {!isMobile ? (
          <>
            <View style={styles.navLinks}>
              <NavLink href="/" title="Home" />
              <NavLink href="/about" title="About" />
              <NavLink href="/causes" title="Causes" />
              <NavLink href="/contact" title="Contact" />
            </View>
            <Button 
              title="Donate Now" 
              style={{ paddingVertical: 8, paddingHorizontal: 20 }}
              onPress={() => router.push('/causes')} 
            />
          </>
        ) : (
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} color={Colors.text} /> : <Menu size={24} color={Colors.text} />}
          </TouchableOpacity>
        )}
      </View>

      {isMobile && menuOpen && (
        <View style={styles.mobileMenu}>
          <MobileNavLink href="/" title="Home" />
          <MobileNavLink href="/about" title="About" />
          <MobileNavLink href="/causes" title="Causes" />
          <MobileNavLink href="/contact" title="Contact" />
          <View style={{ padding: 16 }}>
             <Button 
              title="Donate Now" 
              onPress={() => {
                setMenuOpen(false);
                router.push('/causes');
              }} 
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    position: Platform.OS === 'web' ? 'sticky' : 'relative',
    top: 0,
    zIndex: 100,
  },
  content: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    alignSelf: 'center',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 32,
  },
  navLink: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  navLinkActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  mobileMenu: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  mobileNavLink: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  mobileNavText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
});

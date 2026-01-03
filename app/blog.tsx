import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Colors, Layout } from '../constants/Colors';
import { Calendar, ArrowRight } from 'lucide-react-native';

const BLOG_POSTS = [
  {
    id: 1,
    title: "New Library Opened in Nairobi Centre",
    date: "12 Oct 2024",
    category: "Education",
    excerpt: "Thanks to your generous book donations, we have successfully inaugurated a new learning space for 50 children.",
    color: "#F59E0B"
  },
  {
    id: 2,
    title: "Winter Warmth Drive: A Huge Success",
    date: "05 Nov 2024",
    category: "Events",
    excerpt: "Over 500 coats and blankets were distributed to orphanages in colder regions this month.",
    color: "#059669"
  },
  {
    id: 3,
    title: "Meet Sarah: From Orphanage to University",
    date: "20 Nov 2024",
    category: "Success Stories",
    excerpt: "Read the inspiring journey of Sarah, who just received a full scholarship for her medical studies.",
    color: "#7C3AED"
  }
];

export default function BlogScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const BlogPost = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={[styles.categoryTag, { backgroundColor: item.color }]}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.dateRow}>
          <Calendar size={14} color={Colors.textLight} />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardExcerpt}>{item.excerpt}</Text>
        <View style={styles.readMore}>
          <Text style={styles.readMoreText}>Read Full Story</Text>
          <ArrowRight size={16} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.pageHero}>
          <Text style={styles.pageTitle}>Latest News</Text>
          <Text style={styles.pageSubtitle}>
            Updates, success stories, and reports from the field.
          </Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.grid, isMobile && styles.gridMobile]}>
            {BLOG_POSTS.map(post => (
              <BlogPost key={post.id} item={post} />
            ))}
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
    flexWrap: 'wrap',
    gap: 24,
  },
  gridMobile: {
    flexDirection: 'column',
  },
  card: {
    flex: 1,
    minWidth: 300,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    margin: 20,
    marginBottom: 10,
    borderRadius: 6,
  },
  categoryText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 13,
    color: Colors.textLight,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 28,
  },
  cardExcerpt: {
    fontSize: 15,
    color: Colors.textLight,
    lineHeight: 22,
    marginBottom: 20,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  readMoreText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 15,
  },
});

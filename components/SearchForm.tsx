import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors, Layout } from '../constants/Colors';
import { Search, MapPin, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react-native';
import { Button } from './Button';
import { SectionTitle } from './SectionTitle';
import { ORPHANAGES as MOCK_ORPHANAGES } from '../data/mock';
import { Orphanage } from '../types';
import { supabase } from '../lib/supabase';

export const SearchForm = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const [nameQuery, setNameQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [results, setResults] = useState<Orphanage[]>([]);
  const [allOrphanages, setAllOrphanages] = useState<Orphanage[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Fetch initial data
  useEffect(() => {
    fetchOrphanages();
  }, []);

  const fetchOrphanages = async () => {
    try {
      setLoadingData(true);
      
      // Check if we have valid Supabase config
      const hasSupabaseConfig = process.env.EXPO_PUBLIC_SUPABASE_URL && 
                               process.env.EXPO_PUBLIC_SUPABASE_URL !== 'YOUR_API_KEY';

      if (hasSupabaseConfig) {
        const { data, error } = await supabase
          .from('orphanages')
          .select('*');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setAllOrphanages(data as Orphanage[]);
        } else {
          // Fallback if table exists but is empty
          setAllOrphanages(MOCK_ORPHANAGES);
        }
      } else {
        // Fallback to mock data if no config
        setAllOrphanages(MOCK_ORPHANAGES);
      }
    } catch (error) {
      console.log('Error fetching orphanages, using mock data:', error);
      setAllOrphanages(MOCK_ORPHANAGES);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    setHasSearched(true);
    
    // Simulate network delay for better UX feel
    setTimeout(() => {
      const filtered = allOrphanages.filter(org => {
        const matchName = org.name.toLowerCase().includes(nameQuery.toLowerCase());
        const matchLocation = org.location.toLowerCase().includes(locationQuery.toLowerCase());
        return matchName && matchLocation;
      });
      setResults(filtered);
      setLoading(false);
    }, 500);
  };

  const ResultItem = ({ item }: { item: Orphanage }) => (
    <View style={styles.resultItem}>
      <View style={styles.resultContent}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultName}>{item.name}</Text>
          {item.verified && <CheckCircle2 size={16} color={Colors.success} style={{marginLeft: 6}} />}
        </View>
        <View style={styles.locationRow}>
          <MapPin size={14} color={Colors.textLight} />
          <Text style={styles.resultLocation}>{item.location}</Text>
        </View>
        <Text style={styles.resultDesc} numberOfLines={2}>{item.description}</Text>
        <View style={styles.needsRow}>
          {item.needs && item.needs.slice(0, 3).map((need, index) => (
            <View key={index} style={styles.needBadge}>
              <Text style={styles.needText}>{need}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.viewButton}>
        <ChevronRight size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SectionTitle 
          title="Find an Orphanage" 
          subtitle="Locate orphanages near you to visit, volunteer, or donate items directly."
        />
        
        <View style={[styles.formContainer, isMobile && styles.formContainerMobile]}>
          <View style={[styles.inputGroup, isMobile && styles.inputGroupMobile]}>
            <Search size={20} color={Colors.textLight} style={styles.inputIcon} />
            <TextInput 
              placeholder="Search by name..." 
              style={styles.input}
              placeholderTextColor={Colors.textLight}
              value={nameQuery}
              onChangeText={setNameQuery}
            />
          </View>
          
          <View style={[styles.inputGroup, isMobile && styles.inputGroupMobile]}>
            <MapPin size={20} color={Colors.textLight} style={styles.inputIcon} />
            <TextInput 
              placeholder="City or Country" 
              style={styles.input}
              placeholderTextColor={Colors.textLight}
              value={locationQuery}
              onChangeText={setLocationQuery}
            />
          </View>
          
          <Button 
            title={loading ? "Searching..." : "Search"}
            loading={loading}
            style={isMobile ? styles.buttonMobile : styles.button}
            onPress={handleSearch}
          />
        </View>

        {loadingData && !hasSearched && (
           <View style={{ alignItems: 'center', padding: 20 }}>
             <ActivityIndicator color={Colors.primary} />
             <Text style={{ marginTop: 10, color: Colors.textLight }}>Loading database...</Text>
           </View>
        )}

        {hasSearched && !loading && (
          <View style={styles.resultsContainer}>
            {results.length > 0 ? (
              <View style={isMobile ? styles.resultsListMobile : styles.resultsList}>
                {results.map(item => <ResultItem key={item.id} item={item} />)}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <AlertCircle size={48} color={Colors.textLight} style={{ opacity: 0.5, marginBottom: 16 }} />
                <Text style={styles.noResultsTitle}>No orphanages found</Text>
                <Text style={styles.noResultsText}>
                  We couldn't find any matches for "{nameQuery} {locationQuery}". 
                  {'\n'}Try adjusting your search terms or view all locations.
                </Text>
                <Button 
                  title="View All Orphanages" 
                  variant="outline" 
                  style={{ marginTop: 16 }}
                  onPress={() => {
                    setNameQuery('');
                    setLocationQuery('');
                    setResults(allOrphanages);
                  }}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF7ED', // Light orange tint
    paddingVertical: 80,
  },
  content: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: Colors.white,
    padding: 24,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 32,
  },
  formContainerMobile: {
    flexDirection: 'column',
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputGroupMobile: {
    width: '100%',
    height: 50,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: Colors.text,
    outlineStyle: 'none',
  },
  button: {
    minWidth: 120,
  },
  buttonMobile: {
    width: '100%',
  },
  resultsContainer: {
    marginTop: 16,
  },
  resultsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  resultsListMobile: {
    flexDirection: 'column',
    gap: 16,
  },
  resultItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 570, // roughly half minus gap on desktop
    flex: 1,
    minWidth: 300,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resultContent: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  resultName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  resultLocation: {
    fontSize: 14,
    color: Colors.textLight,
  },
  resultDesc: {
    fontSize: 14,
    color: '#57534E',
    marginBottom: 12,
    lineHeight: 20,
  },
  needsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  needBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  needText: {
    fontSize: 12,
    color: Colors.primaryDark,
    fontWeight: '500',
  },
  viewButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  noResultsText: {
    textAlign: 'center',
    color: Colors.textLight,
    lineHeight: 24,
  },
});

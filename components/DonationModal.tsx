import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { Colors } from '../constants/Colors';
import { X, CheckCircle, CreditCard, Heart } from 'lucide-react-native';
import { Button } from './Button';
import { DonationCategory } from '../types';

interface DonationModalProps {
  visible: boolean;
  onClose: () => void;
  category: DonationCategory | null;
}

const AMOUNTS = [10, 25, 50, 100];

export const DonationModal: React.FC<DonationModalProps> = ({ visible, onClose, category }) => {
  const [amount, setAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState('');
  const [step, setStep] = useState<'amount' | 'payment' | 'success'>('amount');
  const [loading, setLoading] = useState(false);

  const handleCustomAmountChange = (text: string) => {
    setCustomAmount(text);
    setAmount(null);
  };

  const handleDonate = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1500);
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep('amount');
      setAmount(25);
      setCustomAmount('');
    }, 300);
  };

  if (!category) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={resetAndClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={[styles.header, { backgroundColor: category.color }]}>
            <Text style={styles.headerTitle}>Donate to {category.title}</Text>
            <TouchableOpacity onPress={resetAndClose} style={styles.closeButton}>
              <X size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {step === 'amount' && (
              <>
                <Text style={styles.label}>Select Amount (GBP)</Text>
                <View style={styles.amountGrid}>
                  {AMOUNTS.map((val) => (
                    <TouchableOpacity
                      key={val}
                      style={[
                        styles.amountButton,
                        amount === val && { borderColor: category.color, backgroundColor: `${category.color}10` }
                      ]}
                      onPress={() => {
                        setAmount(val);
                        setCustomAmount('');
                      }}
                    >
                      <Text style={[
                        styles.amountText,
                        amount === val && { color: category.color, fontWeight: 'bold' }
                      ]}>£{val}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.label}>Or Enter Custom Amount</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.currencyPrefix}>£</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="0.00"
                    value={customAmount}
                    onChangeText={handleCustomAmountChange}
                  />
                </View>

                <Button
                  title="Continue"
                  style={{ backgroundColor: category.color, marginTop: 24 }}
                  onPress={() => setStep('payment')}
                />
              </>
            )}

            {step === 'payment' && (
              <>
                <View style={styles.summaryContainer}>
                  <Text style={styles.summaryLabel}>Total Donation</Text>
                  <Text style={[styles.summaryAmount, { color: category.color }]}>
                    £{amount || customAmount || '0'}
                  </Text>
                </View>

                <Text style={styles.label}>Payment Method</Text>
                <View style={styles.paymentMethod}>
                  <CreditCard size={24} color={Colors.text} />
                  <Text style={styles.paymentText}>Card ending in •••• 4242</Text>
                  <Text style={styles.changeText}>Change</Text>
                </View>

                <Button
                  title={loading ? "Processing..." : "Confirm Donation"}
                  loading={loading}
                  style={{ backgroundColor: category.color, marginTop: 24 }}
                  onPress={handleDonate}
                  icon={!loading ? <Heart size={18} color={Colors.white} /> : undefined}
                />
                
                <TouchableOpacity onPress={() => setStep('amount')} disabled={loading}>
                  <Text style={styles.backLink}>Back to Amount</Text>
                </TouchableOpacity>
              </>
            )}

            {step === 'success' && (
              <View style={styles.successContainer}>
                <CheckCircle size={64} color={Colors.success} />
                <Text style={styles.successTitle}>Thank You!</Text>
                <Text style={styles.successMessage}>
                  Your donation has been received. You are helping provide {category.title.toLowerCase()} to children in need.
                </Text>
                <Button
                  title="Close"
                  variant="outline"
                  style={{ marginTop: 24, width: '100%', borderColor: category.color }}
                  textStyle={{ color: category.color }}
                  onPress={resetAndClose}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textLight,
    marginBottom: 12,
    marginTop: 8,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  amountButton: {
    flex: 1,
    minWidth: '20%',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
  },
  currencyPrefix: {
    fontSize: 18,
    color: Colors.textLight,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: Colors.text,
    height: '100%',
    outlineStyle: 'none',
  },
  summaryContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: '800',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  paymentText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text,
  },
  changeText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  backLink: {
    textAlign: 'center',
    color: Colors.textLight,
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  successMessage: {
    textAlign: 'center',
    color: Colors.textLight,
    lineHeight: 24,
    fontSize: 16,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';

const BudgetCard = ({
  estimate_id,
  estimate_title,
  bill_date,
  academy_name,
  subwork,
  materials_list = [],
  clecrk_ce_file_1, // Single file URL or filename
  onApprove,
}) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const totalAmount = materials_list.reduce((sum, item) => sum + item.qty * item.rate, 0).toFixed(2);

  const sourceWiseTotal = materials_list.reduce((acc, item) => {
    if (!acc[item.source_type]) {
      acc[item.source_type] = 0;
    }
    acc[item.source_type] += item.qty * item.rate;
    return acc;
  }, {});

  const usedSources = Object.entries(sourceWiseTotal).filter(([_, value]) => value > 0);

  return (
    <View style={styles.card}>
      {/* Card Header */}
      <Text style={styles.estimateTitle}>{estimate_title}</Text>

      {/* Card Body */}
      <Text style={styles.cardText}>Estimate ID: {estimate_id}</Text>
      <Text style={styles.cardText}>Upload Date: {bill_date}</Text>
      <Text style={styles.cardText}>Subwork: {subwork}</Text>
      <Text style={styles.cardText}>Academy: {academy_name}</Text>

      {/* Clerk CE File Section */}
      <View style={styles.ceFileButton}>
        <Text style={styles.ceFileButtonText}>Clerk CE File</Text>
        {clecrk_ce_file_1 ? (
          <TouchableOpacity style={styles.ceFileViewButton} onPress={() => Alert.alert('Info', 'Download feature is available Soon .')}>
            <Text style={styles.ceFileViewText}>Download File</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.notUploadedText}>Not Uploaded</Text>
        )}
      </View>

      {usedSources.map(([source, amount]) => (
        <Text key={source} style={styles.cardText}>
          {source}: ₹{amount.toFixed(2)}
        </Text>
      ))}

      <Text style={styles.cardText}>Total Amount: {totalAmount}</Text>

      {/* Approve Button (Conditional) */}
      {onApprove && (
        <TouchableOpacity style={styles.approveButton} onPress={() => onApprove(estimate_id)}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
      )}

      {/* View Materials Button */}
      <TouchableOpacity style={styles.detailsButton} onPress={() => setDetailsVisible(true)}>
        <Text style={styles.detailsButtonText}>View Materials</Text>
      </TouchableOpacity>

      {/* Materials List Modal */}
      <Modal visible={detailsVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Materials List</Text>
            <View style={styles.tableContainer}>
              {/* Table Header */}
              <View style={styles.tableHeaderRow}>
                {['Material', 'Amount', 'Qty', 'Rate (₹)', 'Unit', 'Source'].map((header) => (
                  <Text key={header} style={styles.headerCell}>
                    {header}
                  </Text>
                ))}
              </View>

              {/* Table Rows */}
              {materials_list.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.cell}>{item.material}</Text>
                  <Text style={styles.cell}>{(item.qty * item.rate).toFixed(2)}</Text>
                  <Text style={styles.cell}>{item.qty}</Text>
                  <Text style={styles.cell}>{item.rate}</Text>
                  <Text style={styles.cell}>{item.unit}</Text>
                  <Text style={styles.cell}>{item.source_type}</Text>
                </View>
              ))}
            </View>

            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setDetailsVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  estimateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  ceFileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ceFileButtonText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  ceFileViewButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  ceFileViewText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  notUploadedText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
  },
  approveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  detailsButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    padding: 8,
    borderRightWidth: 1,
    borderColor: '#ccc',
    width: 150,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    textAlign: 'center',
    color: '#444',
    padding: 8,
    width: 150,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BudgetCard;
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const AcademyDetail = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { academy } = route.params;

//   const [formData] = useState({
//     academyName: academy.academy || '',
//     academyCode: academy.id || '123',
//     zone: academy.zone || 'zone',
//     landType: 'Land Type',
//     academicStatus: 'Academic Status',
//     yearofestablishment: 'Year of Establishment',
//     foundationStoneLaidBy: 'Foundation Stone Laid By',
//     donorName: 'Donor Name',
//     landArea: 'Land Area',
//     buildUpArea: 'Build Up Area',
//     coveredArea: 'Covered Area',
//     electricalLoad: 'Electrical Sanction Load',
//     electricityAccountNumber: 'Electricity Account Number',
//     transformer: 'Transformer',
//     solarKW: 'Solar (KW)',
//     solarType: 'Solar Type',
//     track: 'Track',
//     stpDetail: 'STP Detail',
//     lastYearOfExternalPaint: 'Last Year Of External Paint',
//     driverRoom: 'Driver Room',
//     academyAddress: 'Academy Address',
//     lastYearOfInternalPaint: 'Last year Of Internal Paint',
//     basketBallCourt: 'Basket Ball Court',
//     runBy: 'RunBy',
//   });

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.formContainer}>
//         {renderFormFields(formData)}
//       </ScrollView>
//     </View>
//   );
// };

// const renderFormFields = (formData) => {
//   const fields = [
//     { label: 'Academy', key: 'academyName' },
//     { label: 'Academy Code', key: 'academyCode' },
//     { label: 'Zone', key: 'zone' },
//     { label: 'Land Type', key: 'landType' },
//     { label: 'Academic Status', key: 'academicStatus' },
//     { label: 'Year of Establishment', key: 'yearofestablishment' },
//     { label: 'Foundation Stone Laid By', key: 'foundationStoneLaidBy' },
//     { label: 'Donor Name', key: 'donorName' },
//     { label: 'Land Area (Value in Acre)', key: 'landArea' },
//     { label: 'Build Up Area (Value in Sft)', key: 'buildUpArea' },
//     { label: 'Covered Area (Sft)', key: 'coveredArea' },
//     { label: 'Electrical Sanction Load', key: 'electricalLoad' },
//     { label: 'Electricity Account Number', key: 'electricityAccountNumber' },
//     { label: 'Transformer', key: 'transformer' },
//     { label: 'Solar (KW)', key: 'solarKW' },
//     { label: 'Solar Type', key: 'solarType' },
//     { label: 'Track', key: 'track' },
//     { label: 'STP Detail', key: 'stpDetail' },
//     { label: 'Last Year Of External Paint', key: 'lastYearOfExternalPaint' },
//     { label: 'Driver Room', key: 'driverRoom' },
//     { label: 'Academy Address', key: 'academyAddress' },
//     { label: 'Last year Of Internal Paint', key: 'lastYearOfInternalPaint' },
//     { label: 'Basket Ball Court', key: 'basketBallCourt' },
//     { label: 'RunBy', key: 'runBy' },
//   ];

//   return fields.map(({ label, key }) => (
//     <View key={key} style={styles.inputContainer}>
//       <Text style={styles.label}>{label}</Text>
//       <TextInput
//         style={styles.input}
//         value={formData[key]}
//         editable={false}
//       />
//     </View>
//   ));
// };

// export default AcademyDetail;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   formContainer: {
//     padding: 16,
//   },

//   inputContainer: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#CCCCCC',
//     borderRadius: 8,
//     padding: 10,
//     backgroundColor: '#E9ECEF',
//     color: '#333333',
//   },
// });


import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const AcademyDetail = () => {
  
  const [expandedCard, setExpandedCard] = useState(false);
  const [academyLandDetails, setAcademyLandDetails] = useState(false);
  const [academyHistoryDetails, setAcademyHistoryDetails] = useState(false);

  return (
    <View style={styles.container}>
     

      {/* CARD DESIGN */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.heading} onPress={() => setExpandedCard(!expandedCard)}>
          <Text style={styles.headingText}>Academy Details</Text>
          <Text style={styles.arrowText}>{expandedCard ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {expandedCard && (
          <View style={styles.details}>
            <Text style={styles.detailText}>• Academy Name : Rachhin</Text>
            <Text style={styles.detailText}>• Zone Name    : Moga</Text>
            <Text style={styles.detailText}>• Academy Code : 123</Text>
            <Text style={styles.detailText}>• Donor Name : Arshdeep Singh</Text>
            <Text style={styles.detailText}>• Academy Address : Moga</Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.heading} onPress={() => setAcademyLandDetails(!academyLandDetails)}>
          <Text style={styles.headingText}>Academy Land Details</Text>
          <Text style={styles.arrowText}>{expandedCard ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {academyLandDetails && (
          <View style={styles.details}>
            <Text style={styles.detailText}>• Land Type : Red</Text>
            <Text style={styles.detailText}>• Land Area (Value in Acre) : 25</Text>
            <Text style={styles.detailText}>• Build Up Area (Value in Sft) : 864</Text>
            <Text style={styles.detailText}>• Covered Area (Sft) : 1234</Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.heading} onPress={() => setAcademyHistoryDetails(!academyHistoryDetails)}>
          <Text style={styles.headingText}>Academy History Details</Text>
          <Text style={styles.arrowText}>{expandedCard ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {academyHistoryDetails && (
          <View style={styles.details}>
            <Text style={styles.detailText}>• Year of Establishment : 1998</Text>
            <Text style={styles.detailText}>• Foundation Stone Laid By : xyz</Text>
          </View>
        )}
      </View>

      <View style={styles.card1}>
      <View style={styles.heading}>
      <Text style={styles.headingText}>Academy Details</Text>
      </View >
      <Text style={styles.detailText}>• Academy Name : Rachhin</Text>
            <Text style={styles.detailText}>• Zone Name    : Moga</Text>
            <Text style={styles.detailText}>• Academy Code : 123</Text>
            <Text style={styles.detailText}>• Donor Name : Arshdeep Singh</Text>
            <Text style={styles.detailText}>• Academy Address : Moga</Text>
      </View>

      <View style={styles.card1}>
      <View style={styles.heading}>
      <Text style={styles.headingText}>Academy Land Details</Text>
      </View >
      <Text style={styles.detailText}>• Land Type : Red</Text>
            <Text style={styles.detailText}>• Land Area (Value in Acre) : 25</Text>
            <Text style={styles.detailText}>• Build Up Area (Value in Sft) : 864</Text>
            <Text style={styles.detailText}>• Covered Area (Sft) : 1234</Text>
      </View>

      <View style={styles.card1}>
      <View style={styles.heading}>
      <Text style={styles.headingText}>Academy History Details</Text>
      </View >
      <Text style={styles.detailText}>• Year of Establishment : 1998</Text>
      <Text style={styles.detailText}>• Foundation Stone Laid By : xyz</Text>
      </View>
    </View>
  );
};

export default AcademyDetail;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    backgroundColor: '#1976D2',
    padding: 12,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#E3F2FD',
    borderRadius: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  card1: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

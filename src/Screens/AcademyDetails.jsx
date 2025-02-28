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
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const AcademyDetail = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const animationValues = {};

  const toggleSection = (section) => {
    if (!animationValues[section]) {
      animationValues[section] = new Animated.Value(0);
    }

    const toValue = expandedSections[section] ? 0 : 1;

    Animated.timing(animationValues[section], {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* General Details */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('generalDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>General Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.generalDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.generalDetails
              ? animationValues['generalDetails']
                ? animationValues['generalDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 300],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Academy Name: CIVIL OFFICE RATIA</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Academy Code: AC00170</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Zone: RATIA</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Land Type: Office</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Academic Status: Under Construction</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Donor Name: Not Provided</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Foundation Stone Laid By: Not Provided</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Year of Establishment: Not Provided</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Land Area: Not Provided</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Build Up Area: Not Provided</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Covered Area: Not Provided</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Academy Address: test address ratia</Text>
          </View>
        </Animated.View>
      </View>

      {/* Contact Details */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('contactDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>Contact Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.contactDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.contactDetails
              ? animationValues['contactDetails']
                ? animationValues['contactDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Principal Name: 11</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Principal Contact No: 1111222</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Clerk Name: 22</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Clerk Contact No: 11 44</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Security Guard (Day) Name: 11 44</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Security Guard (Day) No: 111 44</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Security Guard (Night) Name: 11 33</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Security Guard (Night) No: 111 33</Text>
          </View>
        </Animated.View>
      </View>

      {/* Location */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('location')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>Location</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.location ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.location
              ? animationValues['location']
                ? animationValues['location'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Latitude: 111.222</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Longitude: 22.2222111</Text>
          </View>
        </Animated.View>
      </View>

      {/* Student Details */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('studentDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>Student Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.studentDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.studentDetails
              ? animationValues['studentDetails']
                ? animationValues['studentDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Total No Of Boys: Not Provided</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Total No Of Girls: Not Provided</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Total No Of Students: Not Provided</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• No of Students in Transport: Not Provided</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• No Of Boys Toilet: Not Provided</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• No Of Girls Toilet: Not Provided</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Class Up To: Not Provided</Text>
          </View>
        </Animated.View>
      </View>

       {/* Property Tax Detail */}
       <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('propertyTexDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>Property Tax Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.propertyTexDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.propertyTexDetails
              ? animationValues['propertyTexDetails']
                ? animationValues['propertyTexDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Property Tax Applicable: Yes/No</Text>
          </View>
        </Animated.View>
      </View>

      {/* Fire Cylinder Details */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('fireCylinderDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>Fire Cylinder Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.fireCylinderDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.fireCylinderDetails
              ? animationValues['fireCylinderDetails']
                ? animationValues['fireCylinderDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Type Of Cylinder: co2_2kg</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• No Of Fire Cylinder: 1</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Expire Date: 05/20/2024</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Type Of Cylinder: co2_2kg</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• No Of Fire Cylinder: 12</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Expire Date: 05/21/2024</Text>
          </View>
        </Animated.View>
      </View>

       {/* Fire Hydrant Details */}
       <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('fireHydrantDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>Fire Hydrant Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.fireCylinderDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.fireHydrantDetails
              ? animationValues['fireHydrantDetails']
                ? animationValues['fireHydrantDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Location: location 1</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Paint Date: 01/01/2024</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Location: location 12</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Paint Date: 05/21/2024</Text>
          </View>
        </Animated.View>
      </View>

      {/* Bore Detail */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('boreDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>Bore Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.boreDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.boreDetails
              ? animationValues['boreDetails']
                ? animationValues['boreDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Depth (Feet): depth 1</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• DIA (Inch): dia 1</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Depth (Feet): depth 12</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• DIA (Inch): dia 12</Text>
          </View>
        </Animated.View>
      </View>


      {/* Generator Details */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('generatorDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>Generator Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.generatorDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.generatorDetails
              ? animationValues['generatorDetails']
                ? animationValues['generatorDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Generator (KW): Generator</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Make: Make</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Model: Model</Text>
          </View>
        </Animated.View>
      </View>

      {/* Domestic Water Tank Details */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('domesticWaterTankDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>Domestic Water Tank Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.domesticWaterTankDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.domesticWaterTankDetails
              ? animationValues['domesticWaterTankDetails']
                ? animationValues['domesticWaterTankDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>•  Capacity (Litre): Capacity</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Type: Type</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Model: Model</Text>
          </View>
        </Animated.View>
      </View>

      {/* Fire Water Tank Details */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('fireWaterTankDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>Fire Water Tank Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.fireWaterTankDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.fireWaterTankDetails
              ? animationValues['fireWaterTankDetails']
                ? animationValues['fireWaterTankDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
          <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>•  Capacity (Litre): Capacity</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Type: Type</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Model: Model</Text>
          </View>
        </Animated.View>
      </View>

      {/* RO Details */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('roDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>RO Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.roDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.roDetails
              ? animationValues['roDetails']
                ? animationValues['roDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
          <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>•  RO Detail (Litre): 50 LTR</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Make: ro _makw 1</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Model: Model</Text>
          </View>
        </Animated.View>
      </View>

      {/* Water Cooler Details */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('waterCoolerDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>Water Cooler Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.waterCoolerDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.waterCoolerDetails
              ? animationValues['waterCoolerDetails']
                ? animationValues['waterCoolerDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
          <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>•  WaterCooler (Litre): 50 LTR</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Make: ro _makw 1</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Model: Model</Text>
          </View>
        </Animated.View>
      </View>

      {/* Motor Details */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('motorDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>Motor Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.motorDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.motorDetails
              ? animationValues['motorDetails']
                ? animationValues['motorDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
          <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>•  Motor Detail: Motor Detail 11</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Hp: hp 1</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Depth: depth 1</Text>
          </View>
        </Animated.View>
      </View>

      {/* Submersible Motor Details */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('submersibleMotorDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}> Submersible Motor Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.submersibleMotorDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.submersibleMotorDetails
              ? animationValues['submersibleMotorDetails']
                ? animationValues['submersibleMotorDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
          <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>•  Submersible Motor Detail: Motor Detail 11</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Submersible Motor Hp: hp 1</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Submersible Motor Depth: depth 1</Text>
          </View>
        </Animated.View>
      </View>


      {/* Covered Area Details */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('coverAreaDetails')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}> Covered Area Details</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.coverAreaDetails ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.coverAreaDetails
              ? animationValues['coverAreaDetails']
                ? animationValues['coverAreaDetails'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details}>
          <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>•  Floor: Floor</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Covered Area: Covered Area</Text>
          </View>
        </Animated.View>
      </View>

      {/* Files Section */}
      <View style={[styles.card, { padding: width * 0.04 }]}>
        <TouchableOpacity
          style={[styles.heading, { padding: width * 0.03 }]}
          onPress={() => toggleSection('files')}
        >
          <Text style={[styles.headingText, { fontSize: width * 0.04 }]}>Files</Text>
          <Text style={[styles.arrowText, { fontSize: width * 0.05 }]}>
            {expandedSections.files ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: expandedSections.files
              ? animationValues['files']
                ? animationValues['files'].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 500],
                  })
                : null
              : 0,
            overflow: 'hidden',
          }}
        >
          <View style={styles.details }>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• SURVEY PLAN: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• SITE PLAN: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• BEARING CAPACITY: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• FLOOR PLAN: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• PHOTOS: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• APPROVED PLAN: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• REGISTRY: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• FOUNDATION STONE: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• OTHER FILE: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• DONOR PHOTO: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• CRO REPORT WITH TEHSILDAR LETTER: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• AKS SAJRA: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• COPY OF LATHA: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• JAMABANDI: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• ESTIMATE COST OF BUILDING: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• STRUCTURE SAFETY CERTIFICATE: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• CLU DRAFT LETTER: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• BUILDING PLAN DRAFT LETTER: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• DEMAND NOTICES: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• SCHOOL STARTING PROOF: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• SINGLE PLOT CERTIFICATE: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Building Safety Certification: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Noc: Download</Text>
            <Text style={[styles.detailText, { fontSize: width * 0.035 }]}>• Water Hygiene: Download</Text>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default AcademyDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Dimensions.get('window').width * 0.04,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: Dimensions.get('window').height * 0.02,
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  heading: {
    backgroundColor: '#1976D2',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  arrowText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  details: {
    marginTop: Dimensions.get('window').height * 0.01,
    padding: Dimensions.get('window').width * 0.03,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
  },
  detailText: {
    color: '#333',
    marginBottom: 5,
  },
});
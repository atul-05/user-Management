import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Spinner} from '@ui-kitten/components';
import {useRoute} from '@react-navigation/native';
export const UserDetails = props => {
  const route = useRoute();
  console.log(route.params.user);
  const item = route.params.user;
  return (
    <View style={{flex: 1, backgroundColor: '#ffff'}}>
      <Card
        style={{
          width: '95%',
          alignSelf: 'center',
          backgroundColor: '#F6F6F6',
          borderRadius: 10,
          marginVertical: 5,
        }}>
        <Text style={styles.title}>
          name : <Text style={styles.subText}> {item.name}</Text>
        </Text>
        <Text style={styles.title}>
          User Name : <Text style={styles.subText}> {item.username}</Text>
        </Text>
        <Text style={styles.title}>
          Email : <Text style={styles.subText}> {item.email}</Text>
        </Text>
        <Text style={styles.title}>
          Phone : <Text style={styles.subText}> {item.phone}</Text>
        </Text>

        <Text style={styles.title}>
          website : <Text style={styles.subText}> {item.website}</Text>
        </Text>
        <Text style={styles.title}>
          Company Name :<Text style={styles.subText}> {item.company.name}</Text>
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 14,
  },

  subText: {
    fontWeight: '500',
    fontSize: 13.5,
  },
});

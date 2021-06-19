import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Spinner} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

export const UserListRenderitme = props => {
  const {item} = props;
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <Card
        onPress={() => {
          navigation.navigate('UserAction', {
            userData: item,
            userid: item.id,
          });
        }}
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
          UserName : <Text style={styles.subText}> {item.username}</Text>
        </Text>
        <Text style={styles.title}>
          Phone : <Text style={styles.subText}> {item.phone}</Text>
        </Text>
        <Text style={styles.title}>
          Company Name :{' '}
          <Text style={styles.subText}> {item.company.name}</Text>
        </Text>
        <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
          <Text
            onPress={() => {
              navigation.navigate('UserAction', {
                userData: item,
                userid: item.id,
              });
            }}
            style={[styles.title, {color: 'blue'}]}>
            Actions
          </Text>
        </View>
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
    fontWeight: '400',
    fontSize: 12,
  },
});

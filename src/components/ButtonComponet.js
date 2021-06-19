import React, {useEffect} from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';

export const Button = props => {
  const {title, forSubmit, loading, color, Disable} = props;
  useEffect(() => {}, [loading, Disable]);
  return (
    <TouchableOpacity
      onPress={() => {
        if (loading) {
          return;
        }
        if (Disable) {
          return;
        }
        forSubmit();
      }}
      style={{
        width: 100,
        height: 50,
        backgroundColor: Disable ? '#eeee' : color,
        borderColor: Disable ? '#eeee' : color,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 50,
      }}>
      {loading ? (
        <ActivityIndicator color="#ffff" size="large" />
      ) : (
        <Text style={{fontSize: 15, color: '#ffff', fontWeight: '500'}}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

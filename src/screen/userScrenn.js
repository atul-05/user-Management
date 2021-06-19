import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Card, Spinner} from '@ui-kitten/components';
import http from '../http';
import {UserListRenderitme} from '../components/userListRender';

const Mainscreen = props => {
  const [isLoading, setisloding] = useState(false);
  const [userdata, setuserData] = useState([]);
  const getuser = () => {
    setisloding(true);
    http
      .get('/users')
      .then(res => {
        setisloding(false);
        setuserData(res);
      })
      .catch(err => {
        setisloding(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getuser();
  }, []);

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner />
        </View>
      ) : userdata && userdata.length > 0 ? (
        <FlatList
          data={userdata}
          keyExtractor={item => item.id}
          renderItem={({item}) => <UserListRenderitme item={item} />}
        />
      ) : (
        <Card
          style={{
            width: '95%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffff',
          }}>
          <Text>No data found</Text>
        </Card>
      )}
    </View>
  );
};

export default Mainscreen;

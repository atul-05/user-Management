import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Card, Spinner, Icon, Modal} from '@ui-kitten/components';
import http from '../http';
import {useRoute} from '@react-navigation/native';
import {UserAction} from './AddorEditpost';

const RednerPost = props => {
  const {item, postDetails} = props;
  return (
    <View style={{flex: 1, backgroundColor: '#ffff'}}>
      <Card
        onPress={() => {
          postDetails(item);
        }}
        style={{
          width: '93%',
          alignSelf: 'center',
          backgroundColor: '#F6F6F6',
          borderRadius: 10,
          marginVertical: 5,
        }}>
        <View
          style={{
            width: '95%',
            alignSelf: 'center',

            marginLeft: 8,
            marginBottom: 15,
          }}>
          <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.title}>
            {item.title}
          </Text>
        </View>

        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            borderTopColor: '#4285F4',
            borderBottomColor: '#DB4437',
            borderWidth: 2,
            borderLeftColor: '#F4B400',
            padding: 10,
            borderRightColor: '#0F9D58',
          }}>
          <View>
            <Text numberOfLines={3} style={styles.subText}>
              {' '}
              {item.body}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginTop: 10,
            width: 32,
            height: 32,
            //   backgroundColor: 'red',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.onchange(item);
            }}
            style={{width: 32, height: 32}}>
            <Icon
              name="edit-2-outline"
              fill="#a9a9a9"
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

export const UserPost = props => {
  const route = useRoute();

  //   console.log(route.params.user);
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setisloding] = useState(false);
  const [userdata, setuserData] = useState([]);
  const [selected, setselected] = useState([{}]);
  const [clearText, setclearText] = useState(false);
  const [DetailView, setDetailsView] = useState(false);
  const copyArr = [...userdata];
  const getuser = () => {
    setisloding(true);
    http
      .get(`/posts?userId=${route.params.user}`)
      .then(res => {
        setisloding(false);
        setuserData(res);
      })
      .catch(err => {
        setisloding(false);
        console.log(err);
      });
  };

  // console.log('userdata', userdata);
  useEffect(() => {
    let istrue = false;
    getuser();
    return () => {
      istrue = true;
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner />
        </View>
      ) : userdata && userdata.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={userdata}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <RednerPost
              item={item}
              onchange={value => {
                setselected(value);

                setVisible(!visible);
              }}
              postDetails={value => {
                setselected(value);
                setDetailsView(true);
              }}
            />
          )}
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

      <TouchableOpacity
        onPress={() => {
          setclearText(true);
          setVisible(true);
        }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#89CFF0',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-start',
          bottom: 20,
          marginLeft: 10,
        }}>
        <Icon
          name="plus-outline"
          fill="#ffff"
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
      {visible && (
        <UserAction
          userId={route.params.user}
          newForm={clearText}
          clearNewForm={() => {
            setclearText(false);
          }}
          removeItem={value => {
            const filterarr = copyArr.filter(item => item.id != value);
            console.log('filterarr', filterarr);
            setuserData(filterarr);
          }}
          change={visible}
          setchange={(value = {}) => {
            setVisible(false);
            if (value) {
              // console.log('setchange();', value);

              if (!clearText) {
                copyArr.forEach((item, index, arr) => {
                  if (item.id == value.id) {
                    arr[index] = value;
                    return arr;
                  }
                });
                setuserData(copyArr);
              } else {
                const data = copyArr.map((item, index, arr) => {
                  if (clearText && item.id != value.id) {
                    return [value].concat(arr);
                  } else {
                    return useState;
                  }
                });
                // console.log('setchange();', data);
                setuserData(...data);
              }
            }
          }}
          data={selected}
        />
      )}

      <Modal
        backdropStyle={styles.backdrop}
        style={{width: '100%'}}
        visible={DetailView}
        onBackdropPress={() => {
          setDetailsView(false);
        }}>
        <Card
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#F6F6F6',
            borderRadius: 10,
          }}>
          <ScrollView>
            <Text style={styles.title}>{selected.title}</Text>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#4285F4',
                marginVertical: 10,
              }}></View>
            <View style={{marginTop: 5}}>
              <Text style={styles.subText}>{selected.body}</Text>
            </View>
          </ScrollView>
        </Card>
      </Modal>
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
    fontSize: 14,
  },
  icon: {
    width: 32,
    height: 32,
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

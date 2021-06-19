import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {Card, Modal, Input} from '@ui-kitten/components';

import {Formik, useFormik} from 'formik';

import http from '../http';
import {PostValidation} from './validation';
import {Button} from './ButtonComponet';

export const UserAction = props => {
  const {setchange, data, newForm, userId, clearNewForm, removeItem} = props;
  const [visible, setVisible] = React.useState(true);
  const [up, setup] = React.useState(0);
  const [loading, setloading] = React.useState(0);
  const [disable, setdisable] = React.useState(null);

  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  var uniqid = randLetter + Date.now();
  const [userInput, setuserinput] = useState({
    id: `${data.id}`,
    title: data.title,
    body: data.body,
    userId: `${data.userId}`,
  });

  let insitaldata = {
    id: `${data.id}`,
    title: data.title,
    body: data.body,
    userId: `${data.userId}`,
  };

  if (newForm) {
    insitaldata = {
      title: '',
      body: '',
      userId: userId,
    };
  }

  const formik = useFormik({
    initialValues: {
      ...insitaldata,
    },

    onSubmit: values => {
      setuserinput({
        ...userInput,
        title: values.title,
        body: values.body,
      });
      if (newForm) {
        AddPost(values.title, values.body);
      } else {
        editPostdata(values.title, values.body);
      }
    },
    validateOnMount: true,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: PostValidation,
  });

  useEffect(() => {
    let istrue = false;
    let keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    let keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );

    return () => {
      istrue = true;
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [newForm]);

  const keyboardDidShow = () => {
    setup(40);
  };

  const keyboardDidHide = () => {
    setup(0);
  };

  const AddPost = (title, body) => {
    setloading(1);
    setdisable(2);
    http
      .post('/posts', {title, body, userId: userId})
      .then(res => {
        console.log('res', res);
        setchange({...res, id: uniqid});
        clearNewForm();
        setloading(0);
        setdisable(null);
      })
      .catch(err => {
        setloading(0);
        setdisable(null);
        console.log(err);
      });
  };

  const editPostdata = (title, body) => {
    console.log('put response');
    setloading(1);
    setdisable(2);
    http
      .put(`/posts/${userInput.id}`, {
        title,
        body,
        id: userInput.id,
        userId: userInput.userId,
      })
      .then(res => {
        setloading(0);
        setdisable(null);
        console.log('put response', res);
        setchange(res);
      })
      .catch(err => {
        setloading(0);
        setchange({
          title,
          body,
          id: userInput.id,
          userId: userInput.userId,
        });
        setdisable(null);
        console.log('err', err);
      });
  };

  const deleltPost = () => {
    setdisable(1);
    setloading(2);

    http
      .delete(`/posts/${userInput.id}`)
      .then(res => {
        setloading(0);
        setdisable(null);
        console.log('post data', res);
        removeItem(userInput.id);
        setchange(null);
      })
      .catch(err => {
        setloading(0);
        setdisable(null);
        console.log('post data', err);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        style={{width: '100%'}}
        onBackdropPress={() => {
          setVisible(false);
          setchange(null);
          clearNewForm();
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <Card
              style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#F6F6F6',
                borderRadius: 10,
                height: 400,
              }}>
              <Input
                label="title"
                onChangeText={formik.handleChange('title')}
                value={formik.values.title}
                placeholder="Enter title"
                label={evaProps => (
                  <Text {...evaProps} style={{fontSize: 15}}>
                    {' '}
                    Title
                  </Text>
                )}
              />
              {formik.errors.title && formik.touched.title ? (
                <Text style={{color: 'red', textAlign: 'right'}}>
                  {formik.errors.title}
                </Text>
              ) : null}
              <View style={{bottom: up > 0 ? up : 0, height: 150}}>
                <Input
                  //   {...multilineInputState}
                  style={{marginTop: 50}}
                  placeholder="write your post"
                  onChangeText={formik.handleChange('body')}
                  multiline={true}
                  value={formik.values.body}
                  textStyle={{minHeight: 64, maxHeight: 150}}
                  label={evaProps => (
                    <Text {...evaProps} style={{fontSize: 15}}>
                      {' '}
                      Post
                    </Text>
                  )}
                  placeholder="Enter title"
                />
                {formik.errors.body && formik.touched.body ? (
                  <Text style={{color: 'red', textAlign: 'right'}}>
                    {formik.errors.body}
                  </Text>
                ) : null}
              </View>
              <View
                style={{
                  flexDirection: !newForm ? 'row' : 'column',
                  justifyContent: !newForm ? 'space-between' : 'center',
                  marginTop: 15,
                }}>
                {!newForm && (
                  <Button
                    title="Delete"
                    loading={loading == 2 ? true : false}
                    forSubmit={deleltPost}
                    color="#FF004F"
                    Disable={disable == 2 ? true : false}
                  />
                )}
                <Button
                  title="Update"
                  loading={loading == 1 ? true : false}
                  forSubmit={formik.handleSubmit}
                  color="#00A877"
                  Disable={disable == 1 ? true : false}
                />
              </View>
            </Card>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

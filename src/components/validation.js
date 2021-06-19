import * as Yup from 'yup';

export const PostValidation = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Too Short!')
    .max(70, 'Too long')
    .required('Please Fill Title'),
  body: Yup.string()
    .matches(/^[a-zA-Z\s0-9]*$/, 'Post  contain spacial charecter')
    .required('Write A Post'),
});

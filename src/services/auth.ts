// const baseUrl = 'https://gold-wide-eyed-sparrow.cyclic.app/';
// const authUrl = `${baseUrl}/api/auth`;

// import { useRef } from 'react';
// import { SignUpType } from '../types/auth';

// export const register = async (data: SignUpType) => {
//   const signUpFormRef = useRef(null);

//   console.log('Handled submit yesss!!', data);
//   const res = await fetch(`${authUrl}/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: data.name,
//       lastName: data.lastName,
//       email: data.email,
//       password: data.password,
//     }),
//   });

//   const resData = await res.json();

//   if (!resData.success) {
//     console.log('Error in register', resData);
//     // signUpFormRef.current.setErrors();
//   }

//   console.log(resData);
// };

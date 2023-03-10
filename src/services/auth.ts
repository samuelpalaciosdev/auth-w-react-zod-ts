const baseUrl = 'https://gold-wide-eyed-sparrow.cyclic.app/';
const authUrl = `${baseUrl}/api/auth`;

import { SignUpType } from '../types/auth';

export const register = async (data: SignUpType) => {
  console.log('Handled submit yesss!!', data);
  const res = await fetch(`${authUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    }),
  });

  const resData = await res.json();

  console.log(resData);
};

const baseUrl = 'http://163.172.177.98:8081';

const baseHeaders = {
  "Content-Type": 'application/json',
  "Accept": 'application/json'
}

export const login = async (email: string, password: string): Promise<{ token: string, userName: string }> => {

  const result = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      ...baseHeaders
    },
    body: JSON.stringify({ email, password })
  });

  if (!result.ok) {
    const errorText = await result.text();
    throw new Error(`HTTP error! status: ${result.status}, message: ${errorText}`);
  }

  const data = await result.json();
  return { token: data.accessToken, userName: email };
};

export const register = async (email: string, password: string): Promise<{ token: string, userName: string }> => {
  
  const result = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { ...baseHeaders },
    body: JSON.stringify({ email, password })
  });


  if (!result.ok) {
    const errorText = await result.text();
    throw new Error(`HTTP error! status: ${result.status}, message: ${errorText}`);
  }

  const data = await result.json();
  return { token: data.accessToken, userName: email };
};


export const fetchUserDetails = async (token: string) => {
  const result = await fetch(`${baseUrl}/user/details/me`, {
      method: 'GET',
      headers: {
          ...baseHeaders,
          "Authorization": "Bearer " +  token
      }
  });

  const data = await result.json();
  return data;
};
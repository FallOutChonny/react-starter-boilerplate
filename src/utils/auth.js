/*
 * Authentication.
 * Use universal-cookie to access server-side and client side cookies
 */

// TODO: use setTimeout to simulate server response

import storage from './webStorage';
import cookies from './cookies';

export function loggedIn() {
  return cookies.get('loggedIn');
}

export function getAllUsers() {
  return storage.getItem('users');
}

export async function isUserExist(username) {
  const users = await getAllUsers();
  return users && !(users[username] === undefined);
}

export async function isValidUser(username, password) {
  const users = await getAllUsers();

  return users && users[username] && users[username].password === password;
}

export async function login(username, password) {
  const loggedInUser = await loggedIn();
  const doesUserExist = await isUserExist(username);
  const isValid = await isValidUser(username, password);

  if (loggedInUser) {
    return {
      error: false,
      message: 'You have logged in.',
    };
  }

  if (!doesUserExist) {
    return {
      error: true,
      message: 'This username does not exist.',
    };
  }

  if (!isValid) {
    return {
      error: true,
      message: 'Wrong username or password.',
    };
  }

  cookies.set('loggedIn', username);

  return {
    error: false,
    message: 'Login successfuly',
  };
}

export function logout() {
  return cookies.remove('loggedIn');
}

export async function register(username, password) {
  const doesUserExist = await isUserExist(username);
  if (doesUserExist) {
    return {
      error: true,
      message: 'This username is exist.',
    };
  }

  const users = (await getAllUsers()) || {};

  users[username] = { username, password };

  await storage.setItem('users', users);

  return {
    error: false,
    message: 'Register successfuly',
  };
}

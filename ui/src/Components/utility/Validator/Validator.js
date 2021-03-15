function Empty(data) {
  if (!data) {
    return true;
  }
  return false;
}

function checkLength(password) {
  if (password.length >= 8) {
    return true;
  }
  return false;
}

function isSimilar(password, repeatPassword) {
  if (password === repeatPassword) {
    return true;
  }
  return false;
}

function EmailValidator(emailAddress) {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(emailAddress);
}

export { Empty, checkLength, isSimilar, EmailValidator };

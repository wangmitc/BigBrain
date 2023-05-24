// validates a password to be > 8 charatcer and ocntain at leat 1 lowercase
// letter, 1 special character and 1 digit
export function PasswordValidation (password) {
  const regexPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
  return (regexPattern.test(password));
}

// validates an email to be in the correct email format
export function validateEmail (email) {
  const regexPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (regexPattern.test(email));
}

export const checkPasswordStrength = (password: string) => {
  return {
    hasNumber: /\d/.test(password),
    hasUppercase: /[A-ZА-Я]/.test(password),
    hasLowercase: /[a-zа-я]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// regex for a first and last name string (i.e. "John Doe" is valid, "John" is not)
export const FULL_NAME_REGEX = /^[A-Za-z]+(-[A-Za-z]+)? [A-Za-z]+(-[A-Za-z]+)?$/;

export const PHONE_REGEX = /^\d{1,3}\d{10}$/;

export const OTP_REGEX = /^\d{6}$/;
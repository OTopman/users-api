import AppError from '@helpers/AppError';
import messages from '@helpers/messages';
import bcrypt from 'bcrypt';


/**
 * This function is use to remove html tags= require(string
 *
 * @param {string} str   String to sanitize
 * @return {string}  String converted
 */
function stripTags(str: string): string {
  return str.toString().replace(/(<([^>]+)>)/gi, '');
};

function inputValidation(input: string): string {
  const word = stripTags(input.toString());
  return word.trim();
};

function hasWhiteSpace(str: string, field = 'username') {
  if (/\s/g.test(str)) {
    throw new AppError(`${field} must not contain whitespace character`, 400);
  }
  return false;
};

function isValidEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.toLowerCase())) {
    throw new AppError(messages.ERR_INVALID_EMAIL, 400);
  }
  return true;
};


/**
 * Encrypt password
 * @param {string} plainPassword - Plain password
 * @return {string} - Encrypted password
 */
async function hashPassword(plainPassword: string) {
  return await bcrypt.hash(plainPassword, 10);
}

/**
   * Compare hashed password and plain password to check if correct
   * @param {string} plainPassword - Plain password to check
   * @param {string} hashedPassword - Hashed password to confirm
   * @return {any}
   */
async function comparePassword(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Check if data is set
 * @param {any} record - Data to check
 * @param {string} recordType - Type of record
 * @return {any}
 */
function recordExists(record: any, recordType = 'Record') {
  if (Array.isArray(record)) {
    record = record[0];
  }
  if (!record) {
    throw new AppError(messages.ERR_RECORD.replace(/record/, recordType.toLowerCase()), 404);
  }
  return true;
};

/**
 * Remove sensitive properties
 * @param user - User's record
 * @return {User | Administrator}
 */
function removeSensitiveData(user: any) {
  delete user.password;
  // delete user.id;
  return user;
}

function isStrongPassword(password: string) {
  if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password))) {
    throw new AppError(messages.WEAK_PASSWORD, 400);
  }
  return true;
}

export {
  stripTags,
  inputValidation,
  hasWhiteSpace,
  isValidEmail,
  hashPassword,
  comparePassword,
  recordExists,
  removeSensitiveData,
  isStrongPassword,
};

import { body, param } from 'express-validator';

const validateMemberId = () => body('memberId')
  .not().isEmpty()
  .withMessage('Member ID must not be empty.')
  .isHexadecimal()
  .withMessage('Invalid member ID.');

const validateMemberIdParam = () => param('memberId')
  .not().isEmpty()
  .withMessage('Member ID query parameter must not be empty.')
  .isHexadecimal()
  .withMessage('Invalid member ID.');

const validateCardNumber = () => body('paymentDetails.cardNumber')
  .not().isEmpty()
  .withMessage('Card number must not be empty.')
  .isCreditCard()
  .withMessage('Invalid card number.');

const validateExpiryDate = () => body('paymentDetails.expiryDate')
  .not().isEmpty()
  .withMessage('Expiry date must not be empty.')
  .custom((value, { req }) => {
    if (!/^\d{2}\/\d{2,4}$/g.test(req.body.paymentDetails.expiryDate)) {
      throw new Error('Invalid expiry date.');
    } else {
      return value;
    }
  })
  .withMessage('Invalid expiry date format.');

const validateSecurityCode = () => body('paymentDetails.securityCode')
  .not().isEmpty()
  .withMessage('Security code must not be empty.')
  .isNumeric({ no_symbols: true })
  .withMessage('Security code must be a number.')
  .isLength({ min: 3, max: 4 })
  .withMessage('Security code must be 3 to 4 characters long.');

const validatePostcode = () => body('address.postcode')
  .not().isEmpty()
  .withMessage('Postcode must not be empty.')
  .isPostalCode('GB')
  .withMessage('Postcode must be of a valid GB address.');

const validateFirstLine = () => body('address.firstLine')
  .not().isEmpty()
  .withMessage('First line of address must not be empty')
  .isAscii()
  .withMessage('First line of address contains invalid characters.')
  .isLength({ min: 7, max: 25 })
  .withMessage('First line of address must be between 7 and 25 characters long.');

const validateSecondLine = () => body('address.secondLine')
  .not().isEmpty()
  .withMessage('Second line of address must not be empty')
  .isAscii()
  .withMessage('Second line of address contains invalid characters.')
  .isLength({ min: 7, max: 25 })
  .withMessage('Second line of address must be between 7 and 25 characters long.');

const validatePhoneNumber = () => body('phoneNumber')
  .not().isEmpty()
  .withMessage('Phone number must not be empty.')
  .isMobilePhone('any')
  .withMessage('Invalid phone number.');

export default {
  memberId: validateMemberId,
  paymentDetails: {
    cardNumber: validateCardNumber,
    expiryDate: validateExpiryDate,
    securityCode: validateSecurityCode,
  },
  address: {
    postcode: validatePostcode,
    firstLine: validateFirstLine,
    secondLine: validateSecondLine,
  },
  phoneNumber: validatePhoneNumber,
  param: {
    memberId: validateMemberIdParam,
  },
};

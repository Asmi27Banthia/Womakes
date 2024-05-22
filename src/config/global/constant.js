// Development
// export const API_URL = 'http://78.129.184.20:5001';
// export const IMAGE_URL = 'http://78.129.184.20:5001/static/';

// PRODUCTION
export const API_URL = 'http://78.129.184.20:5002';
export const IMAGE_URL = 'http://78.129.184.20:5002/static/';

export const TWO_DECIMAL_REGEX = /^[0-9]*\.?[0-9]{0,2}$/;

export const alphanumericRegex = /^[^\uD800-\uDFFF]+$/;
export const emojisRegex =
  /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

// export const lowerCase = (item) => {
//   return String(item).toLocaleLowerCase();
// };

export const theme = {
  backgroundColor: '#FFF',
  textColor: '#F8F8F8',
  primaryTextColor: '#F5E8CF',
  buttonTextColor: '#fff',
  primaryColor: '#E3B155',
  secondaryColor: '#1D1C1E',
  borderColor: '#D2D2D2',
  placeholderColor: '#C6C6C6',
  disabledColor: '#cccccc',
  themeBg: '#E3B155',
  white: '#fff',
  lightBlue: '#E5E9F2',
  statusColor: '#023020',
  errorColor: '#ff3333',
  websitecolor: '#0F1932',
  blackColor: '#000000',
  fieldBackground: '#F5E8CF',
  circleColor: '#F5E8CF',
  buyTextColor: '#707070',
  lightGray: '#EDEDED',
};

export const modalConfig = {
  modalBackground: theme.fieldBackground,
  buttonColor: theme.primaryColor,
  color: theme.blackColor,
  button: true,
  type: 'Success',
};

export const modalErrorConfig = {
  modalBackground: theme.fieldBackground,
  buttonColor: theme.primaryColor,
  color: theme.blackColor,
  button: true,
  type: 'Danger',
};

export const toastConfig = {
  type: 'Success',
  color: theme.primaryColor,
  button: true,
  modalBackground: theme.fieldBackground,
  buttonColor: theme.primaryColor,
};

export const fonts = {
  bold: 'Poppins-Bold',
  boldItalic: 'Poppins-BoldItalic',
  extraBold: 'Poppins-ExtraBold',
  extraBoldItalic: 'Poppins-ExtraBoldItalic',
  extraLight: 'Poppins-ExtraLight',
  extraLightItalic: 'Poppins-ExtraLightItalic',
  italic: 'Poppins-Italic',
  light: 'Poppins-Light',
  lightItalic: 'Poppins-LightItalic',
  medium: 'Poppins-Medium',
  mediumItalic: 'Poppins-MediumItalic',
  regular: 'Poppins-Regular',
  semiBold: 'Poppins-SemiBold',
  semiBoldItalic: 'Poppins-SemiBoldItalic',
  thin: 'Poppins-Thin',
  thinItalic: 'Poppins-ThinItalic',
};

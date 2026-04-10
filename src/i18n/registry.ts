import en from './translations/en';
import ta from './translations/ta';
import hi from './translations/hi';
import te from './translations/te';
import kn from './translations/kn';
import ml from './translations/ml';
import mr from './translations/mr';
import gu from './translations/gu';
import bn from './translations/bn';
import pa from './translations/pa';
import or from './translations/or';
import ur from './translations/ur';

export interface LanguageMeta {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
  digits: string[];
  currencyWords: (paise: number) => string;
}

const digits = {
  en: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  ta: ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯'],
  hi: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  te: ['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'],
  kn: ['೦', '೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯'],
  ml: ['൦', '൧', '൨', '൩', '൪', '൫', '൬', '൭', '൮', '൯'],
  mr: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  gu: ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'],
  bn: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
  pa: ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'],
  or: ['୦', '୧', '୨', '୩', '୪', '୫', '୬', '୭', '୮', '୯'],
  ur: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
};

const amountLabel = (value: number, suffix: string) =>
  `${Math.floor(value / 100).toLocaleString('en-IN')} ${suffix}`;

export const LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: 'GB', rtl: false, digits: digits.en, currencyWords: (p) => amountLabel(p, 'Rupees Only') },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: 'IN', rtl: false, digits: digits.ta, currencyWords: (p) => amountLabel(p, 'ரூபாய் மட்டும்') },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: 'IN', rtl: false, digits: digits.hi, currencyWords: (p) => amountLabel(p, 'रुपये मात्र') },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: 'IN', rtl: false, digits: digits.te, currencyWords: (p) => amountLabel(p, 'రూపాయలు మాత్రమే') },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: 'IN', rtl: false, digits: digits.kn, currencyWords: (p) => amountLabel(p, 'ರೂಪಾಯಿ ಮಾತ್ರ') },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: 'IN', rtl: false, digits: digits.ml, currencyWords: (p) => amountLabel(p, 'രൂപ മാത്രം') },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: 'IN', rtl: false, digits: digits.mr, currencyWords: (p) => amountLabel(p, 'रुपये फक्त') },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: 'IN', rtl: false, digits: digits.gu, currencyWords: (p) => amountLabel(p, 'રૂપિયા માત્ર') },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: 'IN', rtl: false, digits: digits.bn, currencyWords: (p) => amountLabel(p, 'টাকা মাত্র') },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: 'IN', rtl: false, digits: digits.pa, currencyWords: (p) => amountLabel(p, 'ਰੁਪਏ ਹੀ') },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: 'IN', rtl: false, digits: digits.or, currencyWords: (p) => amountLabel(p, 'ଟଙ୍କା ମାତ୍ର') },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: 'IN', rtl: true, digits: digits.ur, currencyWords: (p) => amountLabel(p, 'روپے فقط') },
];

export const RESOURCES = {
  en: { translation: en },
  ta: { translation: ta },
  hi: { translation: hi },
  te: { translation: te },
  kn: { translation: kn },
  ml: { translation: ml },
  mr: { translation: mr },
  gu: { translation: gu },
  bn: { translation: bn },
  pa: { translation: pa },
  or: { translation: or },
  ur: { translation: ur },
};

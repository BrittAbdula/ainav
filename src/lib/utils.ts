import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// convert string to URL friendly string, support veraity of languages, emojis, and special characters
export function strToURL(str: string): string {
  // remove / ? : @ & = + $ # . , % and replace space with -
  let pattern = str.trim().replace(/\/|\?|:|@|&|=|\+|\$|#|\.|,|%| /g, '-');
  // collapse multiple hyphens into one
  pattern = pattern.replace(/-+/g, '-');
  return encodeURIComponent(pattern);
}

// get client Language
export function getClientLanguage(req: Request): string {
  const acceptLanguage = req.headers.get('accept-language');
  if (!acceptLanguage) {
    return 'en';
  }
  return acceptLanguage.split(',')[0];
}

// get the Language name from the language code
export function getLanguageName(code: string): string {
  switch (code) {
    case 'en':
      return 'English';
    case 'zh':
      return 'Chinese';
    case 'es':
      return 'Spanish';
    case 'fr':
      return 'French';
    case 'de':
      return 'German';
    case 'it':
      return 'Italian';
    case 'ja':
      return 'Japanese';
    case 'ko':
      return 'Korean';
    case 'pt':
      return 'Portuguese';
    case 'ru':
      return 'Russian';
    default:
      return 'English';
  }
}
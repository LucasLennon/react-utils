import {useEffect, useState} from 'react';

interface returnedCurrencyFormats {
  currency: string,
  number: number
}

type Languages = 'en' | 'pt-BR' | string;
type CurrencyFormat = string;
type NewValue = string | undefined;

const regexToFindSeparators = /(?!\d{1,3})(\D)(?=\d{3,3})/g;

const usableLanguages = (value: Languages) => ({
  'en': {
    language: 'en',
    currency: 'EN'
  },
  'pt-BR': {
    language: 'pt-BR',
    currency: 'BRL'
  }
}[value])

export const useCurrency = (value: string | number) => {
  const currentLanguage = usableLanguages(window.navigator.language || 'en')
  const [mounted, setMounted] = useState<boolean>(false);
  const [formated, setFormated] = useState<CurrencyFormat>('');
  const [unFormated, setUnFormated] = useState<number>(0);

  const normalizeValue = (newValue) => {
    return String(newValue).replace(regexToFindSeparators, '').replace(/\D/, '.')
  }

  const handleCurrencyChange = (newValue?: NewValue) => {
    const rawValue = newValue || value;
    const normalizedValue = normalizeValue(rawValue);

    const currencyFormat = Number(normalizedValue).toLocaleString(currentLanguage.language, {style:'currency', currency: currentLanguage.currency})
    setFormated(currencyFormat)
    setUnFormated(Number(normalizedValue))
  }

  useEffect(() => {
    if (!mounted){
      handleCurrencyChange()
      setMounted(true)
    }
  })

  return {
    currency: formated,
    number: unFormated,
    handleCurrencyChange
  }
}

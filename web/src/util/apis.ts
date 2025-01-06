/**
 * API and Utility Functions for the Web Applications
 */

// ==================== API Utilities ====================

export const apiRequest = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: Record<string, any>,
  headers?: Record<string, string>
): Promise<any> => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  try {
    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request failed: ${error}`);
    throw error;
  }
};

// ==================== Date Utilities ====================

export const formatDate = (date: Date, locale: string = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatTime = (date: Date, locale: string = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date);
};

// ==================== Logger Utilities ====================

export const logInfo = (message: string, ...optionalParams: any[]): void => {
  console.info(`[INFO]: ${message}`, ...optionalParams);
};

export const logWarning = (message: string, ...optionalParams: any[]): void => {
  console.warn(`[WARNING]: ${message}`, ...optionalParams);
};

export const logError = (message: string, ...optionalParams: any[]): void => {
  console.error(`[ERROR]: ${message}`, ...optionalParams);
};

// ==================== Storage Utilities ====================

export const saveToLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string): any => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const saveToSessionStorage = (key: string, value: any): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getFromSessionStorage = (key: string): any => {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeFromSessionStorage = (key: string): void => {
  sessionStorage.removeItem(key);
};

// ==================== Validation Utilities ====================

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phoneNumber);
};

export const isNonEmptyString = (value: string): boolean => {
  return value.trim().length > 0;
};

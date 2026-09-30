import { RegistrationRecord } from '../types';
import { INITIAL_REGISTRATIONS } from '../data/mockData';

const STORAGE_KEY = 'bitis45_run_registrations_v1';

export const getRegistrations = (): RegistrationRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REGISTRATIONS));
      return INITIAL_REGISTRATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read registrations from localStorage', e);
    return INITIAL_REGISTRATIONS;
  }
};

export const saveRegistration = (record: RegistrationRecord): RegistrationRecord => {
  const current = getRegistrations();
  const updated = [record, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save registration', e);
  }
  return record;
};

export const findRegistration = (keyword: string): RegistrationRecord | null => {
  if (!keyword || !keyword.trim()) return null;
  const cleanKey = keyword.trim().toLowerCase();
  const list = getRegistrations();

  return (
    list.find(r => {
      if (r.id.toLowerCase() === cleanKey) return true;
      if (r.bibNumber.toLowerCase() === cleanKey) return true;
      if (r.phone && r.phone.toLowerCase() === cleanKey) return true;
      if (r.email && r.email.toLowerCase() === cleanKey) return true;
      if (r.representativePhone && r.representativePhone.toLowerCase() === cleanKey) return true;
      if (r.representativeEmail && r.representativeEmail.toLowerCase() === cleanKey) return true;
      return false;
    }) || null
  );
};

export const resetRegistrationsToSample = (): RegistrationRecord[] => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REGISTRATIONS));
  } catch (e) {
    console.error('Failed to reset', e);
  }
  return INITIAL_REGISTRATIONS;
};

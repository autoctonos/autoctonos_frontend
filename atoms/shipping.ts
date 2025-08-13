import { atomWithStorage } from 'jotai/utils';

export const shippingAtom = atomWithStorage('shippingForm', {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zip: '',
  country: '',
  state: '',
});

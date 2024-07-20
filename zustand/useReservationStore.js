import { create } from 'zustand';

const useReservationStore = create(set => ({
  journeyId: null,
  seats: null,
  totalPrice: null,
  setReservation: (journeyId, seats, totalPrice) => set({
    journeyId: journeyId,
    seats: seats,
    totalPrice: totalPrice,
  }),
  clearReservation: () => set({
    journeyId: null,
    seats: null,
    totalPrice: null,
  }),
}));

export default useReservationStore;

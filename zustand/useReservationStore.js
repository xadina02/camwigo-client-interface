import create from 'zustand';

const useReservationStore = create(set => ({
  journeyId: null,
  seats: null,
  setReservation: (journeyId, seats) => set({
    journeyId: journeyId,
    seats: seats,
  }),
  clearReservation: () => set({
    journeyId: null,
    seats: null,
  }),
}));

export default useReservationStore;

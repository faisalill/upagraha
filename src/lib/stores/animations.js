import { writable } from 'svelte/store';

export const animationStore = writable({
  isSectionOneSatelliteAnimationDone: false,
  isSectionOneTextAnimationDone: false,
  isScrollAnimationDone: false,
  isSectionOneCameraAnimationDone: false,
  isIntroDone: false,
});

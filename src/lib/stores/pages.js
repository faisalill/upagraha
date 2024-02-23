import {writable} from 'svelte/store';

export const scroll = writable({
  pages: 5,
  scrollY: null
});

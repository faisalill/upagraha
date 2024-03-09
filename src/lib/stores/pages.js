import {writable} from 'svelte/store';

export const scroll = writable({
  pages: 10,
  scrollY: null
});

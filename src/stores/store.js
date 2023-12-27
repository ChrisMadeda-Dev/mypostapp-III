import { writable } from 'svelte/store';

export const userinfo = writable([
	{
		name: '',
		uid: '',
		role: ''
	}
]);

export const feedstore = writable([
	{
		content: 'Heyy thank you God, first Feed'
	},
	{
		content: 'Heyy thank you God, first Feed'
	},
	{
		content: 'Heyy thank you God, first Feed'
	}
]);

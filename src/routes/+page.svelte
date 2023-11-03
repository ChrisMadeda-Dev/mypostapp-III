<script>
	import { onMount } from 'svelte';
	import { auth } from '../lib/Firebase/firebase';
	import { onAuthStateChanged } from 'firebase/auth';

	onMount(() => {
		onAuthStateChanged(auth,(authUser) => {
			if (authUser) {
				console.log(authUser)
				window.location.href = '/home';
			} else {
				window.location.href = '/authenticate';
			}
		});
	});
</script>

<div>
	<h2>God is good</h2>
</div>

<script>
	import { onMount } from 'svelte';
	import { auth } from '../lib/Firebase/firebase';
	import { onAuthStateChanged } from 'firebase/auth';

	onMount(() => {
		onAuthStateChanged((authUser) => {
			if (authUser) {
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

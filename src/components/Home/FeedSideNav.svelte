<script>
	import { onMount } from 'svelte';
	import { auth, db } from '../../lib/Firebase/firebase';
	import { getDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	let r;
	let userUid;

	onMount(() => {
		r = parseFloat(localStorage.getItem('r'));
		userUid = localStorage.getItem('uid');

		onAuthStateChanged(auth, (authUser) => {
			userUid = authUser.uid;
		});
	});

	async function addChannelId() {
		const a = prompt('Enter Channel ID');

		if (a !== '' && userUid) {
			const userRef = doc(db, `users/${userUid}}`);
			const channelRef = doc(db, `channels/${a}`);
			const channel = await getDoc(channelRef);

			if (channel.exists()) {
				console.log('Channel Found');
				if (r === 0) {
					localStorage.setItem('activeChannelId', a);
					const userChannelRef = doc(db, `users/${userUid}`);
					updateDoc(userChannelRef, {
						activeChannelId: a
					});
					alert("Awesome! Channel has been set")
				}
			} else {
				alert('Oops!! Channel not found');
			}
		}
	}

	function toAddPost() {
		window.location.href = '/AddPost';
	}
</script>

<div class="feed-side-nav">
	<div class="top">
		<span>HI Chris</span>
	</div>
	<div class="center">
		<button>Home</button>
		<button><a href="/profile">Profile</a></button>
		<button>Search</button>
		<button>Settings</button>
	</div>
	<div class="bottom">
		{#if r === 1}
			<button on:click={toAddPost}>Add Post</button>
		{:else}
			<button on:click={addChannelId}>Add Channel ID</button>
		{/if}
	</div>
</div>

<style>
	.feed-side-nav {
		flex: 0 0 13%;
		height: 99%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-right: 1px solid #353839;
		background-color: #1b1b1b;
		color: white;
	}

	button {
		outline: none;
		border: none;
		border-radius: 5px;
		width: 80%;
		min-width: 80%;
		height: 40px;
		background-color: #353839;
		color: white;
	}

	.top {
		flex: 0 0 20%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.center {
		width: 100%;
		flex: 0 0 70%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 9px;
	}

	.bottom {
		width: 100%;
		flex: 0 0 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bottom > button {
		background-color: brown;
		color: white;
		width: 80%;
	}
</style>

<script>
	import { onMount } from 'svelte';
	import { auth, db } from '../../lib/Firebase/firebase';
	import { getDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	import { userinfo } from '../../stores/store';

	let r;
	let user;
	let userUid;

	onMount(() => {
		onAuthStateChanged(auth, (authUser) => {
			userUid = authUser.uid;
			getUserInfo(authUser);
		});
	});

	//gets user data from db
	async function getUserInfo(user) {
		const docRef = doc(db, `users/${user.uid}`);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			r = docSnap.data().role;
			userinfo.set([
				{
					uid: docSnap.data().uid,
					firstName: docSnap.data().firstName,
					otherName: docSnap.data().otherName,
					role: docSnap.data().role
				}
			]);
		}
	}

	//Gets realtime data from svelte store
	$: {
		('');
	}

	async function addChannelId() {
		const a = prompt('Enter Channel ID');

		if (a !== '' && userUid) {
			const userRef = doc(db, `users/${userUid}}`);
			const channelRef = doc(db, `channels/${a}`);
			const channel = await getDoc(channelRef);

			if (channel.exists()) {
				if (r === 0) {
					localStorage.setItem('activeChannelId', a);
					const userChannelRef = doc(db, `users/${userUid}`);
					updateDoc(userChannelRef, {
						activeChannelId: a
					});
					alert('Awesome! Channel has been set');
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
		<span>Hi {$userinfo[0].firstName}</span>
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
		border-radius: 10px;
		width: 80%;
		min-width: 80%;
		height: 50px;
		background-color: #353839;
		color: white;
		transition: ease-in-out 0.5s;
	}

	button:hover {
		opacity: 0.7;
	}

	.top {
		flex: 0 0 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.center {
		width: 100%;
		flex: 0 0 80%;
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

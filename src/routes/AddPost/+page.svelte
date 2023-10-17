<script>
	import { feedstore } from '../../stores/store';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth, db } from '../../lib/Firebase/firebase';
	import { getDocs, doc, addDoc, collection, getDoc, serverTimestamp } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let user;
	let post;
	let channelId;
	let adminId;

	onMount(() => {
		onAuthStateChanged(auth, (a) => {
			getDet(a);
			adminId = a.uid;
		});
	});

	async function getDet(user) {
		if (user) {
			const userRef = doc(db, `admins/${user.uid}`);
			const det = await getDoc(userRef);

			if (det.exists()) {
				channelId = det.data().channelId;
			} else {
				console.log('Doc doesnt exist');
			}
		} else {
			console.log('no user');
		}
	}

	function addPost() {
		if (adminId && channelId !== null) {
			const channelRef = collection(db, `channels/${channelId}/posts`);
			if (post) {
				const postOut = {
					post: post,
					channelId: channelId,
					adminId: adminId,
					createdAt: serverTimestamp()
				};

				addDoc(channelRef, postOut);
				alert('Post has been added');
				post = '';
			} else {
				alert('Add Post');
			}
		}
	}
</script>

<div class="add-post">
	<div class="top">''</div>
	<div class="center">
		<textarea bind:value={post} />
	</div>
	<div class="bottom">
		<button on:click={addPost}>Add Post</button>
	</div>
</div>

<style>
	.add-post {
		width: 100%;
		height: 100vh;
		background-color: #1b1b1b;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.center {
		flex: 0 0 70%;
		width: 60%;
		background-color: '';
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.center > textarea {
		width: 90%;
		height: 100%;
		resize: none;
		outline: none;
		border: none;
		padding: 20px;
		border-radius: 10px;
		background-color: #353839;
		color: white;
		font-size: 18px;
	}

	.bottom {
		flex: 0 0 10%;
		width: 60%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px;
	}

	.bottom > button {
		width: 90%;
		height: 55px;
		outline: none;
		border: none;
		background-color: brown;
		border-radius: 10px;
		color: whitesmoke;
		font-size: 16px;
	}

	.bottom > button:hover {
		opacity: 0.8;
	}
</style>

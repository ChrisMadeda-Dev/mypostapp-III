<script>
	import { db } from '../../lib/Firebase/firebase';
	import FeedCont from './FeedCont.svelte';
	import FeedSideNav from './FeedSideNav.svelte';
	import { feedstore } from '../../stores/store';
	import { auth } from '../../lib/Firebase/firebase';
	import { getDoc, doc, collection, getDocs, query, orderBy } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	import { onMount } from 'svelte';

	let showAddContent = false;
	let r;
	let user;
	let channelId;
	let content = [];

	onMount(() => {
		onAuthStateChanged(auth, (AuthUser) => {
			user = AuthUser;
			
			const rRef=doc(db,`users/${AuthUser.uid}`);
			getDoc(rRef).then((snap)=>{
			
				//Check if user is admin
				if(snap.data().role===1){
					r=1
					getDet(AuthUser);
				}else{
					r=0
					getDet(AuthUser)
				}
			})
		});

	});

	async function getDet(a) {
		if (a && r === 1) {
			const adminRef = doc(db, `admins/${a.uid}`);
			const det = await getDoc(adminRef);

			if (det.exists()) {
				channelId = det.data().channelId;
				getContent(channelId);
			} else {
				console.log('Doc doesnt exist');
			}
		}

		if (a && r === 0) {
			const userRef = doc(db, `users/${a.uid}`);
			const det = await getDoc(userRef);

			if (det.exists()) {
				const activeChannelId = det.data().activeChannelId;
				getContent(activeChannelId);
			}
		}
	}

	async function getContent(id) {
		const contentRef = collection(db, `channels/${id}/posts`);
		const q = query(contentRef, orderBy('createdAt', 'desc'));
		const contentIn = await getDocs(q);

		if (true) {
			var array = [];
			contentIn.forEach((a) => {
				array.push(a.data());
			});

			content = [...array];
		} else {
			console.log('Content docs dont exist');
		}
	}
</script>

<div class="feed">
	<header>
		<h1>MYPOST</h1>
	</header>
	{#each content as feedContent}
		<FeedCont {feedContent} />
	{/each}
</div>

<style>
	.feed {
		flex: 0 0 55%;
		height: 99%;
		gap: 12px;
		padding: 20px 0px;
		background-color: #1b1b1b;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		overflow-y: scroll;
		overflow-x: hidden;
		color: white;
	}

	.feed > header {
		width: 100%;
		flex: 0 0 20vh;
		background-color: '';
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

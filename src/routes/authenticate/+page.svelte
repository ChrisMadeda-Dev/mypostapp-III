<script>
	import { auth, db } from '../../lib/Firebase/firebase';
	import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

	import {
		onAuthStateChanged,
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword
	} from 'firebase/auth';
	import { onMount } from 'svelte';

	let user;
	let email;
	let pass;
	let confirmpass;
	let firstName;
	let otherName;
	let tel, confirmTel;
	let login = false;
	let asAdmin = false;
	let adminCode;
	let presetAdminCode = 786938263;

	//Firestore

	onMount(() => {
		onAuthStateChanged(auth, (isUser) => {
			if (isUser) {
				window.location.href = '/home';
				user = isUser;
			}
		});
	});

	function logInUser() {
		if (email && pass) {
			signInWithEmailAndPassword(auth, email, pass).then((userDet) => {
				alert('Welcome Back');
			});
		}
	}

	function createNewUser() {
		console.log('creating user');
		if (!user && email && pass && pass === confirmpass && firstName && otherName) {
			if (asAdmin === false) {
				createUserWithEmailAndPassword(auth, email, pass).then((userDet) => {
					console.log('in reg user');
					//Database
					let userRef = doc(db, `users/${userDet.user.uid}`);
					let userInfo = {
						firstName: firstName,
						otherName: otherName,
						activeChannelId:"",
						uid: userDet.user.uid,
						email: userDet.user.email,
						createdAt: serverTimestamp(),
						role: asAdmin ? 1 : 0
					};

					//Add user
					//console.log('set doc');
					setDoc(userRef, userInfo);
					alert('Welcome to MYPOST');

					//localStorage
					localStorage.setItem('uid', userDet.user.uid);
					localStorage.setItem('uname', firstName);
					localStorage.setItem('r', 0);
				});
			}

			if (asAdmin === true && tel === confirmTel && adminCode === presetAdminCode) {
				createUserWithEmailAndPassword(auth, email, confirmpass)
					.then((user) => {
						//Database
						let userRef = doc(db, `users/${user.user.uid}`);
						let userInfo = {
							firstName: firstName,
							otherName: otherName,
							activeChannelId:"",
							uid: user.user.uid,
							email: user.user.email,
							createdAt: serverTimestamp(),
							role: asAdmin ? 1 : 0
						};

						//Admin

						let channelId = (confirmTel * 9901) / 1099;
						let adminRef = doc(db, `admins/${user.user.uid}`);
						let channelRef = doc(db, `channels/${channelId}`);

						let adminInfo = {
							firstName: firstName,
							otherName: otherName,
							uid: user.user.uid,
							email: user.user.email,
							channelId: channelId,
							createdAt: serverTimestamp()
						};

						let channelInfo = {
							channelId: channelId,
							channelName: 'Name',
							channelOwnnerName: firstName,
							channelOwnerId: user.user.uid,
							createdAt: serverTimestamp()
						};

						setDoc(adminRef, adminInfo);
						setDoc(channelRef, channelInfo);

						//Localtorage
						localStorage.setItem('uid', user.user.uid);
						localStorage.setItem('cid', channelId);
						localStorage.setItem('uname', firstName);
						localStorage.setItem('r', 1);

						//User Info
						setDoc(userRef, userInfo);
						alert('Welcome to MYPOST');
						window.location.href = '/home';
					})
					.catch((error) => {
						alert(error.message);
					});
			} else if (asAdmin === true) {
				!tel && alert('Kindly enter Telephone number');
				tel !== confirmTel && alert('Telephone does not much');
				adminCode !== presetAdminCode && alert('Wrong admnin code');
				console.log('In admin else section');
			} else {
				alert('Error');
			}
		} else {
			//pass.length < 6 && alert('password should be more than 6 Characters');
			!firstName && alert('Kindly Enter your firstName!');
			!otherName && alert('Kindly Enter your otherName!');
			!email && alert('Kindly Enter email!');
			!pass && alert('Kindly Enter Password!');
			user && alert('User is already logged in');
			pass !== confirmpass && alert('Password mismatch');
			console.log('Error section');
		}
	}
</script>

<div class="authenticate-page">
	<div class="top" />
	<div class="center">
		<div class="input-sec">
			{#if !login}
				<input type="text" placeholder="First Name" bind:value={firstName} />
				<input type="text" placeholder="Other Name" bind:value={otherName} />
			{/if}

			<input type="text" placeholder="Enter email" bind:value={email} />
			<input type="password" placeholder="Enter Password" bind:value={pass} />
			{#if !login}
				<input type="password" placeholder="Confirm your password" bind:value={confirmpass} />
			{/if}
			{#if asAdmin}
				<input type="number" placeholder="Enter Phone Number" bind:value={tel} />
				<input type="number" placeholder="Confirm Phone Number" bind:value={confirmTel} />
				<input type="number" placeholder="Enter Admin Code" bind:value={adminCode} />
			{/if}

			{#if !login}
				<button class="action-btn" on:click={createNewUser}>Create Account</button>
			{:else if login}
				<button class="action-btn" on:click={logInUser}>Login</button>
			{/if}

			<button
				class="login-option"
				on:click={(e) => {
					login = !login;
				}}>{!login ? 'Login Instead' : 'Dont have acoount: Create account'}</button
			>

			{#if !login}
				<button
					class="login-option"
					on:click={(e) => {
						asAdmin = !asAdmin;
					}}>{asAdmin ? 'User' : 'As Admin'}</button
				>
			{/if}
		</div>
	</div>
	<div class="bottom" />
</div>

<style>
	.authenticate-page {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
	}

	.top {
		flex: 0 0 10vh;
		width: 100%;
		background-color: '';
	}

	.center {
		flex: 0 0 80vh;
		width: 100%;
		background-color: '';
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.input-sec {
		flex: 0 0 95%;
		width: 60%;
		gap: 9px;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: whitesmoke;
	}

	.input-sec > input {
		height: 55px;
		width: 50%;
		border-radius: 5px;
		background-color: white;
	}

	.input-sec > .action-btn {
		width: 30%;
		height: 50px;
		background-color: brown;
		color: white;
		margin-top: 10px;
		border-radius: 10px;
	}

	.input-sec > .action-btn:hover {
		opacity: 0.8;
	}

	.login-option {
		height: 30px;
		background: '';
	}

	.bottom {
		flex: 0 0 10vh;
		width: 100%;
		background-color: '';
	}
</style>

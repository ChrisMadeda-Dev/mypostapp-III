<script>
	import { auth } from '../../lib/Firebase/firebase';
	import { signOut } from 'firebase/auth';

	function signOutUser() {
		signOut(auth);
		localStorage.clear();
		alert('Your signed out! see you soon');
		window.location.href = '/authenticate';
	}
</script>

<div class="profile-page">
	<div class="top" />
	<div class="center">
		<h1>God is good</h1>
	</div>
	<div class="bottom">
		<button on:click={signOutUser}>Logout</button>
	</div>
</div>

<style>
	.profile-page {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.profile-page > .top {
		flex: 0 0 10%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.profile-page > .center {
		flex: 0 0 80%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.profile-page > .bottom {
		flex: 0 0 10%;
		width: 100%;
		background-color: #1b1b1b;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

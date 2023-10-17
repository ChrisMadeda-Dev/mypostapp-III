<script>
	import Feed from '../../components/Home/Feed.svelte';
	import FeedSideNav from '../../components/Home/FeedSideNav.svelte';
	import Search from '../../components/General/search.svelte';
</script>

<div class="home">

	<FeedSideNav />
	<Feed />
	<Search />
</div>

<style>
	.home {
		width: 100%;
		height: 100vh;
		background-color: #353839;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

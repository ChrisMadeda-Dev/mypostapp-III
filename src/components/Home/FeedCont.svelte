<script>
	export let feedContent;
</script>

<div class="feed-cont">
	<p>{feedContent.post}</p>
</div>

<style>
	.feed-cont {
		flex: 0 0 40%;
		width: 90%;
		background-color: '';
		border: 1px solid #353839;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		font-family: sans-serif;
	}
</style>

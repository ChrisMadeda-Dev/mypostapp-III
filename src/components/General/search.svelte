<script>
</script>

<div class="search-sec">
	<div class="top">
		<input type="search" placeholder="Search Here" />
	</div>
	<div class="center" />
	<div class="bottom" />
</div>

<style>
	.search-sec {
		flex: 0 0 13%;
		height: 99%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #1b1b1b;
	}

	.top {
		flex: 0 0 10%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.top > input {
		height: 27px;
		width: 80%;
        border-radius: 7px;
        background-color: #353839;
        color: whitesmoke;
	}

	.center {
		flex: 0 0 75%;
		width: 100%;
	}
	.bottom {
		flex: 0 0 15%;
		width: 100%;
	}
</style>

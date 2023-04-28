<script>
	import { server } from '$lib/stores/server';
</script>

<article>
	<header class="title-header">
		<hgroup>
			<h4>BMC</h4>
			<h5>Baseboard Information</h5>
		</hgroup>
	</header>
	<div class="grid">
		<label>
			IP Address
			<input readonly value={$server.ip} />
		</label>
	</div>
	<label>
		MAC Address
		<input readonly value={$server.mac} />
	</label>
	<label>
		BMC Version
		<input readonly value={$server.version} />
	</label>
	<label>
		BMC Firmware Date
		<input readonly value={$server.buildtime} />
	</label>

	<article class="sdcard">
		<header class="upload-header">
			<hgroup>
				<h5>SD Card</h5>
				<h6>Storage Information</h6>
			</hgroup>

			<label>
				Total
				<input readonly value={$server.sdcard.total} />
			</label>
			<label>
				Free
				<input readonly value={$server.sdcard.free} />
			</label>
			<label>
				Used
				<input readonly value={$server.sdcard.use} />
			</label>
		</header>
	</article>
	<article class="upload-card">
		<header class="upload-header">
			<form action="/action_page.php" disabled>
				<label for="file">
					Upload Firmware
					<input disabled id="file" name="filename" type="file" />
				</label>
				<input disabled type="submit" />
			</form>
		</header>
	</article>
	<footer ></footer>
</article>

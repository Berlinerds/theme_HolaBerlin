<div class="breadcrumb w-all w-fixed js-slider clearfix">
	
	<!-- slider 1 -->
	<div class="breadcrumb__holder slider slider-item-1 clearfix">
		<div class="breadcrumb__image w-all overflow-hidden clearfix">
			<img class="js-center-image" src="/<?php print $directory; ?>/images/slider-img-1.jpg" alt="slider-1" />
		</div>

		<div class="breadcrumb__text w-1080 div-center overflow-hidden clearfix">
			<div class="breadcrumb__text__holder">
				<?php print $breadcrumb; ?>
			</div>
		</div>
	</div> <!-- end of slider 1 -->

</div>

<script type="text/javascript">
	var img = document.body.querySelectorAll('.js-center-image'), i;
	for (i = 0; i < img.length; i++) {
		var im = img[i];
		im.onload = function () {
			var window_width = window.innerWidth, 
				difference = Math.abs(im.width - window_width) / 2;
			im.style.position = 'relative';
			im.style.top = '-100px';
			im.style.left = 0 - difference + 'px';
		};
	}
</script>
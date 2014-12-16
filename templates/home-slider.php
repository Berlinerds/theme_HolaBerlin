<div class="home__slider w-fixed w-all clearfix">	
	<ul class="home__slider--item w-all clearfix js-slider">
		<?php 
		$query = "SELECT * FROM node 
				  INNER JOIN weight_weights ON weight_weights.entity_id = node.nid 
				  WHERE type='slider_item' AND status='1'
				  ORDER BY weight_weights.weight, node.title";
	    $queryResult = db_query ($query);
	    foreach ($queryResult as $item) {
	    	$node = node_load($item->nid); 
	    	$body = field_get_items('node',$node, 'body');
	    	$image = field_get_items('node',$node, 'field_image');
	    	$enlace = field_get_items('node',$node, 'field_slider_item_enlace');
	    	$url = file_create_url($image[0]['uri']);
	    	?> 
	   		<li id="slider_home" class="home__slider--item slider slider-item-1 clearfix">
				<div class="home__slider--item--image w-all overflow-hidden clearfix">
					<img class="js-center-image" src="<?php print $url; ?>" alt="slider-1" />
				</div>
	
				<div class="home__slider--item--text w-1080 div-center overflow-hidden clearfix">
					<div class="home__slider--item--text__holder">
						<div class="slider-text__headline">
							<?php if ($enlace): ?>
								<h1 class="front"><a href="<?php print $enlace[0]['url']; ?>">
									<?php print $node->title; ?>
								</a></h1>
							<?php else: ?>
								<h1 class="front"><?php print $node->title; ?></h1>
							<?php endif; ?>	
							<p class="featured-text">
								<?php print $body[0]['value']; ?>
							</p>
						</div>
					</div>
				</div>
			</li> 
	    <?php } ?>
	</ul>
</div>

<script type="text/javascript">
	var img = document.body.querySelectorAll('.js-center-image'), i,
	win = window.innerWidth,
	text = document.body.querySelector('.home__slider--item--text');
	text.classList.add('in');
	
	for (i = 0; i < img.length; i++) {
		img[i].onload = function () {	
			this.style.position = 'relative';
			this.style.left = (win - this.offsetWidth) / 2 + 'px';			
		};
	}

	//img[img.length-1].onload = function () {
	$('.js-slider').anythingSlider({
		buildNavigation     : false,
	    buildStartStop      : false, 
	    hashTags			: false,
		resizeContents 		: false,
		expand				: true,
		infiniteSlides		: false,
	    onInitialized: function (e, slider) {
	    	var text = $(e.currentTarget).find('.home__slider--item--text__holder');
	    	window.setTimeout(function () {
				text.addClass('in');
		    	text.css({'top': '0px'});
	    	}, 500);
	    },
		onSlideInit : function (e, slider) {
			var moving_out = slider.$targetPage;
			var text = moving_out.find('.home__slider--item--text__holder');
			$('.home__slider--item--text__holder').each(function () {
				$(this).removeClass('in');
				$(this).removeClass('out');
				$(this).css({'top': '-400px'});
			});		
		},
		onSlideComplete: function (slider) {
			var moving_in = slider.$targetPage;
			var text = moving_in.find('.home__slider--item--text__holder');
			text.removeClass('out');
			text.addClass('in');
			text.css({'top': '0px'});
		}, 
		onSliderResize: function (slider) {
			var slider = $('.anythingSlider');
			slider.each(function () {
			});
		}
	});
	//};
	window.onresize = function () {
		var win = window.innerWidth;
		var slider = $('.anythingSlider');
			slider.each(function () {
				$(this).css({'width' : win + 'px'})
			});
	};
</script>
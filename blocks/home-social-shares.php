<div id="fb-root"></div>
<script>
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.0";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
</script>

<div class="social-share w-1080 div-center clearfix medium-space-before">
	<div class="social-share__holder grid-3 clearfix tiny-space-before">
	
		<div class="social-share__item subgrid-3 clearfix">
			<div class="fb-like-box" data-href="https://www.facebook.com/pages/HOLABERLIN/184920544898100" 
				 data-width="350" data-colorscheme="light" data-show-faces="false" 
				 data-header="false" data-stream="true" data-show-border="true"></div>
		</div>  <!-- end of social-shares__fb -->

		<div class="social-share__item social-share__item-comments subgrid-3 clearfix" >
			<div class="social-share__title">Últimos comentarios</div>
			<div class="social-share__block bleed-inside clearfix">
				<?php 
					$block = module_invoke('views', 'block_view', 'comments_recent-block');
					echo views_embed_view('comments_recent', $display_id = 'block');
		        ?>
			</div>
        </div> <!-- end of social-shares__comments -->


		<div class="social-share__item subgrid-3 clearfix">
			<a class="twitter-timeline" href="https://twitter.com/holaberlin" data-widget-id="520239299258626048">Tweets by @holaberlin</a>
				<script>
					!function(d,s,id) {
						var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
						if(!d.getElementById(id)) {
							js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);
						}
					}(document,"script","twitter-wjs");
				</script>
		</div> <!-- end of social-shares__twitter -->
		
	</div> <!-- end of social-shares__holder -->
</div> <!-- end of social-shares -->

<div class="wrapper w-fixed"> <!-- wrapper for the side menu -->

<header id="header" class="header w-fixed w-all clearfix">
	<!-- header line -->
	<div class="header__line w-all clearfix"></div>

	<div class="mobil__menu-toggle clickable hoverable js-menu-toggle js-menu-closed "></div>

	<!-- header -->
	<div class="header__holder w-1080 div-center clearfix tiny-space-before tiny-space-after">
		<div class="header__left-block to-left clearfix">
			<div class="header__logo to-left">
				<a href="/">
					<img src="/<?php print $directory; ?>/images/logo.png" alt="logo" title="logo"/>
				</a>
			</div>
			
			
			<nav class="header__social to-right">
				<ul class="header__social-menu menu-horizontal">
					<li><a target="_blank" href="https://www.facebook.com/pages/HOLABERLIN/184920544898100">
					  <img src="/<?php print $directory; ?>/images/logos-menu-02.png"></a></li>
					<li><a target="_blank" href="https://twitter.com/holaberlin">
					  <img src="/<?php print $directory; ?>/images/logos-menu-03.png"></a></li>
					<li><a href="mailto:hola@holaberlin.com">
					  <img src="/<?php print $directory; ?>/images/logos-menu-04.png"></a></li>
					<li><a target="_blank" href="https://www.youtube.com/user/holaberlin/videos?sort=p&view=0&flow=list">
					  <img src="/<?php print $directory; ?>/images/logos-menu-06.png"></a></li>
					<li><a target="_blank" href="https://plus.google.com/u/0/+HOLABERLIN_HOLABERLIN">
					  <img src="/<?php print $directory; ?>/images/logos-menu-07.png"></a></li>
					<li><a target="_blank" href="http://www.tripadvisor.de/Attraction_Review-g187323-d1457550-Reviews-HOLABERLIN-Berlin.html">
					  <img src="/<?php print $directory; ?>/images/logos-menu-11.png"></a></li>
					<li><a target="_blank" href="https://soundcloud.com/holaberlin-holaberlin">
					  <img src="/<?php print $directory; ?>/images/logos-menu-12.png"></a></li>
				</ul>
			</nav>
		</div>

		<div class="header__left-block to-right clearfix">
			<nav class="header__login to-right clear-both">
				<ul class="header__login__logout menu-horizontal">
				<?php if (!user_is_logged_in()) { ?>
					<li><a href="/user">Iniciar sesión</a></li>
				<?php } else { 
					global $user;
				?>
					<li>Hola <?php print $user->name; ?> | <a href="/user/logout">Cerrar sesión</a></li>
				<?php } ?>
				</ul>
			</nav>
			
			<!-- IDIOMAS - Este habrá que descomentarlo cuando se hagan las traducciones -->
			<!--
			<nav class="header__lang to-right clear-both">
				<ul class="header__lang-menu menu-horizontal">
					<?php 
						$deutsch_url = url('node/23');
						$english_url = url('node/24');
						$portugues_url = url('node/25');
						$current_path = url(current_path());
						$lang_active = "es"; 
						if ($current_path == $deutsch_url) :
							$lang_active = "de";
						elseif ($current_path == $english_url):
							$lang_active = "en";
						elseif ($current_path == $portugues_url):
							$lang_active = "po";
						endif;
					?>
					<li class="header__lang-menu--item 
						<?php if ($lang_active == "de"): print "active"; endif; ?>">
						<a href="<?php print $deutsch_url;?>">
							<img src="/<?php print $directory; ?>/images/lang-menu-de.png" width="20px">
						</a>
					</li>
					<li class="header__lang-menu--item 
						<?php if ($lang_active == "en"): print "active"; endif; ?>">
						<a href="<?php print $english_url;?>">
							<img src="/<?php print $directory; ?>/images/lang-menu-en.png" width="20px">
						</a>
					</li>
					<li class="header__lang-menu--item
						<?php if ($lang_active == "po"): print "active"; endif; ?>">
						<a href="<?php print $portugues_url;?>">
							<img src="/<?php print $directory; ?>/images/lang-menu-po.png" width="20px">
						</a>
					</li>
					<li class="header__lang-menu--item
						<?php if ($lang_active == "es"): print "active"; endif; ?>">
						<a href="/">
							<img src="/<?php print $directory; ?>/images/lang-menu-es.png" width="20px">
						</a>
					</li>
				</ul>
					
			</nav>
			-->
			<!-- FIN IDIOMAS -->
			
			
			<div class="header__search-form to-right clear-both clearfix">
			<?php 
				$block = module_invoke('search', 'block_view', 'search');
				//$block['content']['search_block_form']['#default_value'] = "Introduce una busqueda";
				//dsm($block['content']['search_block_form']);
				//dsm($block['content']['search_block_form']['#default_value']);
 	        	print render($block); 
            ?>
			</div>
		</div>
		
		<?php
			global $user;
			$quantity = 0;
			$order = commerce_cart_order_load($user->uid);
			if ($order) {
			    $wrapper = entity_metadata_wrapper('commerce_order', $order);
			    $line_items = $wrapper->commerce_line_items;
			    $quantity = commerce_line_items_quantity($line_items, commerce_product_line_item_types());
			    //$total = commerce_line_items_total($line_items);
			    //$currency = commerce_currency_load($total['currency_code']);
			}
		?>
		<?php if ($quantity > 0) { ?>
			<div class="header__left-block--right to-right clearfix relative">
				<div class="header__left-block--right__cta">
					<div class="header__left-block--right__cta--inner">
						<a href="/cart"><img src="/<?php print $directory; ?>/images/cart.png" width="35"/></a>
					</div>
				</div>
				<a href="/cart"><div class="header__left-block--right__amount"><?php print $quantity; ?></div></a>
			</div>
		<?php } ?>
		
	</div> <!-- end of header -->

	<!-- main-menu -->
	<div class="header__navigator w-all clearfix">
		<nav class="header__navigator--holder w-1080 div-center clearfix">                
            <ul class="header__navigator--menu to-left menu-horizontal clearfix">
              <?php $first_menu = menu_navigation_links('menu-left-side-main-menu');
                foreach ($first_menu as $elem) {                    
	                if (strlen($elem["attributes"]["title"])>25) { $long_text = " text"; } else { $long_text = ""; }
   	            	echo '<li class="header__navigator--item relative"><a class="clean_link"href="/' 
	                 	 . drupal_get_path_alias($elem["href"]) . '">' . $elem["title"] . '</a>
	                 	 <span class="tooltip tooltip__down absolute hidden' . $long_text . '">'
	                 	 . $elem["attributes"]["title"] . '</span></li>'; 
              } ?>
			</ul>
			
			<ul class="header__navigator--menu to-right menu-horizontal clearfix">
			  <?php $second_menu = menu_navigation_links('menu-right-side-main-menu');
                foreach ($second_menu as $elem) {
                	if (strlen($elem["attributes"]["title"])>25) { $long_text = " text"; } else { $long_text = ""; }
                	echo '<li class="header__navigator--item relative"><a class="clean_link"href="/' 
	                     . drupal_get_path_alias($elem["href"]) . '">' . $elem["title"] . '</a>
	                     <span class="tooltip tooltip__down absolute hidden' . $long_text . '">' 
	                     . $elem["attributes"]["title"] . '</span></li>'; 
                } ?>
           	</ul>
		</nav> <!-- end of main-menu -->
	</div>
	<?php if ($page['header']): ?>
      <div id="header-region">
        <?php print render($page['header']); ?>
      </div>
    <?php endif; ?>
    
</header>
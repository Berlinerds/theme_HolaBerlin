<footer id="footer" class="footer w-all clearfix">
	<div class="footer__holder w-1080 div-center clearfix medium-space-before medium-space-after">
		<?php if ($page['footer']): ?>
          <?php print render($page['footer']); ?>
        <?php endif; ?>
	</div>
</footer>

</div><!-- end of wrapper -->


<div class="mobile-nav">
    <div class="mobile-nav__holder">
        <div class="mobile-nav__logo">
            <img src="/<?php print $directory; ?>/images/logo-white.png">
        </div>

        <div class="mobile-nav__menu">
            <ul class="mobile-nav__list">
			<?php $first_menu = menu_navigation_links('menu-left-side-main-menu');
				foreach ($first_menu as $elem) {                    
				if (strlen($elem["attributes"]["title"])>25) { $long_text = " text"; } else { $long_text = ""; }
				echo '<li class="mobile-nav__item"><a class="clean_link"href="/' 
				. drupal_get_path_alias($elem["href"]) . '">' . $elem["title"] . '</a></li>'; 
			} ?>

			<?php $second_menu = menu_navigation_links('menu-right-side-main-menu');
				foreach ($second_menu as $elem) {
				if (strlen($elem["attributes"]["title"])>25) { $long_text = " text"; } else { $long_text = ""; }
				echo '<li class="mobile-nav__item"><a class="clean_link"href="/' 
				. drupal_get_path_alias($elem["href"]) . '">' . $elem["title"] . '</a></li>'; 
			} ?>
            </ul>
        </div>

    </div>
</div>
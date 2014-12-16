<article id="node-<?php print $node->nid; ?>" class="blog__item w-all medium-space-after <?php print $classes; ?>">
  <div class="node-inner">
    <header>
        <?php if (!$page): ?>
	      <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
	      <?php endif; ?>
	      
	      <?php if ($display_submitted): ?>
	        <span class="submitted"><?php print $date; ?> — <?php print $name; ?></span>
	    <?php endif; ?>
    </header>
    <div class="content">
	    <?php print $user_picture; ?>
	    <?php if ($img = field_get_items('node', $node, 'field_post_blog_imagen')) {
				$img_path = parse_url(file_create_url($img[0]['uri'])); ?>
	    
				<div class="blog__item--image w-all micro-space-before">
					<img class="w-all" src="<?php echo $img_path['path']; ?>" />
				</div>
		<?php } ?>
		
      <?php 
        // We hide the comments and links now so that we can render them later.
        hide($content['comments']);
        hide($content['links']);
        print render($content);
       ?>
    </div>
    <?php if (!empty($content['links']['terms']) || !empty($content['links'])): ?>
      <footer>
      <?php if (!empty($content['links']['terms'])): ?>
        <div class="terms"><?php print render($content['links']['terms']); ?></div>
      <?php endif;?>
      
      <?php if (!empty($content['links'])): ?>
        <div class="links"><?php print render($content['links']); ?></div>
      <?php endif; ?>
      </footer>
    <?php endif; ?>
  </div> <!-- /node-inner -->
</article> <!-- /node-->
<?php print render($content['comments']); ?>
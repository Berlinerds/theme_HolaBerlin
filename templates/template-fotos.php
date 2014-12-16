<div class="fotos w-all div-center clearfix">
	<?php 
	$query = "SELECT node.nid FROM node
		  	  INNER JOIN weight_weights ON weight_weights.entity_id = node.nid 
			  WHERE type='tour' AND status='1'
			  ORDER BY weight_weights.weight, node.title";
	$queryResult = db_query($query); 
		
	foreach ($queryResult as $elem) {
	  	$node = node_load($elem->nid); 
	  	$alias = drupal_get_path_alias('node/' . $elem->nid); ?>
	  	
	  	<?php if ($images = field_get_items('node', $node, 'field_imagenes')) { ?>
	  	
	  		<div class="single__gallery w-all clear-both overflow-hidden tiny-space-before">
	        	<h2 class="">
	        		<a href='<?php print $alias; ?>'><?php print $node->title ?></a>
	        	</h2>
	        	
	        	<div class="single__gallery__holder grid-6 w-all clear-both overflow-hidden tiny-space-before">
				<?php foreach ($images as $image) {
					$image_path = parse_url(file_create_url($image['uri'])); ?>
					<div class="single__gallery--item subgrid-6 clickable hoverable overflow-hidden h-50 js-modal-gallery" data-modal="<?php print $image_path['path'];?>" >
						<img class="w-all h-auto" src="<?php print $image_path['path'];?>"/>
					</div>
			    <?php } ?>
		    </div>
		<?php } ?>
	<?php } ?>

</div>
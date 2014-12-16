<?php 
$query = "SELECT distinct node.title FROM node
		  INNER JOIN weight_weights ON weight_weights.entity_id = node.nid
		  INNER JOIN field_data_field_imagenes ON field_data_field_imagenes.entity_id = node.nid
		  WHERE type='tour' AND status='1'
		  ORDER BY weight_weights.weight, node.title";
$queryResult = db_query($query);
?>

<div class="fotos__sidebar--holder w-all bleed-inside bleed-vertical-tiny form-background js-sticky-element-fotos">
	<!-- g+ fotos banner -->
	<div class="fotos__sidebar--readmore w-all div-center clearfix clickable hoverable">
		<a target="_blank" href="https://plus.google.com/u/0/photos/+HOLABERLIN_HOLABERLIN/albums">
			<img src="/sites/all/themes/boilerplate/images/google-banner.png" class="w_all" />
		</a>
	</div>
	<!-- end of g+ fotos banner -->
	
	<!-- tours titles to filter fotos -->
	<div class="featured_posts accordion blog__sidebar--list w-all hoverable">
		<h5 class="encapsulado">Tours</h5>
		<ul class="accordion__list">
			<?php foreach ($queryResult as $elem) : ?>
			
			<li class="accordion__item">
				<span class="accordion__item--name"><?php print $elem->title; ?></span>
			</li>
			<?php endforeach; ?>
		</ul>
	</div>  
	<!-- end of tours titles -->
</div>
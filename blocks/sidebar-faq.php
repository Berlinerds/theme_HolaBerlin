<?php 
//$query = "SELECT title FROM node WHERE type='faq'";
$query = "SELECT node.title FROM node
		  INNER JOIN weight_weights ON weight_weights.entity_id = node.nid 
		  WHERE type='faq' AND status='1'
		  ORDER BY weight_weights.weight, node.title";
$queryResult = db_query($query);
?>


<div class="faq__sidebar--holder w-all bleed-inside bleed-vertical-tiny form-background js-sticky-element-faq">
	<!-- featured_posts -->
	<div class="featured_posts accordion blog__sidebar--list w-all hoverable">
		<h5 class="encapsulado">Preguntas frecuentes</h5>
		<ul class="accordion__list">
			<?php foreach ($queryResult as $elem) : ?>
			<li class="accordion__item">
				<span class="accordion__item--name"><?php print $elem->title; ?></span>
			</li>
			<?php endforeach; ?>
		</ul>
	</div>  
	<!-- end of featured_posts -->

	<div class="blog__sidebar--cta w-all clickable hoverable tiny-space-before">
		<img src="/sites/all/themes/boilerplate/images/sistema-de-pago.png" class="w-all" />
	</div>

	<!--
	<div class="blog__sidebar--readmore w-all div-center clearfix clickable hoverable tiny-space-before">
		Ver más Servicios
	</div>
	-->
</div>
		

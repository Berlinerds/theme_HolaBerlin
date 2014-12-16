<?php 
  if (arg(0) == 'node' && is_numeric(arg(1))) {
	  $nid = arg(1);
	  if ($nid) {
	    $node = node_load($nid);
	  }
  }
?>
<div class="single__sidebar--holder w-all">
	
	<?php if ($node->field_tour_ref_producto != NULL) { ?>
		<h4 class="encapsulado w-all reservar-ahora">Reservar ahora</h4>
		<div class="single__main--path w-all tiny-space-before">
			<?php
			    $nodeview = node_view($node);
			    print render($nodeview['product:commerce_price']);
			    print render($nodeview['field_tour_ref_producto']);
			?>	
		</div>
	<?php } else { ?>
		<h4 class="encapsulado w-all">Envíanos un E-mail y Reserva ahora</h4>
		<?php $form_contacto = node_load(26);
			$rendered = node_view($form_contacto);
			print drupal_render($rendered); ?>
	<?php } ?>
	
	<div class="single__main--path w-all tiny-space-before">
		<h4 class="encapsulado w-all">Cómo, Cuándo, Dónde...</h4>
		<table class="single__sidebar--table micro-space-before">
			<?php if ($cuando_salimos = field_get_items('node', $node, 'field_cuando_salimos')) : ?>
				<tr><td class="strong">¿Cuándo salimos?</td></tr>
				<?php $output = field_view_value('node', $node, 'field_cuando_salimos', $cuando_salimos[0]); ?>
				<tr><td><p><?php print render($output); ?></p></td></tr>
		    <?php endif; ?>
		    			
			<tr>
				<td class="strong">¿Cómo nos vas a reconocer?</td>
			</tr>
			<tr>
				<td><img src="/<?php echo path_to_theme(); ?>/images/hola-berlin.png" class="w-all" /></td>
			</tr>
		</table>
	</div>
	
	<?php if ($node->field_tour_ref_producto != NULL) { ?>
		<div class="single__main--path w-all tiny-space-before">
			<h4 class="encapsulado w-all">Contáctanos si tienes dudas</h4>
			<?php $form_contacto = node_load(26);
				$rendered = node_view($form_contacto);
				print drupal_render($rendered); ?>
		</div>
	<?php } ?>

</div>

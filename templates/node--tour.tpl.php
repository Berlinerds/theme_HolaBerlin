<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>">
  <div class="node-inner">
    <header>
        <?php if (!$page): ?>
      <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
      <?php endif; ?>
  
      <?php print $user_picture; ?>
          
      <?php if ($display_submitted): ?>
        <span class="submitted"><?php print $date; ?> — <?php print $name; ?></span>
      <?php endif; ?>
    </header>
    <div class="content">
      <?php 
        // We hide the comments and links now so that we can render them later.
        hide($content['comments']);
        hide($content['links']);
        
        print render($content['field_imagen_principal']);
        print render($content['field_descripcion']);
        print render($content['field_recorrido_propuesto']);
        
        $mostrar_mapa = field_get_items('node', $node, 'field_mostrar_mapa');
        $mostrar_mapa_output = field_view_value('node', $node, 'field_mostrar_mapa', $mostrar_mapa[0]); 
        if ($mostrar_mapa_output["#markup"] == "Si") {
	        print render($content['field_mapa_google']); 
	        print render($content['field_direccion_punto_encuentro']);
	    }
        print render($content['field_duracion_aproximada']);
      ?>
      
      <?php if ($images = field_get_items('node', $node, 'field_imagenes')) { ?> 		
	  	<div class="single__gallery w-all clear-both overflow-hidden tiny-space-before">
        	<h4 class="encapsulado">Galería:</h4>
        	<div class="single__gallery__holder grid-6 w-all clear-both overflow-hidden tiny-space-before">
			<?php foreach ($images as $image) {
				$image_path = parse_url(file_create_url($image['uri'])); ?>
				<div class="single__gallery--item subgrid-6 clickable hoverable js-modal-gallery" data-modal="<?php print $image_path['path'];?>" >
					<img class="w-all" src="<?php print $image_path['path'];?>"/>
				</div>
		    <?php } ?>
	    </div>
	  <?php } ?>
     
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
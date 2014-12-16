<div class="distributor w-1080 div-center clearfix medium-space-before">
	<!-- <h2>Headline 2 <small>- Tours definition</small></h2> -->

	<div class="distributor__holder grid-3 clearfix">

		<?php if (drupal_is_front_page()) { ?>
			
			<!-- product item -->
			<div class="distributor-item distributor-item__traslados subgrid-3 clearfix tiny-space-before">
				<div class="distributor-item__title distributor-item__title--traslados w-all">
					<h4>Traslados</h4>
				</div>
				<div class="distributor-item__image w-all">
					<a class="clean_link" href="/traslados">
						<img src="/sites/all/themes/boilerplate/images/traslados_teaser.jpg" alt="img-ex-1">
					</a>
				</div>
				<p class="distributor-item__description w-all">
					Traslados privados desde/hacia aeropuertos, puertos, dentro de Berlín y desde/hacia otras ciudades.
				</p>
				<a class="clean_link" href="/traslados">
					<div class="distributor-item__readmore w-all clickable">
						Más información
					</div>
				</a>
			</div> 
			<!-- end of product item -->			

		<?php } ?>


		<?php 
		$query = "SELECT node.nid FROM node
		  		  INNER JOIN weight_weights ON weight_weights.entity_id = node.nid 
				  WHERE type='tour' AND status='1'
				  ORDER BY weight_weights.weight, node.title";
		$queryResult = db_query($query);
		
		foreach ($queryResult as $elem) {
			$tour = node_load($elem->nid);
			$tour_url = url('node/' . $elem->nid);
			$field_thumbnail = field_get_items('node', $tour, 'field_tour_thumbnail');
			$image_path = parse_url(file_create_url($field_thumbnail['0']['uri'])); ?>
        
        	<!-- product item -->
			<div class="distributor-item subgrid-3 clearfix tiny-space-before">
				<div class="distributor-item__title w-all">
					<h4><?php echo $tour->title; ?></h4>
				</div>
				<div class="distributor-item__image w-all distributor_bw_images">
					<a class="clean_link" href='<?php print $tour_url; ?>'">
						<img src="<?php print $image_path['path']; ?>">
					
					<div class="distributor-item__image-distorter"></div>
					</a>
				</div>
				<p class="distributor-item__description w-all">
					<?php print $tour->field_tour_home_text['und']['0']['safe_value']; ?>
				</p>
				<a class="clean_link" href='<?php print $tour_url; ?>'">
					<div class="distributor-item__readmore w-all clickable">
						Más información
					</div>
				</a>
			</div> <!-- end of product item -->

        <?php } ?>
		
		<?php if (drupal_is_front_page()) { ?>
			<!-- product item -->
			<div class="distributor-item distributor-item__ofertas subgrid-3 clearfix tiny-space-before">
				<div class="distributor-item__title distributor-item__title--ofertas w-all">
					<h4>Ofertas</h4>
				</div>
				<div class="distributor-item__image w-all">
					<a class="clean_link" href="/ofertas">
						<img src="/sites/all/themes/boilerplate/images/ofertas_teaser.png" alt="img-ex-1" style="margin-top: -20px;">
    				</a>
				</div>
				<p class="distributor-item__description w-all">¿Viajas sol@ o en pareja? ¿Deseas sumarte a grupos ya formados? ¿Visitas la ciudad en festivos o puentes? Descubre los próximos recorridos y servicios HOLABERLIN programados a los que te puedes sumar</p>
				<a class="clean_link" href="/ofertas">
					<div class="distributor-item__readmore w-all clickable">
						Más información
					</div>
				</a>
			</div> <!-- end of product item -->
		<?php } ?>

	</div>
</div>

<script>
var iguala_title=function(e,t){var n=e,r=document.querySelector(".distributor-item__traslados")!==null?1:0,i=[720,570,0],s=function(){if(n>=i[0]){return 2}else if(n>=i[1]){return 1}else{return 0}}(),o=document.body.querySelectorAll(".distributor-item__title"),u=0,a=1,f=s+1,l=0,c=0,h=2,p=[];var d=function(e,t){for(var n=e[0];n<e[0]+e.length;n++){o[n].style.height=t+h+"px"}};while(c<o.length){o[c].style.height="auto";if(c%f==0){u++;a=1}if(p.length<f||p.length===0){p.push(c)}else{d(p,l);l=0;p=[];p.push(c)}if(o[c].clientHeight>l&&c>r-1){l=o[c].clientHeight}a++;c++}};var iguala_image=function(){if(document.querySelector(".distributor-item__traslados")!==null){var e=document.querySelector(".distributor-item__traslados"),t=e.querySelector(".distributor-item__image"),n=document.querySelectorAll(".distributor-item")[1],r=n.querySelector(".distributor-item__title"),i=n.querySelector(".distributor-item__image"),s=r.offsetHeight,o=i.offsetHeight,u=0;var a=s+o+u;t.style.height=a+"px"}};window.addEventListener("load",function(e){iguala_title(this.innerWidth,e.type);iguala_image()},false);window.addEventListener("resize",function(e){iguala_title(this.innerWidth);iguala_image()},false);var imgs_to_bw=function(){$(".distributor_bw_images").BlackAndWhite({hoverEffect:true,webworkerPath:false,invertHoverEffect:false,intensity:1,speed:{fadeIn:100,fadeOut:100},onImageReady:function(e){}})}()
</script>

























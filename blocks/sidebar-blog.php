<?php include_once ("sites/all/themes/boilerplate/libs/fechas.php"); ?>

<div class="blog__sidebar w-all to-right bleed-left">
	<div class="blog__sidebar--holder w-all bleed-inside bleed-vertical-tiny form-background clearfix">
	
	<!-- featured_posts -->
		<div class="featured_posts accordion blog__sidebar--list w-all medium-space-after">
			<h5 class="encapsulado">Posts destacados</h5>
			<ul class="accordion__list">
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/clima-horas-luz-y-datos-horarios-berlin">Clima, horas de luz y datos horarios</a>
					</span>
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/transportes-berlin">Transportes</a>
					</span>
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/categorias/alojamiento">Alojamiento</a>
					</span> 
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/familias-ninos">Familias con niños</a>
					</span>
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/restaurantes">Gastronomía</a>
					</span>
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/categorias/compras">De compras</a>
					</span>
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/categorias/navidades-y-fin-ano">Navidades y fin de año</a>
					</span>
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/categorias/eventos-y-exposiciones">Eventos y exposiciones</a>
					</span>
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/categorias/musica-clasica-y-espectaculos">Música clásica y espectáculos</a>
					</span>
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/categorias/vida-nocturna">Vida nocturna</a>
					</span>
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/visitar-bunkers-y-construcciones-subterraneas-berlin">Visitar Bunkers</a>
					</span>
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="//material-periodistico-berlin-y-alemania">Material periodístico sobre Berlín y Alemania</a>
					</span>
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/peliculas-berlin-y-alemania">Películas sobre Berlín y Alemania</a>
					</span>
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/libros-relacionados-berlin-y-alemania">Libros relacionados con Berlín y Alemania</a>
					</span>
				</li>
				<li class="accordion__item hoverable">
					<span class="accordion__item--name">
						<a class="clean_link" href="/visita-la-cupula-del-parlamento-aleman">Visitar el parlamento alemán (Reichstag)</a>
					</span>
				</li>																
			</ul>
			
		</div>  <!-- end of featured_posts -->
		
		<!-- calendar -->
		<div class="calendar accordion blog__sidebar--list w-all hoverable">
			<h5 class="encapsulado">Calendario</h5>
			
			<!-- first level acc -->
			<ul class="accordion__list js-accordion-2_level">	
				<?php 		
				$query = "SELECT created FROM node WHERE type='post_blog' ORDER BY created ASC LIMIT 1";
				$queryResult = db_query($query);
				$init_year = date("Y", $queryResult->fetchField(0));
				
				$query = "SELECT created FROM node WHERE type='post_blog' ORDER BY created DESC LIMIT 1";
				$queryResult = db_query($query);
				$end_year = date("Y", $queryResult->fetchField(0));
				
				for ($i = $end_year; $i >= $init_year; $i--) { 
					$class_opened = ($i === $end_year) ? 'opened' : 'closed';
				?>
					
					<li class="accordion__item">
						<span class="accordion__item--name accordion__subaccordion__toggle accordion_year <?php echo $class_opened; ?>">
							<?php print $i; ?>
						</span>
						
						<!-- second level acc -->
						<ul class="accordion__list accordion__subaccordion__list accordion_year-list <?php echo $class_opened; ?>">
								
								<?php $open_first = 'opened'; ?>
								<?php for ($j=12; $j>=1; $j--) { ?>
								
									<?php 
									$first_day_month = mktime(0,0,0,$j, 1, $i);
									$first_day_next_month = _first_day_next_month($first_day_month);
									$query = "SELECT * FROM node WHERE type='post_blog'
											  AND " . $first_day_month . "<created
											  AND " . $first_day_next_month . ">created 
											  ORDER BY created ASC";
									$queryResult = db_query($query);
									$num_elem = $queryResult->rowCount();
									
									if ($num_elem > 0) { 
									?>
									<li class="accordion__subaccordion__item accordion__subaccordion__toggle">
										<span class="accordion__subaccordion__item--name accordion__subaccordion__toggle accordion_month <?php echo $open_first; ?>">
											<?php print $meses_castellano[$j]?>
											<span class="accordion__subaccordion__item--name_count">
												<?php print $num_elem; ?>
											</span>
										</span>
										
										<!-- third level acc -->
										<ul class="accordion__list accordion__subaccordion__list  accordion_month-list <?php echo $open_first; ?>">
											<?php 
											foreach ($queryResult as $elem) {
												$alias = drupal_get_path_alias('node/' . $elem->nid); ?>
												<li class="accordion__subaccordion__item">
													<a class="clean_link" href="/<?php print $alias; ?>">
														<?php print $elem->title; ?>
													</a>	
												</li>
											<?php } ?>
										</ul>
									<?php 
									$open_first = 'closed';	
									} ?>
								</li>	
							<?php } ?>
						</ul>
					</li>
				<?php } ?>
			</ul> <!-- end of first list -->
		</div>	<!-- end of calendar -->	
	</div>
</div>
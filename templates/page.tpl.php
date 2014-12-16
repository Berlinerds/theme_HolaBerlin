<div id="page" class="<?php print $classes; ?>"<?php print $attributes; ?>>
  
  <?php 
  include_once ('header.php'); // HEADER 
  if(drupal_is_front_page()) {
    include_once ('home-slider.php'); // HOME SLIDER
  } else {
    // BREADCRUMB 
    if ($breadcrumb) { 
    	$removed_init_str = str_replace('<a href="/">Inicio</a>', '', $breadcrumb);
    	if (strlen($removed_init_str) <= 0)
    		$breadcrumb = "";
    	}
    	include_once ('breadcrumb.php');  
  } 
  ?>

  <div id="main" class="single-body clearfix w-1080 div-center medium-space-before clearfix">
    <?php if ($messages) { print $messages; } ?>
    
    <?php if(drupal_is_front_page()) {
       include_once ('home-distributor.php');
    }
    else { ?>
      <?php 
      $path = current_path();
      $pos = strpos($path, "admin/");
      if (strpos($path, "admin/") !== false) { ?>
        <div id="content" class="w-1080 div-center">
      <?php } else { ?>
        <div id="content" class="w-75 to-left bleed-right medium-space-before clearfix">
      <?php } ?>
        <?php if ($title|| $tabs || $action_links): ?>
          <div id="content-header">
         
            <?php if ($title): ?>
              <h1 class="title"><?php print $title; ?></h1>
            <?php endif; ?>

            <?php print render($page['help']); ?>

            <?php if ($tabs): ?>
              <div class="tabs"><?php print render($tabs); ?></div>
            <?php endif; ?>

            <?php if ($action_links): ?>
              <ul class="action-links"><?php print render($action_links); ?></ul>
            <?php endif; ?>

            <?php if ($page['highlight']): ?>
              <div id="highlight"><?php print render($page['highlight']) ?></div>
            <?php endif; ?>

          </div> <!-- /#content-header -->
        <?php endif; ?>
          
        <div id="content-area">
          <?php print render($page['content']) ?>
        </div>
          
        <?php if ($page['content_bottom']): ?>
          <div id="content_bottom"><?php print render($page['content_bottom']) ?></div>
        <?php endif; ?>
      </div> <!-- /content -->
    
      <!-- SIDEBAR -->
      <?php if ($page['sidebar_first']): ?>
        <div id="sidebar" class="single-body__sidebar w-25 to-right bleed-left clearfix">
          <?php print render($page['sidebar_first']); ?>
        </div>
      <?php endif; ?> <!-- /sidebar-first -->
      
    <?php } ?>  
  </div> <!-- /main -->
          
  <?php if ($page['bottom']): ?>
    <div id="bottom"><?php print render($page['bottom']) ?></div>
  <?php endif; ?>  
        
  <!-- FOOTER -->
  <?php include_once ('footer.php'); ?>

</div> <!-- /page -->

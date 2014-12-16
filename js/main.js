window.onload = function () {

	tooltips_init ();

	/* ---  single --- */
	init_maps ();

	/* --- form --- */
	tiny_form_process ();

	/* --- ui --- */
	//accordion ();	
	accordion_2__level ();
	
	//sticky sidebars
	sticky_init();
	

	lateral_menu ();

	/* --- gallery --- */

	if (document.body.querySelector('.js-modal-gallery') !== null) {
		var options = {
		    animation : true
		};
		var modal = new Berlinerds_Gallery_Modal (options);
	}
		
	/* --- faq and blog --- */
	faq_update_sidebar();
	faq_scroll_to();
	
	/* --- fotos --- */
	fotos_update_sidebar();
	fotos_scroll_to();
};




var mqueries 	= [1200, 1000, 770, 500]; //mayor que 1200, etc...

var which_query = function () {
	var win = window.innerWidth;
	if (win >= mqueries[0])
		return 'big_desktop';

	if (win >= mqueries[1] && win < mqueries[0])
		return 'tiny_desktop';

	if (win >= mqueries[2] && win < mqueries[1])
		return 'pad_desktop';
};

var actual_query = which_query();



/* ==== iniciar mapas en single tour ==== */

var init_maps = function () {
	var map;	
	var mapOptions = {
		zoom: 15,
		center: new google.maps.LatLng(52.516275, 13.377704),
		disableDefaultUI : true, 
		scrollwheel		 : false
	};

	if (document.getElementById('map') !== null) {	
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		google.maps.event.addListener(map, 'dragend', function() {
			console.log(this);
	  	});
	}
};


/* ==== procesar vía ajax el formulario de la página ==== */

var tiny_form_process = function () {
	var form = document.body.querySelector('.form');

	if (form !== null) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			
			var obj = form.elements,
				url = form.getAttribute('action'),
				data_url = "";

			for (var key in obj) {
				data_url = (data_url !== '') ? data_url + '&' : '';
				data_url += key + "=" + obj[key].value;
			}

			//ajax function 
			ajax (url, function (err, data, XMLHttpRequestObject) {
				var _data = JSON.parse(data);
				
				if (_data.status === 'success') {
					alert ('mensaje mandado con calidad.');
				};
			}, 'post', data_url);
		} , false);
	}

};

/* ==== acordeon del blog ==== */

var accordion = function () {

	if (document.body.querySelector('.accordion__subaccordion__list')) {
		var doc 			  = document.body,
			accordion 		  = doc.querySelectorAll('.accordion__list'),
			accordion_list 	  = doc.querySelectorAll('.accordion__subaccordion__list'), 
			accordion_toggle  = doc.querySelectorAll('.accordion__subaccordion__toggle'), 
			i 				  = 0, 
			classes			  = ['opened', 'closed'];

		for (; i < accordion_list.length; i++) {
			
			accordion_toggle[i].addEventListener('click', function (e) {
				
				var accordion_list = this.parentNode.querySelector('.accordion__subaccordion__list');
				
				if (this.classList.contains(classes[0])) {
					
					// change class in toggle
					this.classList.remove(classes[0]);
					this.classList.add(classes[1]);
					
					// change class in list
					accordion_list.classList.remove(classes[0]);
					accordion_list.classList.add(classes[1]);

				} else {
					// change class in toggle
					this.classList.remove(classes[1]);
					this.classList.add(classes[0]);
					
					// change class in list
					accordion_list.classList.remove(classes[1]);
					accordion_list.classList.add(classes[0]);
				}

			}, false); 
		}
	}
};

var accordion_2__level = function () {

	//lo hago en jQuery
	var accordion   = $('.js-accordion-2_level');
	var classes 	= ['closed', 'opened'];
	var acc_array   = [];
	
	var accordion_children = accordion.children().toArray();
	
	for (var i = 0; i < accordion_children.length; i++) {
		acc_array[i] = [];
		acc_array[i][0] = $(accordion_children[i]).find('span.accordion_year'); //toggle
		acc_array[i][1] = $(accordion_children[i]).find('ul.accordion_year-list'); // acc_element
		acc_array[i][2] = []; // acc_element_sons
		
		var sub_acc_children = acc_array[i][1].children().toArray();
		
		for (var j = 0; j < sub_acc_children.length; j++) {
			acc_array[i][2][j] = [];
			acc_array[i][2][j][0] = $(sub_acc_children[j]).find('span.accordion_month'); //toggle
			acc_array[i][2][j][1] = $(sub_acc_children[j]).find('ul.accordion_month-list'); // acc_element
		} 
		
	}
	
	//add events to array's first level
	for (var i = 0; i < acc_array.length; i++) {
		var toggle = $(acc_array[i][0]);
		
		toggle.each(function (id, e) {
			
			$(e).on('click', function (ev) {
				var index = $(ev.target).index('span.accordion_year');
				
				// toggle mod
				$(ev.target).toggleClass(classes[0]);
				$(ev.target).toggleClass(classes[1]);
				
				// clap submenus on close menu
				if ($('ul.accordion_year-list').eq(index).hasClass(classes[1])) {
					$('ul.accordion_year-list').eq(index)
											   .find('ul')
											   .each (function (j, ele) {
												  $(ele).addClass(classes[0]);
												  $(ele).removeClass(classes[1]);
												});
				
				}
				
				// clap menu
				$('ul.accordion_year-list').eq(index).toggleClass(classes[0]);
				$('ul.accordion_year-list').eq(index).toggleClass(classes[1]);
								
				return false;
			});
		})
	}
	
	//add events to array's second level
	for (var i = 0; i < acc_array.length; i++) {
		var sub_acc_arr = acc_array[i][2];
		
		for (var j = 0; j < sub_acc_arr.length; j++) {
			var toggle = sub_acc_arr[j][0];
			var list   = sub_acc_arr[j][1];
			
			toggle.each(function (id, e){
				$(e).on('click', function (ev) {
					var index = $(ev.target).index('span.accordion_month');
					
					$(ev.target).toggleClass(classes[0]);
					$(ev.target).toggleClass(classes[1]);
					
					$('ul.accordion_month-list').eq(index).toggleClass(classes[0]);
					$('ul.accordion_month-list').eq(index).toggleClass(classes[1]);					
					
				});
			});
		}
	}				
};




/* ==== menu lateral en dispositivos móviles ==== */

var lateral_menu = function () {
	var doc = document.body;
	var toggle = doc.querySelector('.mobil__menu-toggle');
	var menu_open = false;
	
	var click = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';

	//toggle classes of the toggle
	toggle.addEventListener(click, function (e) {
		console.log(e);

		if (this.classList.contains('js-menu-closed')) {
			this.classList.remove('js-menu-closed');
			this.classList.add('js-menu-opened');

			open_menu (true);

		} else if (this.classList.contains('js-menu-opened')) {
			this.classList.remove('js-menu-opened');
			this.classList.add('js-menu-closed');

			open_menu (false);
		}
	}, false);

	doc.addEventListener('keyup', function (e) {

		if (e.keyCode == 27) {
			
			toggle.classList.remove('js-menu-opened');
			toggle.classList.add('js-menu-closed');

			open_menu (false);
		}

	}, false);

	document.addEventListener('touchmove', function (e) {
		
		if (menu_open == true) {
			e.preventDefault();
		}
			
	}, false);

	var open_menu = function (bool) {
		var doc = document.body;
		var wrapper = doc.querySelector('.wrapper');
		var classes = ['nav-opened'];

		if (bool == true) {
			if (!wrapper.classList.contains(classes[0])) {
				wrapper.classList.add(classes[0]);
				doc.style.overflow = 'hidden';
				menu_open = true;
			} else {
				wrapper.classList.remove(classes[0]);
				doc.style.overflow = 'hidden';
				menu_open = true;
			}
		} else {
			wrapper.classList.remove(classes[0]);
			doc.style.overflow = 'visible';
			menu_open = false;
		}
	};
};


/* ==== tooltips ==== */

var tooltips_init = function () {

	var doc = document.body;
	var list_item = doc.querySelectorAll('.header__navigator--item');
	var tooltip = doc.querySelectorAll('.tooltip');

	for (var i = 0; i < list_item.length; i++) {

		list_item[i].addEventListener('mouseenter', function (e) {
			var tip = this.querySelector('.tooltip');
			tip.classList.remove('hidden');
			tip.style.opacity = '1';

		}, false);

		list_item[i].addEventListener('mouseleave', function (e) {
			var tip = this.querySelector('.tooltip');
			tip.style.opacity = '0';
			tip.addEventListener(transEndEvent, function () {
				tip.classList.add('hidden');
			}, false);

		}, false);
	}
};


/* ==== faq update classes while scrolling ==== */

var faq_update_sidebar = function () {
	
	var doc 	= document.body;
	if (doc.querySelector('article.node-faq') === null) { return false; }
	
	var section = doc.querySelectorAll('article.node-faq'),
		list 	= doc.querySelectorAll('.accordion__item'),
		limits  = [],
		window_scroll = window.scrollY, 
		classes = ['list_active', 'list_inactive', 'section_active', 'section_inactive']
	
	for (var i = 0; i < section.length; i++) {
		section[i].setAttribute('data-index', i);
		limits[i] = section[i].offsetTop;
	}
	
	//load
	var active_index = function (_window_scroll) {
		var index = 0;
		for (var j = 0; j < limits.length; j++) {
			if (limits[j] < _window_scroll) {
				index = j;	
			} 
		}
		section[index].classList.add(classes[2])
		return index;	
	};
	
	
	var update_list = function (_window_scroll) {
		for (var k = 0; k < list.length; k++) {
			list[k].classList.add(classes[1]);
			list[k].classList.remove(classes[0]);	
		}
		list[active_index(_window_scroll)].classList.add(classes[0]);
		list[active_index(_window_scroll)].classList.remove(classes[1]);		
	};
	
	//on load
	update_list(window_scroll);
	
	//on scroll
	window.addEventListener('scroll', function (e) {
		var offset = 80;
		var window_scroll = window.scrollY + offset; 
		update_list(window_scroll);
	}, false);
	
};

var faq_scroll_to = function () {
	var doc = document.body;
	if (doc.querySelector('.page-faq .accordion__item--name') === null) { return false; }	
	
	var nodes   = $('.page-faq .accordion__item');
	var	section = $('article.node-faq');
	nodes.each(function (i, elem) {
		$(this).on('click', function (){
			$(window).scrollTo(section.eq(i), 800,{offset: {top:-50, left:0}});
		});
	});
};

/* ==== fotos update classes while scrolling ==== */

var fotos_update_sidebar = function () {
	
	var doc 	= document.body;
	if (doc.querySelector('article#node-8') === null) { return false; }
	
	var section = doc.querySelectorAll('.single__gallery__holder'),
		list 	= doc.querySelectorAll('.accordion__item'),
		limits  = [],
		window_scroll = window.scrollY, 
		classes = ['list_active', 'list_inactive', 'section_active', 'section_inactive']
	
	for (var i = 0; i < section.length; i++) {
		section[i].setAttribute('data-index', i);
		limits[i] = section[i].offsetTop;
	}
	
	//load
	var active_index = function (_window_scroll) {
		var index = 0;
		for (var j = 0; j < limits.length; j++) {
			if (limits[j] < _window_scroll) {
				index = j;	
			} 
		}
		section[index].classList.add(classes[2])
		return index;	
	};
	
	
	var update_list = function (_window_scroll) {
		for (var k = 0; k < list.length; k++) {
			list[k].classList.add(classes[1]);
			list[k].classList.remove(classes[0]);	
		}
		list[active_index(_window_scroll)].classList.add(classes[0]);
		list[active_index(_window_scroll)].classList.remove(classes[1]);		
	};
	
	//on load
	update_list(window_scroll);
	
	//on scroll
	window.addEventListener('scroll', function (e) {
		var offset = 80;
		var window_scroll = window.scrollY + offset; 
		update_list(window_scroll);
	}, false);
	
};

var fotos_scroll_to = function () {
	var doc = document.body;
	if (doc.querySelector('.page-node-8 .accordion__item--name') === null) { return false; }	
	
	var nodes   = $('.page-node-8 .accordion__item');
	var	section = $('.single__gallery__holder');
	nodes.each(function (i, elem) {
		$(this).on('click', function (){
			$(window).scrollTo(section.eq(i), 800,{offset: {top:-50, left:0}});
		});
	});
};

var sticky_init = function() { 
	if (document.querySelector('div[class*=js-sticky-element-]') == null) { return false; }
	var possible_sticky = document.querySelector('div[class*=js-sticky-element-]');
	
	var sticky_options = {
		element		 : 'div[class*=js-sticky-element-]',
		parent		 : '#main',
		offset		 : 10,
		is_drupal	 : true,
		theres_admin_menu: function () { return $('body').hasClass('admin-menu'); }(),
		growable	 : false,
		responsive	 : true,
		from_numof_px: 999,
		debugging	 : false,
	};
	
	var sticky =  new Sticky_sidebar(sticky_options);
}


//cuanto de grande es la pantalla = cuantos elementos tiene el grid (pant>=570px) (pant >= 720px)

/*var iguala_title = function (win, e) {
	var window_width = win,
		offset = (document.querySelector('.distributor-item__traslados') !== null) ? 1 : 0,
		limits = [720, 570, 0],
		need_to_fire_function = function () {
			if 		(window_width >= limits[0]) { return 2; } 
			else if (window_width >= limits[1]) { return 1; } 
			else 						  		{ return 0; }	
		}(),
		titles = document.body.querySelectorAll('.distributor-item__title'),
		row = 0,
		col = 1,
		max_cols = need_to_fire_function + 1,
		row_max_height = 0,
		i = 0,
		has_border = 2,
		num_array = [];
	
	var set_heights_equal = function (_arr, _row_max_height) {
		for (var j = _arr[0]; j < _arr[0] + _arr.length ; j++) {
			titles[j].style.height = _row_max_height + has_border + 'px';
		}

	};
	
	// comprobar que todos los bloques de título sean iguales		
	while (i < titles.length) {
		titles[i].style.height = 'auto';
		
		if (i % max_cols == 0) {
			row++;
			col = 1;
		}
		if (num_array.length < max_cols || num_array.length === 0) {
			num_array.push(i);
		} else {
			set_heights_equal(num_array, row_max_height);
			row_max_height = 0;
			num_array = [];
			num_array.push(i);
		}
		if (titles[i].clientHeight > row_max_height && i > (offset - 1)) {
			row_max_height = titles[i].clientHeight;
		}			
		col++;
		i++;
	}
};

var iguala_image = function () {
	if (document.querySelector('.distributor-item__traslados') !== null) {
		var block = document.querySelector('.distributor-item__traslados'),
			block_img = block.querySelector('.distributor-item__image'),
			block_general = document.querySelectorAll('.distributor-item')[1],
			block_title = block_general.querySelector('.distributor-item__title'),
			block_image = block_general.querySelector('.distributor-item__image'),
			block_title_height = block_title.offsetHeight,
			block_image_height = block_image.offsetHeight,
			has_border = 0;
		
		var total = block_title_height + block_image_height + has_border;
		block_img.style.height = total + 'px';	
	}
};


window.addEventListener('load', function (ev) {	
	iguala_title(this.innerWidth, ev.type);
	iguala_image();
}, false);

window.addEventListener('resize', function (ev) {	
	iguala_title(this.innerWidth);
	iguala_image();
}, false);

var imgs_to_bw = function () {
	$('.distributor_bw_images').BlackAndWhite({
	    hoverEffect : true, // default true
	    webworkerPath : false,
	    invertHoverEffect: false,
	    intensity:1,
	    speed: { //this property could also be just speed: value for both fadeIn and fadeOut
	        fadeIn: 100, // 200ms for fadeIn animations
	        fadeOut: 100 // 800ms for fadeOut animations
	    },
	    onImageReady:function(img) {
	    }
	});	
}();*/

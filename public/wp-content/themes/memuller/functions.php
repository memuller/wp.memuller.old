<?php
/**
 * Author: Ole Fredrik Lie
 * URL: http://olefredrik.com
 *
 * FoundationPress functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */

/** Various clean up functions */
require_once( 'library/cleanup.php' );

/** Required for Foundation to work properly */
require_once( 'library/foundation.php' );

/** Register all navigation menus */
require_once( 'library/navigation.php' );

/** Add menu walkers for top-bar and off-canvas */
require_once( 'library/menu-walkers.php' );

/** Create widget areas in sidebar and footer */
require_once( 'library/widget-areas.php' );

/** Return entry meta information for posts */
require_once( 'library/entry-meta.php' );

/** Enqueue scripts */
require_once( 'library/enqueue-scripts.php' );

/** Add theme support */
require_once( 'library/theme-support.php' );

/** Add Nav Options to Customer */
require_once( 'library/custom-nav.php' );

/** Change WP's sticky post class */
require_once( 'library/sticky-posts.php' );

/** Configure responsive image sizes */
require_once( 'library/responsive-images.php' );

/** If your site requires protocol relative url's for theme assets, uncomment the line below */
// require_once( 'library/protocol-relative-theme-assets.php' );

add_filter('tiny_mce_before_init', function($arr){
	$formats = [
		[
			'title' => '.side',
			'block' => 'div',
			'classes' => 'side',
			'wrapper' => true
		]
	];

	$arr['style_formats'] = json_encode($formats);
	return $arr;
});

add_filter('mce_buttons_2', function($buttons){
	array_unshift($buttons, 'styleselect');
	return $buttons;
});

function remove_core_updates(){
	global $wp_version;
	return (object) [
		'last_checked'=> time(),
		'version_checked'=> $wp_version
	];
}

foreach (['pre_site_transient_update_core', 'pre_site_transient_update_plugins', 'pre_site_transient_update_themes'] as $hook) {
	add_filter($hook, 'remove_core_updates');
}

add_action('admin_head', function(){
	echo "<style>
		.update-nag { display: none !important; }
	</style>";
});

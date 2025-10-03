<?php

/*
Plugin Name:  AutoSoftway Pricing Plugin OLD
Plugin URI:   https://www.autosoftway.com
Description:  This is an Autosoftway Pricing Plugin
Version:      1.0
Author:       Jamie Klapwyk
Author URI:   https://www.linkedin.com/in/jamieklapwyk/
License:      Apache 2
License URI:  https://www.apache.org/licenses/LICENSE-2.0.txt
Text Domain:  autosoftwayPricing
Domain Path:  /autosoftwayPricing
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function create_block_your_plugin_block_init() {
    register_block_type( __DIR__ . '/src' );
}
add_action( 'init', 'create_block_your_plugin_block_init' );
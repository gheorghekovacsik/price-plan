<?php
/**
 * Plugin Name:       AutoSoftway Pricing Table 
 * Description:       This is an Autosoftway Pricing Table Plugin.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Jamie Klapwyk
 * Author URI:        https://linkedin.com/in/jamieklapwyk/
 * License:           Apache 2.0
 * License URI:       https://www.apache.org/licenses/LICENSE-2.0.html
 * Text Domain:       autosoftway-pricing-table
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_autosoftway_pricing_table_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_autosoftway_pricing_table_init' );

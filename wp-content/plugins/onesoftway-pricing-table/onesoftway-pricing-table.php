<?php
/**
 * Plugin Name:       OneSoftWay Pricing Table 
 * Description:       The OneSoftWay Pricing Table is a customizable WordPress block plugin that displays feature-rich pricing tables with support for multiple tiers, feature categories, and both USD and CAD prices. It allows easy management of pricing options and feature lists directly within the block editor.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            OneSoftWay
 * Author URI:        https://onesoftway.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       onesoftway-pricing-table
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

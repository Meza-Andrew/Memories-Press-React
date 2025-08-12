<?php

/**
 * Plugin Name: Memories Press Design Builder
 * Description: Enqueues the React/Vite bundle on the “Create” page and injects a #root tag.
 * Version:     1.0.0
 * Author:      Elias Cleveland, Meza LLC
 * Author URI:  https://meza.design
 * Text Domain: memories-press
 */

if (!defined('ABSPATH')) exit;

/**
 * Helper: Are we on the Create page?
 */
function is_builder_page(): bool
{
    return is_page('create');
}

/**
 * Bootstrap (called by the MU loader)
 */
function design_builder_boot()
{

    /**
     * 1) Enqueue scripts & styles after main query is set up.
     */
    add_action('wp', function () {
        if (!is_builder_page()) return;

        $dir = plugin_dir_path(__FILE__);
        $url = plugin_dir_url(__FILE__);

        $assets_path = $dir . 'dist/assets/';
        $assets_url  = $url . 'dist/assets/';

        // JS (auto-detect by Vite’s hashed filename)
        $js_matches = glob($assets_path . 'index*.js');
        if (empty($js_matches)) {
            // No bundle found, nothing to enqueue
            return;
        }
        $js_file = basename($js_matches[0]);

        // CSS (optional)
        $css_matches = glob($assets_path . 'index*.css');
        $css_file = !empty($css_matches) ? basename($css_matches[0]) : null;

        if ($css_file) {
            wp_enqueue_style(
                'design-builder',
                $assets_url . $css_file,
                [],
                @filemtime($assets_path . $css_file) ?: null
            );
        }

        wp_enqueue_script(
            'design-builder',
            $assets_url . $js_file,
            [],
            @filemtime($assets_path . $js_file) ?: null,
            false // load in head for ES module imports to resolve early
        );
    });

    /**
     * 2) Force <script type="module"> for the Vite entry.
     */
    add_filter('script_loader_tag', function ($tag, $handle, $src) {
        if ($handle === 'design-builder') {
            return '<script type="module" src="' . esc_url($src) . '"></script>';
        }
        return $tag;
    }, 10, 3);

    /**
     * 3) Inject a #root container on the Create page if not present.
     *    – Appends #root to the_content
     *    – If you already print #root in the page template, you can remove this.
     */
    add_filter('the_content', function ($content) {
        if (!is_builder_page()) return $content;

        // Avoid duplicating if theme/template already includes #root
        if (strpos($content, 'id="root"') !== false || strpos($content, 'id=\'root\'') !== false) {
            return $content;
        }

        // Append mount point
        $root = '<div id="root"></div>';
        return $content . "\n" . $root;
    }, 20);
}

<?php

function plugce_plugin_admin_menu(){
    add_menu_page('Meus eBooks', 'Meus eBooks', 'manage_options', 'plugce_plugin_init', 'plugce_plugin_init', 'dashicons-book');
}    
add_action('admin_menu', 'plugce_plugin_admin_menu');

function plugce_load_scripts() { 
	wp_enqueue_style( 'bootstrap', plugin_dir_url( __FILE__ ) . 'vendor/bootstrap.min.css', array(), '1.0' );
	wp_enqueue_style( 'pce-css', plugin_dir_url( __FILE__ ) . 'css/plugce-style.css', array(), '1.0' );
	wp_enqueue_script( 'bootstrap', plugin_dir_url( __FILE__ ) . 'vendor/bootstrap.min.js', array(), '1.0', true );
    wp_enqueue_script( 'pce-scripts', plugin_dir_url( __FILE__ ) . 'js/plugce-aplicacao.js', array(), '1.0', true );
}
add_action('admin_enqueue_scripts', 'plugce_load_scripts');

function plugce_get_iframe_ebook($atts){
	$defaults = shortcode_atts( array( 'd' => '' ), $atts );
    $return = "<iframe src='https://www.criarebooks.com.br/embed/book/?d=".$defaults['d']."' name='embed-ce' frameborder='0' scrolling='no' style='width:100%;max-width:100%;height:600px;max-height:600px;'></iframe>";
	return $return;
}
add_shortcode('criar-ebooks','plugce_get_iframe_ebook');

function plugce_plugin_init(){
    include("plugce-create.php");
}

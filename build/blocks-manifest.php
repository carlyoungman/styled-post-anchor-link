<?php
// This file is generated. Do not modify it manually.
return array(
	'styled-post-anchor-link' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'styled-post-anchor-link/styled-post-anchor-link',
		'version' => '0.1.0',
		'title' => 'Styled Post Anchor Link',
		'category' => 'text',
		'icon' => 'SVGIcon',
		'description' => 'Add a styled anchor link to a post.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'styled-post-anchor-link',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'postId' => array(
				'type' => 'number'
			),
			'postTitle' => array(
				'type' => 'string'
			),
			'postUrl' => array(
				'type' => 'string'
			)
		)
	)
);

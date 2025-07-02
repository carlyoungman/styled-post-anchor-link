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
			'color' => array(
				'text' => true,
				'background' => true
			),
			'typography' => array(
				'fontSize' => true,
				'fontWeight' => true,
				'textAlign' => true
			)
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default',
				'isDefault' => true
			),
			array(
				'name' => 'card',
				'label' => 'Card'
			)
		),
		'textdomain' => 'styled-post-anchor-link',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
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
			),
			'textColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => ''
			)
		)
	)
);

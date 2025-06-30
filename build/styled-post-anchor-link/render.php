<?php


if ( ! function_exists( 'render_styled_post_anchor_link_block' ) ) {
	function render_styled_post_anchor_link_block( $attributes ) {
		if ( empty( $attributes['postId'] ) || empty( $attributes['postUrl'] ) || empty( $attributes['postTitle'] ) ) {
			return '';
		}

		$url   = esc_url( $attributes['postUrl'] );
		$title = esc_html( $attributes['postTitle'] );

		return "<p class='dmg-read-more'>Read More: <a href='{$url}'>{$title}</a></p>";
	}
}

register_block_type( __DIR__, [
	'render_callback' => 'render_styled_post_anchor_link_block',
] );

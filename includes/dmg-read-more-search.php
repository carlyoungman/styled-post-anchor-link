<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use WP_CLI\Utils;

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	class Dmg_Read_More_Search_Command {

		/**
		 * Searches published posts for the presence of the styled-post-anchor-link block within a date range.
		 *
		 * @param array $args       Positional arguments (not used).
		 * @param array $assoc_args Associative arguments. Supports 'date-before' and 'date-after' (Y-m-d H:i:s).
		 *
		 * @return void
		 */
		public static function search( array $args, array $assoc_args ): void {
			// Get the date range from arguments or use defaults
			$date_before = $assoc_args['date-before'] ?? current_time( 'mysql' );
			$date_after  = $assoc_args['date-after'] ?? date( 'Y-m-d H:i:s', strtotime( '-30 days' ) );

			\WP_CLI::log( "Searching posts from {$date_after} to {$date_before}..." );

			// Settings
			global $wpdb;
			$batch_size = 1000;
			$offset = 0;
			$found_ids = [];

			// Get total post count for the date range to seed the progress bar. Should remove if performance is an issue.
			$total_sql = $wpdb->prepare(
				"
						SELECT COUNT(*) FROM {$wpdb->posts}
						WHERE post_type = 'post'
						AND post_status = 'publish'
						AND post_date BETWEEN %s AND %s
						",
				$date_after,
				$date_before
			);
			$total = (int) $wpdb->get_var( $total_sql );

			if ( $total === 0 ) {
				\WP_CLI::warning( 'No posts found in that date range.' );
				return;
			}

			$progress = \WP_CLI\Utils\make_progress_bar( 'Scanning posts', $total );

			// Get posts in batches
			do {
				$sql = $wpdb->prepare(
					"
						SELECT ID, post_content FROM {$wpdb->posts}
						WHERE post_type = 'post'
						AND post_status = 'publish'
						AND post_date BETWEEN %s AND %s
						ORDER BY ID ASC
						LIMIT %d OFFSET %d
						",
								$date_after,
								$date_before,
								$batch_size,
								$offset
							);
				$rows = $wpdb->get_results( $sql );

				if ( empty( $rows ) ) {
					break;
				}

				foreach ( $rows as $row ) {
					$progress->tick();
					if ( strpos( $row->post_content, 'styled-post-anchor-link/styled-post-anchor-link' ) !== false ) {
						$found_ids[] = $row->ID;
					}
				}
				$offset += $batch_size;
			} while ( count( $rows ) === $batch_size );
			$progress->finish();
			if ( empty( $found_ids ) ) {
				\WP_CLI::warning( 'No posts found containing the styled-post-anchor-link block in that date range.' );
				return;
			}

			foreach ( $found_ids as $id ) {
				\WP_CLI::log( "PostID: $id" );
			}

			\WP_CLI::success( sprintf( 'Found %d post(s).', count( $found_ids ) ) );
		}
	}
	\WP_CLI::add_command( 'dmg-read-more', [ 'Dmg_Read_More_Search_Command', 'search' ] );
}

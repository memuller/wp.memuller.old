<?php
/**
 * Template part for displaying posts.
 *
 * @package Independent_Publisher_2
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php independent_publisher_2_entry_header(); ?>
	<?php independent_publisher_2_post_thumbnail(); ?>

	<div class="entry-content">
		<?php
			/* translators: %s: Name of current post */
			the_content(
				__( 'Continue reading...', 'independent-publisher-2' )
			);
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'independent-publisher-2' ),
				'after'  => '</div>',
				'link_before' => '<span>',
				'link_after'  => '</span>',
			) );
		?>

		<?php independent_publisher_2_entry_meta(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->

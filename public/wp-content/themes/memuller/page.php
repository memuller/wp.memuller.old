<?php
/**
 * The template for displaying pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 *
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */

 get_header(); ?>


 <div id="page" role="main">

   <?php get_sidebar(); ?>
   <?php do_action( 'foundationpress_before_content' ); ?>
   <?php while ( have_posts() ) : the_post(); ?>
   	<article <?php post_class('main-content') ?> id="post-<?php the_ID(); ?>">
   		<header>
   			<h1 class="entry-title"><?php the_title(); ?></h1>
   			<?php #foundationpress_entry_meta(); ?>
   		</header>
   		<?php do_action( 'foundationpress_post_before_entry_content' ); ?>
   		<div class="entry-content">

   		<?php
   			if ( has_post_thumbnail() ) :
   				the_post_thumbnail();
   			endif;
   		?>

   		<?php the_content(); ?>

   		<?php edit_post_link( __( 'Edit', 'foundationpress' ), '<span class="edit-link">', '</span>' ); ?>
   		</div>
   		<?php //the_post_navigation(); ?>

   		<?php do_action( 'foundationpress_post_before_comments' ); ?>
   		<?php //comments_template(); ?>
   		<?php do_action( 'foundationpress_post_after_comments' ); ?>

   	</article>
   <?php endwhile;?>

   <?php do_action( 'foundationpress_after_content' ); ?>

   </div>
   <?php get_footer();

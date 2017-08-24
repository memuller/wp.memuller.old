=== Independent Publisher 2 ===

Author: Raam Dev
Tags: accessibility-ready, author-bio, classic-menu, custom-background, custom-colors, custom-header, custom-menu, featured-image-header, featured-images, flexible-header, blue, right-sidebar, light, one-column, responsive-layout, sticky-post, theme-options, threaded-comments, translation-ready, two-columns, white, minimal, modern, conservative, blog, journal

Requires at least: 4.5
Tested up to: 4.7
License: GNU General Public License v3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

== Description ==

Independent Publisher 2 is a clean and polished theme with a light color scheme, bold typography, and full-width images. It’s designed to enhance your content and provide an immersive experience for your readers. With a focus on readability, the content looks crisp and easy on the eyes. Independent Publisher 2 is responsive, adjusting its layout to accommodate various devices and screen sizes.

== Custom Header & Featured Images ==

You can personalize your site with a Custom Header, which is used as the background for your site title and tagline. To add your custom header, go to Customize -> Header Image.

Featured Images on single pages and posts will replace any Custom Header.

The best custom header and featured images in Independent Publisher 2 are decorative background images. The
Custom Header and Featured Images that work best with this theme are images that can be cropped differently at different sizes, such as abstract graphics or photographs. The recommended size is 1400 by 600 pixels.

Featured Images and other images greater than 1100px wide will display in a big, bold way, outdented from the surrounding content.

== Gravatar ==

Independent Publisher 2 was built with the personal blogger in mind, so a Gravatar image can be used in the header. By default, the site owner’s Gravatar is displayed.

If you want to display a different Gravatar, go to Customize -> Theme Options and change the Gravatar email address.

If you don't want to display a Gravatar at all, remove the email address from the field completely.

== Estimated Reading Time ==

Independent Publisher 2 displays a convenient estimated reading time for posts, based on a reading speed of 250 words per minute. You can turn off this feature under Customize -> Theme Options and unchecking the box next to "Display estimated reading time on posts".

== Custom Menus ==

Independent Publisher 2 provides support for one Custom Menu, displayed in the header, which can be configured via Customize -> Menus.

You can display links to your social media profiles as icons in the Social Menu. They will appear below the site's title and tagline. Learn how to set it up here: https://en.support.wordpress.com/menus/social-links-menu/

== Supported Social Networks ==

Linking to any of the following sites in the Social Menu will automatically display its icon:

* CodePen
* Digg
* Dribbble
* Dropbox
* Facebook
* Flickr
* GitHub
* Google+
* Instagram
* LinkedIn
* Email (mailto: links)
* Pinterest
* Reddit
* RSS Feed (urls with /feed/)
* StumbleUpon
* Tumblr
* Twitter
* Vimeo
* WordPress
* YouTube

== Widgets

Independent Publisher 2 includes four widget areas: one optional Sidebar, and three Footer areas.

If there are no widgets in the Sidebar area, the theme automatically adjusts to a single column:

== Formatting Text ==

Independent Publisher 2 includes special text styles for pull quotes. See examples and instructions for these on the demo site at https://independentpublisher2demo.wordpress.com/pull-quotes/

== Quick Specs (all measurements in pixels) ==

* The main column width is max 740.
* The Widget Area width is 220.
* Featured Images work best with 1400 wide by 600 high.
* Custom Header Image is 1440 wide by 600 high.


== Installation ==

1. In your admin panel, go to Appearance > Themes and click the Add New button.
2. Click Upload and Choose File, then select the theme's .zip file. Click Install Now.
3. Click Activate to use your new theme right away.

== Credits ==

* [Genericons](http://github.com/Automattic/genericons/) Font by Automattic (http://automattic.com/), licensed under [GPL2](https://www.gnu.org/licenses/gpl-2.0.html).
* [normalize.css](http://necolas.github.io/normalize.css), (C) 2012-2015 Nicolas Gallagher and Jonathan Neal, [MIT](http://opensource.org/licenses/MIT)
* Based on [Underscores](http://underscores.me), (C) 2012-2017 Automattic, Inc., [GPLv2 or later](https://www.gnu.org/licenses/gpl-2.0.html)


== Changelog ==

= 12 July 2017 =
* Changes image width to auto so that it can't be stretched with certain aspect ratios
* Changes the selector from the previous commit to be specific to JetPack

= 27 June 2017 =
* Fix font annotations for .button and .more-link
* Add site-posted-on to the list of elements to hide with Content Options when the date is hidden
* Fix typo in Content Options

= 16 June 2017 =
* Remove a console.log that's outputting the featured image size.

= 8 June 2017 =
* Add JavaScript to trigger resize event if there's a video widget on the site. This makes sure the aspect ratio is correct.

= 30 May 2017 =
* Adjusting post meta styles to prevent gaps when hidden with content options. Minor update to RTL styles to make sure the spacing is correct.

= 1 May 2017 =
* Only outdent images and galleries if no sidebar is present.

= 22 April 2017 =
* Ensure Smarter Featured Images are turned off by default in this theme.

= 11 April 2017 =
* Add readme.txt

= 7 April 2017 =
* Add ability for large images > 1100px wide to overhand the content container on larger screens.

= 29 March 2017 =
* Add option to show/hide the estimated reading time on posts.

= 28 March 2017 =
* Add font smoothing when applying opacity transitions, since these

= 27 March 2017 =
* Add top border to post navigation to help it stand apart from author bio
* Update readme and style.css description
* Ensure pages display proper entry header information.
* Add screen reader text for next/previous post on single post navigation; clean up comment styles, add padding for nested comments.
* Fix arrow positioning on posts navigation
* Give submenu items a hover effect
* Only display categories for posts in search results; don't set a negative left margin on blockquotes in comments.
* Fix link hovers for social links widget without using important.
* Make sure social links in the widget don't have text decoration on hover.
* Display page title with screen reader text when the blog is not the front page.
* Update Custom Header source to use more modern functions and code.
* Add support for selective refresh
* add fonts annotations.

= 24 March 2017 =
* copy colors annotation from previous location

= 23 March 2017 =
* Adding screenshot.png
* Move Footer Widgets up a breakpoint, so they don't go into one column so soon.
* Increase margin between comments meta icon and link a tad
* Give entry meta some breathing room now that we have icons for each type.
* Begin adding icons to entry meta; remove some unused styles for attachments.

= 22 March 2017 =
* Remove unused selector; update margins on headings
* Leave a comment moves after post categories
* Adjust spacing around headings
* Add similar transitions on entry title hover
* Add transitions on link hover for main navigation
* Simplify entry meta into a single function; remove some unused CSS selectors; update wpcom colors to match theme
* Remove unused template part that was refactored into the header.
* Adjustments to padding and spacing around headings and entry author title
* Tweak line height and spacing for Recent Posts widget
* Style tweaks for specific widgets; increase top margin on site description
* Add max-width of 740px to main site area
* Add RTL styles
* Increase top margin on custom menu when a header image is active.

= 21 March 2017 =
* More work on pull quotes for mobile and large screens
* Adjust aligned blockquotes ("pullquotes") for mobile devices
* Reduce padding on pullquotes and site footer for small screens
* Reduce top footer padding on mobile
* Adjust author bio layout on small screens
* REmoved fade effect from header;
* Tweaks to submenu spacing

= 20 March 2017 =
* Make sure to check for singular featured images after header image
* UPdate tags in style.css
* Minor tweaks to comment author spacing
* Main nav links don't need to be white on large screens now
* Prevent main navigation from overflowing on narrow screens
* Improvements to mobile menu experience
* Make sure third level of menu items are accessible; hover behavior was flaky

= 17 March 2017 =
* Add Headstart annotation; tweak logic for estimated reading time to say "Less than a minute" for any articles that take less than a minute.
* Add POT file
* Minor style tweaks
* Move menu outside faded area on scroll; remove editor styles, we don't use them for Calypso.
* Sort CSS properties; remove sliding menu, replace with standard drop-down menu.

= 16 March 2017 =
* Minor style tweaks
* Only check for post covers on single posts or pages
* Tweaks to related posts styles
* Better styles for author bio and related posts
* Begin styling related posts
* Initial commit to repo

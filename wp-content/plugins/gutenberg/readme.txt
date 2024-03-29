=== Gutenberg ===
Contributors: matveb, joen, karmatosed
Requires at least: 4.8
Tested up to: 4.8
Stable tag: trunk
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Block editor for WordPress. This is the development plugin for the new block editor in core. Warning: This is beta software, do not run on real sites!

== Description ==

The goal of the block editor is to make adding rich content to WordPress simple and enjoyable.

<strong>Warning: This is beta software, do not run on production sites!</strong>

The new post and page building experience will make writing rich posts effortless, making it easy to do what today might take shortcodes, custom HTML, or "mystery meat" embed discovery.

WordPress already supports a large amount of "blocks", but doesn't surface them very well, nor does it give them much in the way of layout options. By embracing the blocky nature of rich post content, we will surface the blocks that already exist, as well as provide more advanced layout options for each of them. This will allow you to easily compose beautiful posts like <a href="http://moc.co/sandbox/example-post/">this example</a>.

Gutenberg is built by many contributors and volunteers. You can see the full list of contributors in <a href="https://github.com/WordPress/gutenberg/blob/master/CONTRIBUTORS.md">the GitHub CONTRIBUTORS.md file</a> which we are continuously updating. You can follow along on <a href="https://github.com/WordPress/gutenberg">github.com/WordPress/gutenberg</a> and on the <a href="https://make.wordpress.org/core/tag/editor/">#editor tag on the make.wordpress.org blog</a>.

== Frequently Asked Questions ==

= How can I send feedback or get help with a bug? =

We'd love to hear your bug reports, feature suggestions and any other feedback! Please head over to <a href="https://github.com/WordPress/gutenberg/issues">the GitHub issues page</a> to search for existing issues or open a new one. While we'll try to triage issues reported here on the plugin forum, you'll get a faster response (and reduce duplication of effort) by keeping everything centralized in the GitHub repository.

= How can I contribute? =

The more the merrier! To get started, check out our <a href="https://github.com/WordPress/gutenberg/blob/master/CONTRIBUTING.md">guide for contributors</a>.

== Changelog ==

= 1.1.0 =

* Add blocks "slash" autocomplete—shortcut to continue adding new block without leaving the keyboard.
* Add ability to remove an image from a gallery from within the block (selecting image).
* Add option to open a created link in a new window.
* Support and bootstrap server-registered block attribute schemas.
* Improve accessibility of add-new-category form.
* Documentation gets an updated design and content improvements.
* Adjust column width calculation in gallery block to properly respect column count.
* Move pending review control together with sticky toggle at the bottom.
* Add caption styling for video block.
* Allow removing a "classic text" block with backspaces.
* Allow Button block to show placeholder text.
* Drop the deprecated button-secondary class name.
* Fix link dialog not showing in Safari when caret is in the middle of the word.
* Fix adding new categories and position newly added term at the top.
* Fix the resetting of drop-zone states after dropping a file.
* Fix embed saving "undefined" text when URL is not set.
* Fix placeholder styling on Text when background color is set.
* Update Composer + PHPCS.
* Rename default block handlers.
* Update code syntax tabs in docutron.
* Link to plugin download and github repo from docutron.
* Added block API document.
* Add "Edit and Save" document.

= 1.0.0 =
* Restored keyboard navigation with more robust implementation, addressing previous browser issues.
* Added drag and drop for media with pointer to create new blocks.
* Merged paragraph and cover text blocks (includes the colors and font size options).
* Reworked color palette picker with a "clear" and a "custom color" option.
* Further improvements to inline pasting and fixing errant empty blocks.
* Added thumbnail size selector to image blocks.
* Added support for url input and align and edit buttons to audio block.
* Persist the state of the sidebar across page refresh.
* Persist state of sidebar panels on page refresh.
* Persist editor mode on page refresh.
* New withAPIData higher-order component for making it easier to manage data needs.
* Preserve unknown block and remove "freeform" comment delimiters (unrecognized HTML is handled without comment delimiters).
* Show "add new term" in hierarchical taxonomies (including categories).
* Show tooltip only after mouseover delay.
* Show post formats only if the post type supports them.
* Added align and edit buttons to video block.
* Preload data in withApiData to improve perceived performance.
* Improve accessibility of sidebar modes.
* Allow changing cover-image settings before uploading an image.
* Improve validation leniency around non-meaningful differences.
* Take into account capabilities for publishing action.
* Update author selector to show only users capable of authoring posts.
* Normalize pasted blockquote contents.
* Refactored featured image, page attributes to use withApiData
* Added a fix to avoid cloning nodes by passing pasted HTML string.
* Added a fix to avoid re-encoding on encoded posts.
* Fixed resetting the focus config when block already selected.
* Allowing adding of plain text after insert link at the end of a paragraph.
* Update to latest TinyMCE version.
* Show only users capable of authoring posts.
* Add submit for review to publish for contributor.
* Delete or backspace in an empty "classic text" block now removes it.
* Check for type in block transformations logic.
* Fixed drop-down menu issue on classic text.
* Added filter to allow post types to disable "edit in gutenberg" links.
* Made UrlInput and UrlInputButton available as reusable components.
* Use wordpress/a11y package instead of global.
* Added npm5 package-lock.
* We welcome all your feedback and contributions on the project repository, or ping us in #core-editor. Follow the "gutenberg" tag for past updates.

= 0.9.0 =
* Added ability to change font-size in cover text using slider and number input.
* Added support for custom anchors (ids) on blocks, allowing to link directly to a section of the post.
* Updated pull-quote design.
* Created custom color palette component with "clear" option and "custom color" option. (And better markup and accessibility.)
* Improve pasting: recognizing more elements, adding tests, stripping non-semantic markup, etc.
* Improve gallery visual design and fix cropping in Safari.
* Allow selecting a heading block from the table-of-contents panel directly.
* Make toolbar slide horizontally for mobile.
* Improve range-input control with a number input.
* Fix pasting problems (handling of block attributes).
* More stripping of unhandled elements during paste.
* Show post format selector only for posts.
* Display nicer URLs when editing links.
* More compact save indicator.
* Disabled arrow key navigation between blocks as we refine implementation.
* Removed blank target from "view post" in notices.
* Fix empty links still rendering ont he front-end.
* Fix shadow on inline toolbars.
* Fix problem with inserting pull-quotes.
* Fix drag and drop on image block.
* Removed warning when publishing.
* Don't provide version for vendor scripts.
* Clean category code in block registration.
* Added history and resources docs.

= 0.8.0 =
* New Categories Block (based on existing widget).
* New Text Columns Block (initial exploration of text-only multiple columns).
* New Video Block.
* New Shortcode Block.
* New Audio Block.
* Added resizing handlers to Image Block.
* Added direct image upload button to Image Block and Gallery Block.
* Give option to transform a block to Classic when it encounters problems.
* Give option to Overwrite changes on a block detected as invalid.
* Added "link to" option in galleries.
* Added support for custom taxonomies.
* Added post formats selector to post settings.
* Added keywords support (aliases) to various blocks to improve search discovery.
* Significant improvements to the way attributes are specified in the Block API and its clarity (handles defaults and types).
* Added Tooltip component displaying aria-labels from buttons.
* Removed stats tracking code.
* Updated design document.
* Capture and recover from block rendering runtime errors.
* Handle enter when focusing on outer boundary of a block.
* Reduce galleries json attributes data to a minimum.
* Added caption styles to the front-end for images and embeds.
* Added missing front-end alignment classes for table and cover-text blocks.
* Only reset blocks on initial load to prevent state fluctuations.
* Improve calculation of dirty state by making a diff against saved post.
* Improve visual weight of toolbar by reducing its silhouette.
* Improve rendering of galleries on the front-end.
* Improve Cover Image placeholder visual presentation.
* Improve front-end display of quotes.
* Improve responsive design of galleries on the front-end.
* Allow previewing new posts that are yet to be saved.
* Reset scrolling position within inserter when switching tabs.
* Refactor popover to render at root of document.
* Refactor withFocusReturn to handle accessibility better in more contexts.
* Prevent overlap between multi-selection and within-block selection.
* Clear save notices when triggering a new save.
* Disable "preview" button if post is not saveable.
* Renamed blocks.query to blocks.source for clarity and updated documentation.
* Rearrange block stylesheets to reflect display and editor styles.
* Use @wordpress dependencies consistently.
* Added validation checks for specifying a block's category.
* Fix problems with quote initialization and list transformation.
* Fix issue where Cover Image was being considered invalid after edits.
* Fix errors in editable coming from Table block commands.
* Fix error in latest posts block when date is not set for a post.
* Fix issue with active color in ColorPalette component.
* Prevent class=false serialization issue in covert-text.
* Treat range control value as numeric.
* Added warning when using Editable and passing non-array values.
* Show block switcher above link input.
* Updated rememo dependency.
* Start consuming from separate @wordpress dependencies.
* Fix problem with inserting new galleries.
* Fix issue with embeds and missing captions.
* Added outreach section to docs.

= 0.7.1 =
* Address problem with the freeform block and Jetpack's contact form.

= 0.7.0 =
* Hide placeholders on focus—reduces visual distractions while writing.
* Add PostAuthor dropdown to the UI.
* Add theme support for customized color palettes and a shared component (applies to cover text and button blocks).
* Add theme support for wide images.
* Report on missing headings in the document outline feature.
* Update block validation to make it less prone to over-eagerness with trivial changes (like whitespace and new lines).
* Attempt to create an embed block automatically when pasting URL on a single line.
* Save post before previewing.
* Improve operations with "lists", enter on empty item creates new paragraph block, handling backspace, etc.
* Don't serialize attributes that match default attributes.
* Order link suggestions by relevance.
* Order embeds for easier discoverability.
* Added "keywords" property for searching blocks with aliases.
* Added responsive styles for Table block in the front end.
* Set default list type to be unordered list.
* Improve accessibility of UrlInput component.
* Improve accessibility and keyboard interaction of DropdownMenu.
* Improve Popover component and use for PostVisibility.
* Added higher order component for managing spoken messages.
* Localize schema for WP API, avoiding initialization delay if schema is present.
* Do not expose editor.settings to block authors.
* Do not remove tables on pasting.
* Consolidate block server-side files with client ones in the same directory.
* Removed array of paragraphs structure from text block.
* Trim whitespace when searching for blocks.
* Document, test, and refactor DropdownMenu component.
* Use separate mousetrap instance per component instance.
* Add npm organization scope to WordPress dependencies.
* Expand utilities around fixture regeneration.
* Renamed "Text" to "Paragraph".
* Fix multi-selection "delete" functionality.
* Fix text color inline style.
* Fix issue caused by changes with React build process.
* Fix splitting editable without child nodes.
* Use addQueryArgs in oEmbed proxy url.
* Update dashicons with new icons.
* Clarify enqueuing block assets functions.
* Added code coverage information to docs.
* Document how to create new docs.
* Add example of add_theme_support in docs.
* Added opt-in mechanism for learning what blocks are being added to the content.

= 0.6.0 =
* Split paragraphs on enter—we have been exploring different behaviours here.
* Added grid layout option for latest posts with columns slider control.
* Show internal posts / pages results when creating links.
* Added "Cover Text" block with background, text color, and full-width options.
* Autosaving drafts.
* Added "Read More" block.
* Added color options to the button block.
* Added mechanism for validating and protecting blocks that may have suffered unrecognized edits.
* Add patterns plugin for text formatting shortcuts: create lists by adding * at the beginning of a text line, use # to create headings, and backticks for code.
* Implement initial support for Cmd/Ctrl+Z (undo) and Cmd/Ctrl+Shift+Z (redo).
* Improve pasting experience from outside editors by transforming content before converting to blocks.
* Improve gallery creation flow by opening into "gallery" mode from placeholder.
* Added page attributes with menu order setting.
* Use two distinct icons for quote style variations.
* Created KeyboardShortcuts component to handle keyboard events.
* Add support for custom icons (non dashicons) on blocks.
* Initialize new posts with auto-draft to match behaviour of existing editor.
* Don't display "save" button for published posts.
* Added ability to set a block as "use once" only (example: "read more" block).
* Hide gallery display settings in media modal.
* Simplify "cover image" markup and resolve conflict state in demo.
* Introduce PHP classes for interacting with block types.
* Announce block search results to assistive technologies.
* Reveal "continue writing" shortcuts on focus.
* Update document.title when the post title changes.
* Added focus styles to several elements in the UI.
* Added external-link component to handle links opening in new tabs or windows.
* Improve responsive video on embed previews.
* Improve "speak" messages for tag suggestions.
* Make sure newly created blocks are marked as valid.
* Preserve valid state during transformations.
* Allow tabbing away from table.
* Improve display of focused panel titles.
* Adjust padding and margins across various design elements for consistency and normalization.
* Fix pasting freeform content.
* Fix proper propagation of updated block attributes.
* Fix parsing and serialization of multi-paragraph pullquotes.
* Fix a case where toggling pending preview would consider post as saved.
* Fix positioning of block mover on full-width blocks.
* Fix line height regression in quote styles.
* Fix IE11 with polyfill for fetch method.
* Fix case where blocks are created with isTyping and it never clears.
* Fix block warning display in IE11.
* Polish inspector visual design.
* Prevent unhandled actions from returning new state reference.
* Prevent unintentionally clearing link input value.
* Added focus styles to switch toggle components.
* Avoid navigating outside the editor with arrow keys.
* Add short description to Verse block.
* Initialize demo content only for new demo posts.
* Improve insert link accessibility.
* Improve version compare checks for plugin compatibility.
* Clean up obsolete poststoshowattribute in LatestPosts block.
* Consolidate addQueryArgs usage.
* Add unit tests to inserter.
* Update fixtures with latest modifications and ensure all end in newlines.
* Added codecov for code coverage.
* Clean up JSDoc comments.
* Link to new docs within main readme.

= 0.5.0 =
* New tabs mode for the sidebar to switch between post settings and block inspector.
* Implement recent blocks display.
* Mobile implementation of block mover, settings, and delete actions.
* Search through all tabs on the inserter and hide tabs.
* New documentation app to serve all tutorials, faqs, docs, etc.
* Enable ability to add custom classes to blocks (via inspector).
* Add ability to drag-and-drop on image block placeholders to upload images.
* Add "table of contents" document outline for headings (with empty heading validation).
* Refactor tests to use Jest API.
* New block: Verse (intended for poetry, respecting whitespace).
* Avoid showing UI when typing and starting a new paragraph (text block).
* Display warning message when navigating away from the editor with unsaved changes.
* Use old editor as "freeform".
* Improve PHP parser compatibility with different server configurations ("mbstring" extension and PCRE settings).
* Improve PostVisibility markup and accessibility.
* Add shortcuts to manage indents and levels in List block.
* Add alignment options to latest posts block.
* Add focus styles for quick tags buttons in text mode.
* Add way to report PHP parsing performance.
* Add labels and roles to UrlInput.
* Add ability to set custom placeholders for text and headings as attributes.
* Show error message when trashing action fails.
* Pass content to dynamic block render functions in PHP.
* Fix various z-index issues and clarify reasonings.
* Fix DropdownMenu arrows navigation and add missing aria-label.
* Update sandboxed iframe size calculations.
* Export inspector controls component under wp.blocks.
* Adjust Travis JS builds to improve task allocation.
* Fix warnings during tests.
* Fix caret jumping when switching formatting in Editable.
* Explicitly define prop-types as dependency.
* Update list of supported browsers for consistency with core.

= 0.4.0 =
* Initial FAQ (in progress).
* API for handling pasted content. (Aim is to have specific handling for converting Word, Markdown, Google Docs to native WordPress blocks.)
* Added support for linking to a url on image blocks.
* Navigation between blocks using arrow keys.
* Added alternate Table block with TinyMCE functionality for adding/removing rows/cells, etc. Retired previous one.
* Parse more/noteaser comment tokens from core.
* Re-engineer the approach for rendering embed frames.
* First pass at adding aria-labels to blocks list.
* Setting up Jest for better testing environment.
* Improve performance of server-side parsing.
* Update blocks documentation with latest API functions and clearer examples.
* Use fixed position for notices.
* Make inline mode the default for Editable.
* Add actions for plugins to register frontend and editor assets.
* Supress gallery settings sidebar on media library when editing gallery.
* Validate save and edit render when registering a block.
* Prevent media library modal from opening when loading placeholders.
* Update to sidebar design and behaviour on mobile.
* Improve font-size in inserter and latest posts block.
* Improve rendering of button block in the front end.
* Add aria-label to edit image button.
* Add aria-label to embed input url input.
* Use pointer cursor for tabs in inserter.
* Update design docs with regard to selected/unselected states.
* Improve generation of wp-block-* classes for consistency.
* Select first cell of table block when initializing.
* Fix wide and full alignment on the front-end when images have no caption.
* Fix initial state of freeform block.
* Fix ability to navigate to resource on link viewer.
* Fix clearing floats on inserter.
* Fix loading of images in library.
* Fix auto-focusing on table block being too agressive.
* Clean double reference to pegjs in dependencies.
* Include messages to ease debugging parser.
* Check for exact match for serialized content in parser tests.
* Add allow-presentation to fix issue with sandboxed iframe in Chrome.
* Declare use of classnames module consistently.
* Add translation to embed title.
* Add missing text domains and adjust PHPCS to warn about them.
* Added template for creating new issues including mentions of version number.

= 0.3.0 =
* Added framework for notices and implemented publishing and saving ones.
* Implemented tabs on the inserter.
* Added text and image quick inserts next to inserter icon at the end of the post.
* Generate front-end styles for core blocks and enqueue them.
* Include generated block classname in edit environment.
* Added "edit image" button to image and cover image blocks.
* Added option to visually crop images in galleries for nicer alignment.
* Added option to disable dimming the background in cover images.
* Added buffer for multi-select flows.
* Added option to display date and to configure number of posts in LatestPosts block.
* Added PHP parser based on PEG.js to unify grammars.
* Split block styles for display so they can be loaded on the theme.
* Auto-focusing for inserter search field.
* Added text formatting to CoverImage block.
* Added toggle option for fixed background in CoverImage.
* Switched to store attributes in unescaped JSON format within the comments.
* Added placeholder for all text blocks.
* Added placeholder text for headings, quotes, etc.
* Added BlockDescription component and applied it to several blocks.
* Implemented sandboxing iframe for embeds.
* Include alignment classes on embeds with wrappers.
* Changed the block name declaration for embeds to be "core-embed/name-of-embed".
* Simplified and made more robust the rendering of embeds.
* Different fixes for quote blocks (parsing and transformations).
* Improve display of text within cover image.
* Fixed placeholder positioning in several blocks.
* Fixed parsing of HTML block.
* Fixed toolbar calculations on blocks without toolbars.
* Added heading alignments and levels to inspector.
* Added sticky post setting and toggle.
* Added focus styles to inserter search.
* Add design blueprints and principles to the storybook.
* Enhance FormTokenField with accessibility improvements.
* Load word-count module.
* Updated icons for trash button, and Custom HTML.
* Design tweaks for inserter, placeholders, and responsiveness.
* Improvements to sidebar headings and gallery margins.
* Allow deleting selected blocks with "delete" key.
* Return more than 10 categories/tags in post settings.
* Accessibility improvements with FormToggle.
* Fix media button in gallery placeholder.
* Fix sidebar breadcrumb.
* Fix for block-mover when blocks are floated.
* Fixed inserting Freeform block (now classic text).
* Fixed missing keys on inserter.
* Updated drop-cap class implementation.
* Showcasing full-width cover image in demo content.
* Copy fixes on demo content.
* Hide meta-boxes icons for screen readers.
* Handle null values in link attributes.

= 0.2.0 =
* Include "paste" as default plugin in Editable.
* Extract block alignment controls as a reusable component.
* Added button to delete a block.
* Added button to open block settings in the inspector.
* New block: Custom HTML (to write your own HTML and preview it).
* New block: Cover Image (with text over image support).
* Rename "Freeform" block to "Classic Text".
* Added support for pages and custom post types.
* Improve display of "saving" label while saving.
* Drop usage of controls property in favor of components in render.
* Add ability to select all blocks with ctrl/command+A.
* Automatically generate wrapper class for styling blocks.
* Avoid triggering multi-select on right click.
* Improve target of post previewing.
* Use imports instead of accessing the wp global.
* Add block alignment and proper placeholders to pullquote block.
* Wait for wp.api before loading the editor. (Interim solution.)
* Adding several reusable inspector controls.
* Design improvements to floats, switcher, and headings.
* Add width classes on figure wrapper when using captions in images.
* Add image alt attributes.
* Added html generation for photo type embeds.
* Make sure plugin is run on WP 4.8.
* Update revisions button to only show when there are revisions.
* Parsing fixes on do_blocks.
* Avoid being keyboard trapped on editor content.
* Don't show block toolbars when pressing modifier keys.
* Fix overlapping controls in Button block.
* Fix post-title line height.
* Fix parsing void blocks.
* Fix splitting inline Editable instances with shift+enter.
* Fix transformation between text and list, and quote and list.
* Fix saving new posts by making post-type mandatory.
* Render popovers above all elements.
* Improvements to block deletion using backspace.
* Changing the way block outlines are rendered on hover.
* Updated PHP parser to handle shorthand block syntax, and fix newlines.
* Ability to cancel adding a link from link menu.

= 0.1.0 =
* First release of the plugin.

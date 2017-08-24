/**
 * This file holds The SEO Framework Extension Manager plugin's JS code.
 * Serve JavaScript as an addition, not as an ends or means.
 *
 * @author Sybre Waaijer https://cyberwire.nl/
 * @link https://wordpress.org/plugins/the-seo-framework-extension-manager/
 */

/**
 * The SEO Framework - Extension Manager plugin
 * Copyright (C) 2016-2017 Sybre Waaijer, CyberWire (https://cyberwire.nl/)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published
 * by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @language ECMASCRIPT6_STRICT
// @language_out ECMASCRIPT5_STRICT
// @output_file_name tsfem.min.js
// @externs_url https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/jquery-1.9.js
// @externs_url https://raw.githubusercontent.com/sybrew/The-SEO-Framework-Extension-Manager/master/lib/js/externs/tsfem.externs.js
// ==/ClosureCompiler==
// http://closure-compiler.appspot.com/home

'use strict';

/**
 * Holds tsfem values in an object to avoid polluting global namespace.
 *
 * @since 1.0.0
 *
 * @constructor
 */
window.tsfem = {

	/**
	 * @since 1.0.0
	 * @access private
	 * @type {string|null} nonce Ajax nonce
	 */
	nonce : tsfemL10n.nonce,

	/**
	 * @since 1.0.0
	 * @access private
	 * @param {object|null} i18n Localized strings
	 */
	i18n : tsfemL10n.i18n,

	/**
	 * @since 1.0.0
	 * @since 1.3.0 Now public.
	 * @access public
	 * @param {boolean|undefined|null} rtl RTL enabled
	 */
	rtl : tsfemL10n.rtl,

	/**
	 * @since 1.0.0
	 * @since 1.3.0 Now public.
	 * @access public
	 * @param {boolean|undefined|null} debug Debugging enabled
	 */
	debug : tsfemL10n.debug,

	/**
	 * @since 1.0.0
	 * @since 1.3.0 Now public.
	 * @access public
	 * @param {boolean} touchBuffer Maintains touch-buffer
	 */
	touchBuffer : false,

	/**
	 * @since 1.3.0
	 * @access private
	 * @param {boolean} noticeBuffer Maintains notice loader buffer
	 */
	noticeBuffer : false,

	/**
	 * @since 1.3.0
	 * @access private
	 * @param {boolean} navWarn Whether to warn the user on navigation.
	 */
	navWarn : false,

	/**
	 * Sets touch buffer to set ms. After which it resets.
	 *
	 * @since 1.0.0
	 * @since 1.3.0 Now public.
	 * @access public
	 *
	 * @function
	 * @param {number} ms The touch buffer in miliseconds.
	 * @return {undefined}
	 */
	setTouchBuffer: function( ms ) {

		tsfem.touchBuffer = true;

		setTimeout( function() {
			tsfem.touchBuffer = false;
		}, ms );
	},

	/**
	 * Initializes the description balloon hover and click actions.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @function
	 * @return {undefined}
	 */
	initDescHover: function() {

		let elem = '.tsfem-has-hover-balloon',
			$item = jQuery( elem );

		/**
		 * Clear all handlers and callbacks, prevent action stack. Yes, also third party callbacks.
		 * There's a change for a bug through plugin conflict, although extremely low.
		 * Why would other plugins even start interfering with the namespaced description elements?
		 */
		$item.off( 'mouseenter mousemove mouseleave mouseout' );
		$item.children( '*' ).off( 'mouseenter mousemove mouseleave' );

		//* Clear body handler + callback.
		jQuery( document.body ).off( 'click touchstart MSPointerDown', tsfem.touchLeaveDescHover );

		//* Force delagation.
		$item.children( '*' ).on( {
			mouseenter: function( event ) {
				jQuery( event.target ).parents( elem ).trigger( 'mouseenter' );
			},
			mousemove: function( event ) {
				jQuery( event.target ).parents( elem ).trigger( 'mousemove', event.pageX );
			},
			mouseleave: function( event ) {
				jQuery( event.target ).parents( elem ).trigger( 'mouseleave' );
			},
		} );

		/**
		 * mouseout is required for when hovering through the balloon on non-bubbled items.
		 * mouseleave is in favor of mouseout for bubbled and/or propagated items to prevent flickering.
		 */
		$item.on( {
			'mouseenter' : tsfem.enterDescHover,
			'mousemove'  : tsfem.moveDescHover,
			'mouseleave' : tsfem.leaveDescHover,
			'mouseout'   : tsfem.leaveDescHover,
		} );

		jQuery( document.body ).on( 'click touchstart MSPointerDown', tsfem.touchLeaveDescHover );
	},

	/**
	 * Animates the description balloon and arrow on mouse or touch enter.
	 *
	 * @since 1.0.0
	 * @since 1.3.0 : 1. Now adds indentation, when possible.
	 *                2. Now checks top collision, with scrollchecking, when possible.
	 * @access private
	 *
	 * @function
	 * @param {jQuery.event} event jQuery event
	 * @return {(boolean|undefined)} false If event is propagated.
	 */
	enterDescHover: function( event ) {

		let $item = jQuery( event.target );

		if ( ! $item.hasClass( 'tsfem-has-hover-balloon' ) )
			return false;

		let desc = $item.data( 'desc' );

		// Remove default browser title behavior as this replaces it.
		desc && $item.removeAttr( 'title' );

		return tsfem.doTooltip( $item, desc );
	},

	/**
	 * Loads tooltip.
	 *
	 * @since 1.3.0 : 1. Now adds indentation, when possible.
	 *                2. Now checks top collision, with scrollchecking, when possible.
	 * @access public
	 *
	 * @function
	 * @param {Element} element
	 * @param {string} desc
	 * @return {undefined}
	 */
	doTooltip: function( element, desc ) {

		let $item = jQuery( element ),
			hasBalloon = $item.next( '.tsfem-desc-balloon' ).length || $item.children( '.tsfem-desc-balloon' ).length;

		if ( hasBalloon ) {
			tsfem.removeTooltip( element );
		}

		// Only run if a desc is present and no balloon has yet been added.
		if ( desc ) {

			$item.append( '<div class="tsfem-desc-balloon"><span>' + desc + '</span><div></div></div>' );

			let $balloon = $item.children( '.tsfem-desc-balloon' ),
				itemHeight = $item.outerHeight() + 8,
				$wrap = $balloon.closest( '.tsfem-pane-content' ),
				$scroller = $wrap.children( '.tsfem-pane-inner-wrap' );

			//= 3 = Shadow illusion padding. So it will not "stick".
			if ( $wrap.length && ( ( $wrap.offset().top - ( $scroller.prop( 'scrollTop' ) || 0 ) ) > $balloon.offset().top - itemHeight - 3 ) ) {
				$balloon.addClass( 'tsfem-desc-balloon-down' );
				$balloon.css( 'top', itemHeight + 'px' );
			} else {
				$balloon.css( 'bottom', itemHeight + 'px' );
			}

			let $text = $balloon.children( 'span' );

			if ( $wrap.length ) {
				/**
				 * Fix overflow right. To fix left we'd have to substract width.
				 * But that's not needed, yet.
				 * 20 = balloon padding
				 */
				let wrapOffset = $wrap.offset().left + $wrap.outerWidth(),
					textOffset = $text.offset().left + $text.outerWidth(),
					overflown  = tsfem.rtl ? textOffset < $text.width() : textOffset > ( wrapOffset - 20 );

				if ( overflown ) {
					let left = tsfem.rtl ? 'right' : 'left',
						offset = tsfem.rtl ? - ( textOffset + 20 ) : ( wrapOffset - textOffset - 20 );

					$balloon.css( left, offset + 'px' );
				} else {
					// Add 15 extra indent if the caller is very small to make it look more natural.
					let setIndent = $item.width() < 42;

					if ( setIndent ) {
						// This check is opposite as of before, as we're fixing overflow left now.
						let indent = 15,
							indentOverflown = tsfem.rtl ? wrapOffset < ( textOffset + indent ) : $wrap.offset().left > ( $text.offset().left - indent );

						if ( ! indentOverflown ) {
							$balloon.css( ( tsfem.rtl ? 'right' : 'left' ), - indent + 'px' );
						}
					}
				}
			}
		}
	},

	/**
	 * Removes the description balloon and arrow from element.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @function
	 * @param {Element} element
	 * @return {undefined}
	 */
	removeTooltip: function( element ) {
		tsfem.getTooltip( element ).remove();
	},

	/**
	 * Returns the description balloon node form element.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @function
	 * @param {Element} element
	 * @return {jQuery.element}
	 */
	getTooltip: function( element ) {
		return jQuery( element ).find( '.tsfem-desc-balloon' ).first();
	},

	/**
	 * Animates the description balloon arrow on mouse move.
	 *
	 * @since 1.0.0
	 * @access private
	 * TODO compare this with TSF, I believe it has a bugfix.
	 *
	 * @function
	 * @param {object} event jQuery event
	 * @param {number} pageX Page X location from trigger.
	 * @return {(boolean|undefined)} false If event is propagated.
	 */
	moveDescHover: function( event, pageX ) {

		let $item = jQuery( event.target );

		if ( ! $item.hasClass( 'tsfem-has-hover-balloon' ) )
			return false;

		let desc = $item.data( 'desc' );

		if ( desc ) {
			let $balloon = $item.children( '.tsfem-desc-balloon' ),
				$text = $balloon.children( 'span' );

			if ( 0 === $text.length )
				return;

			let $arrow = $balloon.children( 'div' ),
				halfArrow = $arrow.outerWidth() / 2,
				cpageX = pageX ? pageX : event.pageX,
				textOffset = $text.offset().left,
				mousex = cpageX - textOffset - halfArrow,
				left = tsfem.rtl ? 'right' : 'left';

			if ( mousex < 1 ) {
				let leftSide = tsfem.rtl ? $text.width() : 0;
				// Overflown left.
				$arrow.css( left, leftSide + 'px' );
			} else {
				let width = $text.outerWidth(),
					maxOffset = textOffset + width - halfArrow,
					overflown = cpageX > maxOffset;

				if ( overflown ) {
					// Overflown right.
					let rightSide = tsfem.rtl ? 0 : $text.width();

					$arrow.css( left, rightSide + "px" );
				} else {
					// In-between.
					let difference = tsfem.rtl ? - $text.width() : ( ( width - $text.width() ) / 2 ) - halfArrow,
						offset = tsfem.rtl ? - ( mousex + difference ) : mousex + difference;

					$arrow.css( left, offset + "px" );
				}
			}
		}
	},

	/**
	 * Removes the description balloon and arrow on mouse leave.
	 *
	 * @since 1.0.0
	 * @access private
	 * @since 1.3.0 Removed race condition check, this is handled by jQuery
	 *
	 * @function
	 * @param {jQuery.event} event jQuery event
	 * @return {undefined}
	 */
	leaveDescHover: function( event ) {
		jQuery( event.target ).find( '.tsfem-desc-balloon' ).remove();
	},

	/**
	 * Removes the description balloon and arrow at aside touches or clicks.
	 *
	 * @since 1.0.0
	 * @access private
	 * TODO iOS bugfix: can't fetch balloon anymore on remove (unless clicked on other target).
	 *
	 * @function
	 * @param {jQuery.event} event jQuery event
	 * @return {undefined}
	 */
	touchLeaveDescHover: function( event ) {

		if ( tsfem.touchBuffer )
			return;

		tsfem.setTouchBuffer( 200 );

		if ( jQuery( '.tsfem-desc-balloon' ).length ) {
			if ( ! jQuery( event.target ).closest( '.tsfem-has-hover-balloon' ).length ) {
				jQuery( '.tsfem-has-hover-balloon' ).find( '.tsfem-desc-balloon' ).remove();
			}
		}
	},

	/**
	 * Visualizes AJAX loading time through target class change.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @function
	 * @param {(jQuery.element|Element|string)} arg1
	 * @return {undefined}
	 */
	setAjaxLoader: function( target ) {
		jQuery( target ).toggleClass( 'tsfem-loading' );
	},

	/**
	 * Adjusts class loaders on Ajax response.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @function
	 * @param {(jQuery.element|Element|string)} arg1
	 * @param {number} success
	 * @param {string} notice
	 * @param {number} html
	 * @return {undefined}
	 */
	unsetAjaxLoader: function( target, success, notice, html ) {

		let newclass = 'tsfem-success',
			fade = 2500;

		if ( ! success ) {
			newclass = 'tsfem-error';
			fade = html ? 20000 : 10000;
		} else if ( 2 === success ) {
			newclass = 'tsfem-unknown';
			fade = 7500;
		}

		//* Slow down if there's a notice.
		fade = notice ? fade * 2 : fade;

		if ( html ) {
			jQuery( target ).removeClass( 'tsfem-loading' ).addClass( newclass ).html( notice ).fadeOut( fade );
		} else {
			notice = jQuery( '<span/>' ).html( notice ).text();
			jQuery( target ).removeClass( 'tsfem-loading' ).addClass( newclass ).text( notice ).fadeOut( fade );
		}
	},

	/**
	 * Cleans and resets Ajax wrapper class and contents to default.
	 * Also stops any animation and resets fadeout to beginning.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @function
	 * @param {(jQuery.element|Element|string)} arg1
	 * @return {undefined}
	 */
	resetAjaxLoader: function( target ) {
		//* Reset CSS, with IE compat.
		jQuery( target ).stop().empty().prop( 'class', 'tsfem-ajax' ).css( { 'opacity' : '1', 'display' : 'initial' } ).prop( 'style', '' );
	},

	/**
	 * Updates the feed option.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @function
	 * @param {jQuery.event} event
	 * @return {undefined}
	 */
	updateFeed: function( event ) {

		let disabled = 'tsfem-button-disabled',
			$button = jQuery( event.target ),
			loader = '#tsfem-feed-ajax',
			status = 0;

		if ( $button.prop( 'disabled' ) )
			return;

		$button.addClass( disabled );
		$button.prop( 'disabled', true );

		//* Reset ajax loader
		tsfem.resetAjaxLoader( loader );

		//* Set ajax loader.
		tsfem.setAjaxLoader( loader );

		let unknownError = function() {
			$button.removeClass( disabled );
			$button.prop( 'disabled', false );
			tsfem.updatedResponse( loader, status, tsfem.i18n['UnknownError'], 0 );
		};

		//* Setup external update.
		jQuery.ajax( {
			method: 'POST',
			url: ajaxurl,
			dataType: 'json',
			data: {
				'action' : 'tsfem_enable_feeds',
				'nonce' : tsfem.nonce,
			},
			timeout: 12000,
			async: true,
			success: function( response ) {

				response = tsfem.convertJSONResponse( response );

				if ( tsfem.debug ) console.log( response );

				let data = response && response.data || void 0,
					type = response && response.type || void 0;

				if ( 'success' === type && data ) {

					let content = data.content;

					switch ( content.status ) {
						case 'success' :
							status = 1;

							//* Insert wrap.
							jQuery( '.tsfem-trends-wrap' ).empty().css( 'opacity', 0 ).append( content.wrap ).animate(
								{ 'opacity' : 1 },
								{ 'queue' : true, 'duration' : 250 },
								'swing'
							);

							var duration = 400,
								total = content.data.length,
								wait = 0;

							//* Calculate loader wait.
							// Remove last entry from calculation (total-1) as it has adds no timing effect.
							for ( let i = 1; i < total - 1; i++ ) {
								wait += Math.round( duration / Math.pow( 1 + ( i / 2 ) / 100, 2 ) );
							}
							// Remove first and last entries from calculation as they have no timing effects.
							wait -= ( duration * 2 ) + ( duration / 2 );

							//* Loop through each issue and slowly insert it. It's run asynchronously...
							jQuery.each( content.data, function( index, value ) {
								duration = Math.round( duration / Math.pow( 1 + ( index / 2 ) / 100, 2 ) );
								setTimeout( function() {
									jQuery( value ).hide().appendTo( '.tsfem-feed-wrap' ).slideDown( duration );
								}, duration / 2 * index );
							} );

							//* Expected to be done in 3.858 seconds
							setTimeout( function() { tsfem.updatedResponse( loader, status, '', 0 ); }, wait );
							break;

						case 'parse_error' :
						case 'unknown_error' :
						default :
							jQuery( '.tsfem-trends-wrap' ).empty().css( 'opacity', 0 ).append( content.error_output ).css( 'opacity', 1 ).find( '.tsfem-feed-wrap' ).css(
								{ 'opacity' : 0 }
							).animate(
								{ 'opacity' : 1 },
								{ queue: true, duration: 2000 },
								'swing'
							);
							//* 2 means the feed is offline. 0 means a server parsing error.
							// Don't enable the button. Make the user reload.
							status = 'unknown_error' === content.status ? 2 : 0;
							setTimeout( function() { tsfem.updatedResponse( loader, status, tsfem.i18n['UnknownError'], 0 ); }, 1000 );
							break;
					}
				} else if ( 'unknown' === response.type ) {
					status = 2;
					unknownError();
				} else {
					unknownError();
				}
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				let _error = tsfem.getAjaxError( jqXHR, textStatus, errorThrown );

				$button.removeClass( disabled );
				$button.prop( 'disabled', false );
				tsfem.updatedResponse( loader, 0, _error, 0 );
			},
			complete: function() { },
		} );
	},

	/**
	 * Updates the selected extension state.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @function
	 * @param {jQuery.event} event jQuery event
	 * @return {undefined}
	 */
	updateExtension: function( event ) {

		let disabled = 'tsfem-button-disabled',
			$button = jQuery( event.target ),
			$buttons = jQuery( '.tsfem-button-extension-activate, .tsfem-button-extension-deactivate' ).not( jQuery( '.' + disabled ) ),
			loader = '#tsfem-extensions-ajax',
			actionSlug = $button.data( 'slug' ),
			actionCase = $button.data( 'case' );

		if ( $button.prop( 'disabled' ) )
			return;

		//* Disable buttons
		$buttons.map( function() {
			jQuery( this ).addClass( disabled );
			jQuery( this ).prop( 'disabled', true );
		} );

		//* Reset ajax loader
		tsfem.resetAjaxLoader( loader );

		//* Set ajax loader.
		tsfem.setAjaxLoader( loader );

		//* Setup external update.
		jQuery.ajax( {
			method: 'POST',
			url: ajaxurl,
			dataType: 'json',
			data: {
				'action' : 'tsfem_update_extension',
				'nonce' : tsfem.nonce,
				'slug' : actionSlug,
				'case' : actionCase,
			},
			timeout: 10000,
			async: true,
			success: function( response ) {

				response = tsfem.convertJSONResponse( response );

				if ( tsfem.debug ) console.log( response );

				let data = response && response.data || void 0,
					type = response && response.type || void 0;

				if ( ! data || ! type ) {
					//* Erroneous input.
					tsfem.updatedResponse( loader, 0, tsfem.i18n['InvalidResponse'], 0 );
				} else {

					var status = data.status['success'],
						notice = data.status['notice'],
						topNotice = ( 'topNotice' in data.status ) && data.status['topNotice'] || false;

					if ( -1 === status ) {
						//* Erroneous input.
						tsfem.updatedResponse( loader, 0, notice, 0 );
					} else {
						//* Add top notice.
						if ( topNotice ) {
							tsfem.setTopNotice( status, topNotice );
						}

						if ( 'activate' === actionCase ) {
							if ( false === status ) {
								/**
								 * Not activated as no extension has been put in.
								 * This should never happen.
								 */
								tsfem.updatedResponse( loader, 0, notice, 0 );
							} else {
								switch ( status ) {
									case 10001 :
										//* No extensions checksum found.
										tsfem.updatedResponse( loader, 0, notice, 0 );
										break;

									case 10002 :
										//* Extensions checksum mismatch.
										tsfem.updatedResponse( loader, 0, notice, 0 );
										break;

									case 10003 :
										//* Method outcome mismatch.
										tsfem.updatedResponse( loader, 0, notice, 0 );
										break;

									case 10004 :
										//* Account isn't allowed to use premium extension.
										tsfem.updatedResponse( loader, 0, notice, 0 );
										break;

									case 10005 :
										//* Extension caused fatal error.
										tsfem.updatedResponse( loader, 0, notice, 0 );
										//* Update hover cache.
										tsfem.initDescHover();
										break;

									case 10006 :
										//* Option update failed for unknown reason. Maybe overload.
										tsfem.updatedResponse( loader, 2, notice, 0 );
										break;

									default :
										//* Extension is activated.
										$button.removeClass( 'tsfem-button-extension-activate' ).addClass( 'tsfem-button-extension-deactivate' );
										$button.data( 'case', 'deactivate' );
										$button.text( tsfem.i18n['Deactivate'] );
										tsfem.updatedResponse( loader, 1, notice, 0 );
										jQuery( '#' + actionSlug + '-extension-entry' ).removeClass( 'tsfem-extension-deactivated' ).addClass( 'tsfem-extension-activated' );
										tsfem.updateExtensionDescFooter( actionSlug, actionCase );
										break;
								}
							}
						} else if ( 'deactivate' === actionCase ) {
							if ( false === status ) {
								//* Not deactivated.
								tsfem.updatedResponse( loader, 0, notice, 0 );
							} else {
								//* Deactivated.
								$button.removeClass( 'tsfem-button-extension-deactivate' ).addClass( 'tsfem-button-extension-activate' );
								$button.data( 'case', 'activate' );
								$button.text( tsfem.i18n['Activate'] );
								tsfem.updatedResponse( loader, 1, notice, 0 );
								jQuery( '#' + actionSlug + '-extension-entry' ).removeClass( 'tsfem-extension-activated' ).addClass( 'tsfem-extension-deactivated' );
								tsfem.updateExtensionDescFooter( actionSlug, actionCase );
							}
						} else {
							//* Erroneous input.
							tsfem.updatedResponse( loader, 0, tsfem.i18n['UnknownError'], 0 );
						}
					}
				}
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				let _error = tsfem.getAjaxError( jqXHR, textStatus, errorThrown );
				tsfem.updatedResponse( loader, 0, _error, 0 );
			},
			complete: function() {
				$buttons.removeClass( disabled );
				$buttons.prop( 'disabled', false );
			},
		} );
	},

	/**
	 * Tries to convert JSON response to values if not already set.
	 *
	 * @since 1.2.0
	 * @access public
	 *
	 * @function
	 * @param {(object|string|undefined)} response
	 * @return {(object|undefined)}
	 */
	convertJSONResponse: function( response ) {

		let testJSON = response && response.json || void 0,
			isJSON = 1 === testJSON;

		if ( ! isJSON ) {
			let _response = response;

			try {
				response = JSON.parse( response );
				isJSON = true;
			} catch ( error ) {
				isJSON = false;
			}

			if ( ! isJSON ) {
				// Reset response.
				response = _response;
			}
		}

		return response;
	},

	/**
	 * Visualizes the AJAX response to the user.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @function
	 * @param {string} target
	 * @param {number} success 0 = error, 1 = success, 2 = unknown but success.
	 * @param {string} notice The updated notice.
	 * @param {number} html 0 = output text, 1 = output HTML
	 * @return {undefined}
	 */
	updatedResponse: function( target, success, notice, html ) {
		switch ( success ) {
			case 0 :
			case 1 :
			case 2 :
				tsfem.unsetAjaxLoader( target, success, notice, html );
				break;

			default :
				tsfem.resetAjaxLoader( target );
				break;
		}
	},

	/**
	 * Returns bound AJAX reponse error with the help from i18n.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @function
	 * @param {(jQuery.xhr|Object)} jqXHR
	 * @param {String} textStatus
	 * @param {String} errorThrown
	 * @return {String}
	 */
	getAjaxError: function( jqXHR, textStatus, errorThrown ) {

		if ( tsfem.debug ) {
			console.log( jqXHR.responseText );
			console.log( errorThrown );
		}

		let _error = '';

		switch ( errorThrown ) {
			case 'abort' :
			case 'timeout' :
				_error = tsfem.i18n['TimeoutError'];
				break;

			case 'Internal Server Error' :
				_error = tsfem.i18n['FatalError'];
				break;

			case 'parsererror' :
				_error = tsfem.i18n['ParseError'];
				break;

			default :
				// @TODO use ajaxOptions.status? i.e. 400, 401, 402, 503.
				_error = tsfem.i18n['UnknownError'];
				break;
		}

		return _error;
	},

	/**
	 * Generates AJAX notices and top notices based on error return values.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @function
	 * @param {object} response The response body.
	 * @return {undefined}
	 */
	unexpectedAjaxErrorNotice: function( response ) {

		response = tsfem.convertJSONResponse( response ) || void 0;

		let data = response && response.data || void 0;

		if ( tsfem.debug ) console.log( response );

		if ( data && 'results' in data && 'code' in data.results )
			tsfem.setTopNotice( data.results.code, data.results.notice );
	},

	/**
	 * Converts multidimensional arrays to single array with key wrappers.
	 * All first array keys become the new key. The final value becomes its value.
	 *
	 * Great for creating form array keys.
	 * matosa: "Multidimensional Array TO Single Array"
	 *
	 * The latest value must be scalar.
	 *
	 * Example: a = [ 1 => [ 2 => [ 3 => [ 'value' ] ] ] ];
	 * Becomes: '1[2][3]' => 'value';
	 *
	 * @since 1.2.0
	 * @access public
	 *
	 * @param {(String|Object)} value The array or string to loop.
	 * @return {(Object|Boolean)} The iterated array to string. False if input isn't array.
	 */
	matosa: function( value ) {

		var last = null,
			output = '';

		(function _matosa( _value, _i ) {
			_i++;
			if ( typeof _value === 'object' ) {
				let _index, _item;
				for ( _index in _value ) {
					_item = _value[ _index ];
				}

				last = _item;

				if ( 1 === _i ) {
					output += _index + _matosa( _item, _i );
				} else {
					output += '[' + _index + ']' + _matosa( _item, _i );
				}
			} else if ( 1 === _i ) {
				last = null;
				return output = false;
			}

			return output;
		})( value, 0 );

		if ( false === output )
			return false;

		let retval = {};
		retval[ output ] = last;

		return retval;
	},

	/**
	 * Gets and inserts the AJAX response for the Extension Description Footer.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @function
	 * @param {String} actionSlug The extension slug.
	 * @param {String} actionCase The update case. Either 'activate' or 'deactivate'.
	 * @return {undefined}
	 */
	updateExtensionDescFooter: function( actionSlug, actionCase ) {

		jQuery.ajax( {
			method: 'POST',
			url: ajaxurl,
			dataType: 'json',
			data: {
				'action' : 'tsfem_update_extension_desc_footer',
				'nonce' : tsfem.nonce,
				'slug' : actionSlug,
				'case' : actionCase,
			},
			timeout: 3000,
			async: true,
			success: function( response ) {

				response = tsfem.convertJSONResponse( response );

				if ( tsfem.debug ) console.log( response );

				let data = response && response.data || void 0,
					type = response && response.type || void 0;

				if ( data ) {

					var $footer = jQuery( '#' + actionSlug + '-extension-entry .tsfem-extension-description-footer' ),
						direction = 'activate' === actionCase ? 'up' : 'down';

					$footer.addClass( 'tsfem-flip-hide-' + direction );

					setTimeout( function() {
						$footer.empty().append( data );
						//* Update hover cache.
						tsfem.initDescHover();
					}, 250 );
					setTimeout( function() {
						$footer.addClass( 'tsfem-flip-show-' + direction );
					}, 500 );
					setTimeout( function() {
						$footer.removeClass( 'tsfem-flip-hide-' + direction + ' tsfem-flip-show-' + direction );
					}, 750 );
				}
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				// Don't invoke anything fancy, yet. This is automatically called.
				if ( tsfem.debug ) {
					console.log( jqXHR.responseText );
					console.log( errorThrown );
				}
			},
			complete: function() { },
		} );
	},

	/**
	 * Prevents browser default actions.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @function
	 * @param {Object} event jQuery event
	 * @return {undefined}
	 */
	preventDefault: function( event ) {
		event.preventDefault();
		event.stopPropagation();
	},

	/**
	 * Resets switcher button to original state if clicked outside of its wrap.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @function
	 * @param {Object} event jQuery event
	 */
	resetSwitcher: function( event ) {

		let $switcher = jQuery( '.tsfem-switch-button-container > input[type="checkbox"]:checked' );

		if ( 'undefined' !== typeof $switcher && $switcher.length > 0 ) {
			let $wrap = $switcher.parents( '.tsfem-switch-button-container-wrap' );

			if ( jQuery( event.target ).closest( $wrap ).length < 1 ) {
				$switcher.prop( 'checked', false );
			}
		}
	},

	/**
	 * Sets last uneven extension wrapper to be the same width as the first.
	 *
	 * @since 1.0.0
	 * @access private
	 * @todo set Resizebuffer rather than use jQ().delay().
	 *
	 * @function
	 * @return {undefined}
	 */
	setLastExtensionEntry: function() {

		let $extensions = jQuery( '.tsfem-extensions-overview-content' ).children( '.tsfem-extension-entry-wrap' ),
			amount = $extensions.length;

		if ( amount & 1 && amount > 2 ) {
			//* Uneven amount.
			let $first = $extensions.first(),
				$last = $extensions.last();

			if ( window.innerWidth < 782 ) {
				$last.delay( 10 ).css( { 'max-width' : '' } );
			} else {
				$last.delay( 10 ).css( { 'max-width' : $first.width() } );
			}
		}
	},

	/**
	 * Set a flag, to indicate user needs to be warned on navigation.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @function
	 * @return {undefined}
	 */
	registerNavWarn: function() {
		tsfem.navWarn = true;
	},

	/**
	 * Set a flag, to indicate user needs to be warned on navigation.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @function
	 * @return {Boolean}
	 */
	mustNavWarn: function() {
		return !! tsfem.navWarn;
	},

	/**
	 * Sets up dismissible notice listener. Uses class .tsfem-dismiss.
	 *
	 * @since 1.3.0
	 * @access private
	 *
	 * @function
	 * @return {undefined}
	 */
	setDismissNoticeListener: function() {

		let $dismiss = jQuery( '.tsfem-dismiss' );

		$dismiss.off( 'click', tsfem.dismissNotice );
		$dismiss.on( 'click', tsfem.dismissNotice );
	},

	/**
	 * Dismissible notices. Uses class .tsfem-notice.
	 *
	 * @since 1.3.0
	 * @access private
	 *
	 * @function
	 * @param {!jQuery.Event} event
	 * @return {undefined}
	 */
	dismissNotice: function( event ) {
		jQuery( event.target ).parents( '.tsfem-notice' ).slideUp( 200, function() {
			this.remove();
		} );
	},

	/**
	 * Gets and inserts the AJAX response for the Extension Description Footer.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @function
	 * @param {number} noticeKey The extension slug.
	 * @param {(string|undefined)} msg The notice message, if set this is going to be used.
	 * @return {undefined}
	 */
	setTopNotice: function( noticeKey, msg ) {

		//* Wait a little until AJAX is resolved.
		if ( tsfem.noticeBuffer ) {
			window.setTimeout( function() {
				tsfem.setTopNotice( noticeKey, msg );
			}, 500 );
			return;
		}

		tsfem.noticeBuffer = true;

		let $top = jQuery( '.tsfem-notice-wrap' ),
			hasMsg = msg ? 1 : 0;

		jQuery.ajax( {
			method: 'POST',
			url: ajaxurl,
			datatype: 'json',
			data: {
				'action' : 'tsfem_get_dismissible_notice',
				'nonce' : tsfem.nonce,
				'tsfem-notice-key' : noticeKey,
				'tsfem-notice-has-msg' : hasMsg,
			},
			timeout: 7000,
			async: true,
			success: function( response ) {

				response = tsfem.convertJSONResponse( response );

				if ( tsfem.debug ) console.log( response );

				let data = response && response.data || void 0,
					type = response && response.type || void 0;

				if ( ! data || ! type || 'undefined' === typeof data.notice ) {
					//* Erroneous output. Do nothing as this error is invoked internally.
				} else {

					let $notices = $top.children( '.tsfem-notice, .tsfem-notice-wrap .notice' );

					if ( $notices.length > 1 ) {
						// Kill them all with fire.
						$notices.slice( 0, $notices.length - 1 ).each( function() {
							jQuery( this ).slideUp( 200, function() {
								this.remove();
							} );
						} );
					}

					if ( hasMsg ) {
						let $wrap = jQuery( data.notice ).hide().appendTo( $top ),
							$p = $wrap.find( 'p' ).first();

						if ( tsfem.rtl ) {
							$p.prepend( msg + ' ' );
						} else {
							$p.append( ' ' + msg );
						}
						$wrap.slideDown( 200 );
					} else {
						jQuery( data.notice ).hide().appendTo( $top ).slideDown( 200 );
					}

					tsfem.setDismissNoticeListener();
				}
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				// Don't invoke anything fancy, yet. This is automatically called.
				if ( tsfem.debug ) {
					console.log( jqXHR.responseText );
					console.log( errorThrown );
				}
			},
			complete: function() {
				tsfem.noticeBuffer = false;
			},
		} );
	},

	/**
	 * Creates modal dialog box from options. Also allows multiselect, instead
	 * of just confirm/cancel.
	 *
	 * NOTE: If options.select is set, you must set options.confirm to get the
	 *       return value.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @function
	 * @param {object} options The dialog options.
	 * @return {undefined}
	 */
	dialog: function( options ) {

		let title = options.title || '',
			text = options.text || '',
			select = options.select || '',
			confirm = options.confirm || '',
			cancel = options.cancel || '',
			modal = {};

		modal.mask = document.createElement( 'div' );
		modal.mask.className = 'tsfem-modal-mask';
		modal.maskNoScroll = document.createElement( 'div' );
		modal.maskNoScroll.className = 'tsfem-modal-mask-noscroll';
		modal.mask.appendChild( modal.maskNoScroll );

		modal.container = document.createElement( 'div' );
		modal.container.className = 'tsfem-modal-container';

		modal.dialogWrap = document.createElement( 'div' );
		modal.dialogWrap.className = 'tsfem-modal-dialog-wrap';
		modal.dialogWrap.style.marginLeft = document.getElementById( 'adminmenuwrap' ).offsetWidth + 'px';
		modal.dialogWrap.style.marginTop = document.getElementById( 'wpadminbar' ).offsetHeight + 'px';

		modal.dialog = document.createElement( 'div' );
		modal.dialog.className = 'tsfem-modal-dialog';

		modal.trap = document.createElement( 'div' );
		modal.trap.className = 'tsfem-modal-trap';
		modal.trap.tabIndex = 0;
		modal.bottomTrap = modal.trap.cloneNode( false );
		modal.dialog.appendChild( modal.trap );

		modal.x = document.createElement( 'div' );
		modal.x.className = 'tsfem-modal-dismiss';
		modal.x.addEventListener( 'click', function() {
			window.dispatchEvent( new Event( 'tsfem_modalCancel' ) );
		} );
		modal.dialog.appendChild( modal.x );

		if ( title ) {
			modal.titleWrap = document.createElement( 'div' );
			modal.titleWrap.className = 'tsfem-modal-title';

			modal.titleWrapTitle = document.createElement( 'h4' );
			modal.titleWrapTitle.innerHTML = title;
			modal.titleWrap.appendChild( modal.titleWrapTitle );

			modal.dialog.appendChild( modal.titleWrap );
		}

		modal.inner = document.createElement( 'div' );
		modal.inner.className = 'tsfem-modal-inner';

		if ( text ) {
			modal.textWrap = document.createElement( 'div' );
			modal.textWrap.className = 'tsfem-modal-text';

			if ( Array.isArray( text ) ) {
				for ( let _iT in text ) {
					modal.textWrapContent = document.createElement( 'p' );
					modal.textWrapContent.innerHTML = text[ _iT ];
					modal.textWrap.appendChild( modal.textWrapContent );
				}
			} else {
				modal.textWrapContent = document.createElement( 'p' );
				modal.textWrapContent.innerHTML = text;
				modal.textWrap.appendChild( modal.textWrapContent );
			}

			modal.inner.appendChild( modal.textWrap );
		}

		let hasSelect = false;

		if ( select ) {
			hasSelect = true;

			modal.selectWrap = document.createElement( 'div' );
			modal.selectWrap.className = 'tsfem-modal-select';

			let selectWrapItem = {};

			selectWrapItem.wrap = document.createElement( 'div' );
			selectWrapItem.wrap.className = 'tsfem-modal-select-option';

			selectWrapItem.radio = document.createElement( 'input' );
			selectWrapItem.radio.setAttribute( 'type', 'radio' );
			selectWrapItem.radio.setAttribute( 'name', 'tsfem-modal-select-option-group' );
			selectWrapItem.radio.tabIndex = 0;

			selectWrapItem.label = document.createElement( 'label' );

			(function() {
				for ( let i in select ) {
					let wrap = selectWrapItem.wrap.cloneNode( true ),
						radio = selectWrapItem.radio.cloneNode( false ),
						label = selectWrapItem.label.cloneNode( false );

					radio.setAttribute( 'value', i );
					label.innerHTML = select[ i ];

					//= i can be a string and integer because of "possible" JSON parsing.
					if ( i == 0 ) {
						radio.checked = true;
					}

					let id = 'tsfem-dialog-option-' + i;

					radio.setAttribute( 'id', id );
					label.setAttribute( 'for', id );

					wrap.appendChild( radio );
					wrap.appendChild( label );

					modal.selectWrap.appendChild( wrap );
				}
			})();

			modal.inner.appendChild( modal.selectWrap );
		}

		modal.dialog.appendChild( modal.inner );

		if ( confirm || cancel ) {
			modal.buttonWrap = document.createElement( 'div' );
			modal.buttonWrap.className = 'tsfem-modal-buttons';

			if ( confirm ) {
				modal.confirmButton = document.createElement( 'button' );
				modal.confirmButton.className = 'tsfem-modal-confirm tsfem-button-small';
				if ( hasSelect ) {
					modal.confirmButton.className += ' tsfem-button-primary tsfem-button-green';
				} else {
					modal.confirmButton.className += ' tsfem-button';
				}

				modal.confirmButton.innerHTML = confirm;
				modal.confirmButton.addEventListener( 'click', function() {
					let detail = void 0;
					if ( hasSelect ) {
						detail = { 'detail' : {
							'checked' : document.querySelector( '.tsfem-modal-select input:checked' ).value
						} };
					}
					window.dispatchEvent( new CustomEvent( 'tsfem_modalConfirm', detail ) );
				} );

				modal.buttonWrap.appendChild( modal.confirmButton );
			}

			if ( cancel ) {
				modal.cancelButton = document.createElement( 'button' );
				modal.cancelButton.className = 'tsfem-modal-cancel tsfem-button tsfem-button-small';
				modal.cancelButton.innerHTML = cancel;
				modal.cancelButton.addEventListener( 'click', function() {
					window.dispatchEvent( new Event( 'tsfem_modalCancel' ) );
				} );

				modal.buttonWrap.appendChild( modal.cancelButton );
			}

			modal.dialog.appendChild( modal.buttonWrap );
		}

		modal.dialog.appendChild( modal.bottomTrap );

		modal.dialogWrap.appendChild( modal.dialog );
		modal.container.appendChild( modal.dialogWrap );

		document.body.appendChild( modal.mask );
		document.body.appendChild( modal.container );

		let resetFocus = function() {
			modal.trap.focus();
		};
		modal.trap.addEventListener( 'focus', resetFocus );
		modal.bottomTrap.addEventListener( 'focus', resetFocus );
		modal.trap.focus();

		tsfem.fadeIn( modal.mask );
		tsfem.fadeIn( modal.container );

		let preventDefault = function( e ) {
			e.preventDefault();
		};
		modal.maskNoScroll.addEventListener( 'wheel', preventDefault );
		modal.maskNoScroll.addEventListener( 'touchmove', preventDefault );

		let resizeListener = function() {
			modal.dialogWrap.style.marginLeft = document.getElementById( 'adminmenuwrap' ).offsetWidth + 'px';
			modal.dialogWrap.style.marginTop = document.getElementById( 'wpadminbar' ).offsetHeight + 'px';
		}
		window.addEventListener( 'resize', resizeListener );

		let removeModal = function() {
			modal.maskNoScroll.removeEventListener( 'wheel', preventDefault );
			modal.maskNoScroll.removeEventListener( 'touchmove', preventDefault );
			window.removeEventListener( 'tsfem_modalCancel', removeModal );
			window.removeEventListener( 'tsfem_modalConfirm', removeModal );
			window.removeEventListener( 'resize', resizeListener );
			tsfem.fadeOut( modal.mask );
			tsfem.fadeOut( modal.container );
		};

		window.addEventListener( 'tsfem_modalCancel', removeModal );
		window.addEventListener( 'tsfem_modalConfirm', removeModal );
	},

	/**
	 * Fades in target.
	 * Can also fade out a target when show if false. It will remove the target
	 * on completion.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @function
	 * @param {Element} target The target to fade in (or out).
	 * @param {number} ms The time it takes to fade in (or out).
	 * @param {boolean} show Whether to show or hide and delete the target.
	 * @return {undefined}
	 */
	fadeIn: function( target, ms, show ) {

		if ( void 0 === target || ! target instanceof HTMLElement )
			return;

		if ( ! target.style || ! ( 'opacity' in target.style ) )
			return;

		ms = ms || 250;
		show = void 0 === show ? true : show;

		let opacity = 0,
			cO = 0,
			oBuffer,
			fadeGo;

		if ( show ) {
			fadeGo = function() {
				cO = ++opacity / 100;
				target.style.opacity = cO;
				cO < 1 || clearInterval( oBuffer );
			};
		} else {
			opacity = 100;
			fadeGo = function() {
				cO = --opacity / 100;
				target.style.opacity = cO;
				//* clearInterval returns void.
				cO > 0 || ( clearInterval( oBuffer ) || true ) && target.remove();
			};
		}
		oBuffer = setInterval( fadeGo, ms / 100 );
	},

	/**
	 * Fades out and deletes target.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @function
	 * @param {Element} target The target to fade out.
	 * @param {number} ms The time it takes to fade out.
	 * @return {undefined}
	 */
	fadeOut: function( target, ms ) {
		tsfem.fadeIn( target, ms, false );
	},

	/**
	 * Initialises all aspects of the scripts.
	 *
	 * Generally ordered with stuff that inserts new elements into the DOM first,
	 * then stuff that triggers an event on existing DOM elements when ready,
	 * followed by stuff that triggers an event only on user interaction. This
	 * keeps any screen jumping from occuring later on.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @function
	 * @param {Object} jQ jQuery
	 * @return {undefined}
	 */
	ready: function( jQ ) {

		// Move the page updates notices below the top-wrap.
		jQ( 'div.updated, div.error, div.notice-warning' ).insertAfter( '.tsfem-top-wrap' );

		// AJAX feed update.
		jQ( 'a#tsfem-enable-feeds' ).on( 'click', tsfem.updateFeed );

		// AJAX extension update.
		jQ( 'a.tsfem-button-extension-activate, a.tsfem-button-extension-deactivate' ).on( 'click', tsfem.updateExtension );

		// AJAX on-heartbeat active extension check to update buttons accordingly on multi-admin sites or after timeout. @TODO
		//jQ( document ).on( 'heartbeat-tick', tsfem.checkExtensions );

		// Disable semi-disabled buttons.
		jQ( 'a.tsfem-button-disabled' ).on( 'click', tsfem.preventDefault );

		// Initialize the balloon hover effects.
		jQ( document.body ).ready( tsfem.initDescHover );

		// Proportionate uneven amounts of extension entry boxes.
		jQ( document.body ).ready( tsfem.setLastExtensionEntry );
		jQ( window ).on( 'resize orientationchange', tsfem.setLastExtensionEntry );

		// Reset switcher button to default on non-click.
		jQ( window ).on( 'click touchend MSPointerUp', tsfem.resetSwitcher );

		// Set dismissible notice listener.
		jQ( document.body ).ready( tsfem.setDismissNoticeListener );
	}
};
jQuery( tsfem.ready );

<?php
defined( 'ABSPATH' ) and \tsf_extension_manager()->_verify_instance( $_instance, $bits[1] ) or die;

// Todo do something with network mode here. Remove backslashes (preventing POT generation).
//$type = $this->is_plugin_in_network_mode() ? _\_( 'network', 'the-seo-framework-extension-manager' ) : _\_( 'website', 'the-seo-framework-extension-manager' );

?>
<div class="tsfem-connect-option tsfem-flex tsfem-flex-row tsfem-flex-nowrap tsfem-connect-highlighted">
	<div class="tsfem-connect-description tsfem-flex">
		<h3><?php \esc_html_e( 'Get your key', 'the-seo-framework-extension-manager' ); ?></h3>
		<strong><?php \esc_html_e( 'Log in or sign up now', 'the-seo-framework-extension-manager' ); ?></strong>
		<p><?php \esc_html_e( 'Get your key. Easy and secure.', 'the-seo-framework-extension-manager' ); ?></p>
	</div>
	<div class="tsfem-connect-action tsfem-flex">
		<div class="tsfem-connect-fields-row tsfem-flex tsfem-flex-row">
			<?php
			//* TODO activation listener. Version 2.x
			// $this->get_view( 'forms/get', [ 'name' => $this->request_name['activate-external'], 'action' => $this->get_activation_url( 'get/' ), 'redirect' => 'activate', 'text' => \__( 'Get your API key', 'the-seo-framework-extension-manager' ), 'classes' => [ 'tsfem-button', 'tsfem-button-primary' ] ] );
			// $this->get_view( 'forms/get', [ 'name' => $this->request_name['activate-external'], 'action' => $this->get_activation_url( 'get/' ), 'redirect' => 'connect', 'text' => \__( 'Connect', 'the-seo-framework-extension-manager' ), 'classes' => [ 'tsfem-button' ] ] );
			// $this->get_remote_activation_listener();

			//* Already escaped.
			echo $this->get_link( [
				'url' => $this->get_activation_url( 'shop/premium-subscription/' ),
				'target' => '_blank',
				'class' => 'tsfem-button-primary',
				'title' => '',
				'content' => \__( 'Get your API key', 'the-seo-framework-extension-manager' ),
			] );
			?>
		</div>
	</div>
</div>

<div class="tsfem-connect-option tsfem-flex tsfem-flex-row tsfem-flex-nowrap">
	<div class="tsfem-connect-description tsfem-flex">
		<h3><?php \esc_html_e( 'Use your key', 'the-seo-framework-extension-manager' ); ?></h3>
		<strong><?php \esc_html_e( 'Manually enter an API key', 'the-seo-framework-extension-manager' ); ?></strong>
		<p><?php \esc_html_e( 'Already have your key? Enter it here.', 'the-seo-framework-extension-manager' ); ?></p>
	</div>
	<div class="tsfem-connect-action tsfem-flex">
		<?php
		$this->get_view( 'forms/key', [
			'name' => $this->request_name['activate-key'],
			'id' => 'input-activation',
			'classes' => [
				'tsfem-button',
				'tsfem-button-primary',
				'tsfem-flex',
				'tsfem-flex-row',
			],
			'classes_form' => [
				'tsfem-flex',
				'tsfem-flex-nowrap',
			],
			'text' => \__( 'Use this key', 'the-seo-framework-extension-manager' ),
		] );
		?>
	</div>
</div>

<div class="tsfem-connect-option tsfem-flex tsfem-flex-row tsfem-flex-nowrap tsfem-connect-secondary">
	<div class="tsfem-connect-description tsfem-flex">
		<h3><?php \esc_html_e( 'Go free', 'the-seo-framework-extension-manager' ); ?></h3>
		<strong><?php \esc_html_e( 'Unlimited free access', 'the-seo-framework-extension-manager' ); ?></strong>
		<p><?php \esc_html_e( 'Rather go for a test-drive? You can always upgrade later.', 'the-seo-framework-extension-manager' ); ?></p>
	</div>
	<div class="tsfem-connect-action tsfem-flex">
		<div class="tsfem-connect-fields-row tsfem-flex tsfem-flex-row">
			<?php
			$this->get_view( 'forms/free', [
				'name' => $this->request_name['activate-free'],
				'id' => 'activate-free',
				'text' => \__( 'Save a few bucks', 'the-seo-framework-extension-manager' ),
			] );
			?>
		</div>
	</div>
</div>
<?php

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 *
 * @return {Element} Element to render.
 */

export default function save( { attributes } ) {
	const { tiers, featureCategories, currency } = attributes;

	let currentCurrency = currency;

	// Inline SVGs for checkmark and hyphen
	const checkMarkIcon = (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M5 13l4 4L19 7" stroke="#36ce3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
		</svg>
	);
	const hyphenIcon = (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M5 13h14" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
		</svg>
	);

	const handleCurrencyToggle = ( event ) => {
		const isChecked = event.target.checked;
		currentCurrency = isChecked ? 'CAD' : 'USD';
		console.log('Currency toggled to:', currentCurrency);
		// Note: In the save function, we cannot call setAttributes.
		// The currency state should be managed in the edit function and saved as an attribute.
		// This is just a placeholder to indicate where the logic would go.
	}

	return (
		<div { ...useBlockProps.save() }>
			<div className='app-autosoftway-pricing-table-currency-toggle'>
				<div>USD</div>
				<label className="app-autosoftway-pricing-switch">
					<input
						type="checkbox"
						onChange="document.querySelectorAll('.show-usd').forEach(item => item.style.display = this.checked ? 'none' : 'block'); document.querySelectorAll('.show-cad').forEach(item => item.style.display = this.checked ? 'block' : 'none');"
						checked={currentCurrency === 'CAD'}
					/>
					<span className="app-autosoftway-pricing-slider"></span>
				</label>
				<div>CAD</div>
			</div>
			<div className='app-autosoftway-pricing-table-desktop-header'>
				<div>Features</div>
				{tiers && tiers.map((tier, index) => (
					<div key={index} className={`app-autosoftway-pricing-table-tier ${tier.isPopular ? 'app-autosoftway-pricing-popular-background' : ''} ${index === 0 ? 'tier-active' : 'tier-not-active'}`}>
						{tier.isPopular && <div className='app-autosoftway-pricing-table-tier-popular-badge'>Most Popular</div>}
						{tier.name}
						<div className='app-autosoftway-pricing-table-tier-price'>
								<span className='app-autosoftway-pricing-table-tier-price-money show-cad' style={{ display: currentCurrency === 'CAD' ? 'block' : 'none' }}>{tier.priceCAD} <span className="app-autosoftway-pricing-table-tier-price-suffix">CAD / month</span></span>
								<span className='app-autosoftway-pricing-table-tier-price-money show-usd' style={{ display: currentCurrency === 'USD' ? 'block' : 'none' }}>{tier.priceUSD} <span className="app-autosoftway-pricing-table-tier-price-suffix">USD / month</span></span>
						</div>
						<a href={tier.buttonUrl} className="app-autosoftway-pricing-table-tier-button wp-element-button">	
							{tier.buttonText}
						</a>
					</div>
				))}
			</div>
			<div className='app-autosoftway-pricing-table-tabs'>
				{featureCategories && featureCategories.map((category, index) => (
					<div key={index} className="app-autosoftway-pricing-table-tab">
						<a href={`#category-${category.id}`}>{category.name}</a>
					</div>
				))}
			</div>
			<div className='app-autosoftway-pricing-table-tiers-tabs'>
				{tiers && tiers.map((tier, index) => (
					<div key={index} className="app-autosoftway-pricing-table-tier-tab">
						<button id={index} onClick="
						document.querySelectorAll('.app-autosoftway-pricing-table-tier').forEach((tier, tierIndex) => {
							if (tierIndex === parseInt(this.id)) {
							tier.classList.add('tier-active');
								tier.classList.remove('tier-not-active');
							} else {
								tier.classList.remove('tier-active');
								tier.classList.add('tier-not-active');
							}
						});
						for (let i = 0; i < 4; i++) {
							if (i == parseInt(this.id)) {
								document.querySelectorAll('.tier-checkmark-' + i).forEach((el) => el.classList.remove('tier-not-active'));
								document.querySelectorAll('.tier-checkmark-' + i).forEach((el) => el.classList.add('tier-active'));
							} else {
								document.querySelectorAll('.tier-checkmark-' + i).forEach((el) => el.classList.remove('tier-active'));
								document.querySelectorAll('.tier-checkmark-' + i).forEach((el) => el.classList.add('tier-not-active'));
							}
						}
					">{tier.name}</button>
					</div>
				))}
			</div>
			<div className='app-autosoftway-pricing-table-desktop-features'>
				{featureCategories && featureCategories.map((category, categoryIndex) => (
					<div key={categoryIndex} className="app-autosoftway-pricing-table-feature-category">
						<div className="app-autosoftway-pricing-table-feature-category-name">
							<div id={`category-${category.id}`}>{category.name}</div>
						</div>
						{category.features && category.features.map((feature, featureIndex) => (
							<div key={featureIndex} className="app-autosoftway-pricing-table-feature-row">
								<div className="app-autosoftway-pricing-table-feature-name">
									{feature.name}
								</div>
								{tiers && tiers.map((tier, index) => (
									<div key={index} className={`tier-checkmark-${index} app-autosoftway-pricing-table-checkmark ${tier.isPopular ? 'app-autosoftway-pricing-popular-background' : ''} ${index === 0 ? 'tier-active' : 'tier-not-active'}`}>
										{tier.features && tier.features.includes(feature.id) ? checkMarkIcon : hyphenIcon}
									</div>
								))}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

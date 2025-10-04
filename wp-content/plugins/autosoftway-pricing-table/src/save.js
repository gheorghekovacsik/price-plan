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
	const { tiers, featureCategories } = attributes;

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

	return (
		<div { ...useBlockProps.save() }>
			<div className='app-autosoftway-pricing-table-currency-toggle'>
				<div>USD</div>
				<label class="app-autosoftway-pricing-switch">
					<input type="checkbox"/>
					<span class="app-autosoftway-pricing-slider"></span>
				</label>
				<div>CAD</div>
			</div>
			<div className='app-autosoftway-pricing-table-desktop-header'>
				<div>Features</div>
				{tiers && tiers.map((tier, index) => (
					<div key={index} className={`app-autosoftway-pricing-table-tier ${tier.isPopular ? 'app-autosoftway-pricing-popular-background' : ''}`}>
						{tier.isPopular && <div className='app-autosoftway-pricing-table-tier-popular-badge'>Most Popular</div>}
						{tier.name}
						<div className='app-autosoftway-pricing-table-tier-price'>
							<span className='app-autosoftway-pricing-table-tier-price-cad'>{tier.priceCAD}</span>
							<span className='app-autosoftway-pricing-table-tier-price-usd'> / {tier.priceUSD} USD</span>
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
									<div key={index} className={`app-autosoftway-pricing-table-checkmark ${tier.isPopular ? 'app-autosoftway-pricing-popular-background' : ''}`}>
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

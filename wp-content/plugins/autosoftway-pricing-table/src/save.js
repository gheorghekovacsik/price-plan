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

	// If there is no fallbackCurrentYear, which could happen if the block
	// is loaded from a template/pattern, return null. In this case, block
	// rendering will be handled by the render.php file.
	
	return <div { ...useBlockProps().save() } className="app-autosoftway-pricing-table">
					<div className='app-autosoftway-pricing-table-desktop-header'>
						<div>
							Features
						</div>
						{attributes.tiers && attributes.tiers.map((tier, index) => (
							<div key={index} className={`app-autosoftway-pricing-table-tier ${tier.isPopular ? 'app-autosoftway-pricing-popular-background' : ''}`}>
								{
								  tier.isPopular && <div className='app-autosoftway-pricing-table-tier-popular-badge'>Most Popular</div>
								}
								{tier.name}
								<div className='app-autosoftway-pricing-table-tier-price'>
									<span className='app-autosoftway-pricing-table-tier-price-cad'>{tier.priceCAD}</span>
									<span className='app-autosoftway-pricing-table-tier-price-usd'> / {tier.priceUSD} USD</span>
								</div>
								<a href={tier.buttonUrl} className={`app-autosoftway-pricing-table-tier-button`}>
									{tier.buttonText}
								</a>
							</div>
						))}
					</div>
					<div className='app-autosoftway-pricing-table-tabs'>
						{attributes.featureCategories && attributes.featureCategories.map((category, index) => (
							<div key={index} className="app-autosoftway-pricing-table-tab">
								{category.name}
							</div>
						))}
					</div>
					<div className='app-autosoftway-pricing-table-desktop-features'>
						{attributes.featureCategories && attributes.featureCategories.map((category, categoryIndex) => (
							<div key={categoryIndex} className="app-autosoftway-pricing-table-feature-category">
								<div className="app-autosoftway-pricing-table-feature-category-name">
									{category.name}
								</div>
								{category.features && category.features.map((feature, featureIndex) => (
									<div key={featureIndex} className="app-autosoftway-pricing-table-feature-row">
										<div className="app-autosoftway-pricing-table-feature-name">
											{feature.name}
										</div>
										{attributes.tiers && attributes.tiers.map((tier, index) => (
											<div key={index} className={`app-autosoftway-pricing-table-checkmark ${tier.isPopular ? 'app-autosoftway-pricing-popular-background' : ''}`}>
												{tier.features && tier.features.includes(feature.id) ? checkMarkIcon : hyphenIcon}
											</div>
										))}
									</div>
								))}
							</div>
						))}
					</div>
				</div>;
}

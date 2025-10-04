/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Imports the InspectorControls component, which is used to wrap
 * the block's custom controls that will appear in in the Settings
 * Sidebar when the block is selected.
 *
 * Also imports the React hook that is used to mark the block wrapper
 * element. It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#inspectorcontrols
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

/**
 * Imports the necessary components that will be used to create
 * the user interface for the block's settings.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/
 */
import { PanelBody, TextControl, ToggleControl, Grid, CheckboxControl, CardDivider, __experimentalHStack as HStack, Button, SVG, Path, __experimentalSpacer as Spacer } from '@wordpress/components';

/**
 * Imports the useEffect React Hook. This is used to set an attribute when the
 * block is loaded in the Editor.
 *
 * @see https://react.dev/reference/react/useEffect
 */
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { tiers, featureCategories } = attributes;

	const deleteIcon = (
						<SVG width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<Path d="M4 6H20L18.4199 20.2209C18.3074 21.2337 17.4512 22 16.4321 22H7.56786C6.54876 22 5.69264 21.2337 5.5801 20.2209L4 6Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#fff"/>
							<Path d="M7.34491 3.14716C7.67506 2.44685 8.37973 2 9.15396 2H14.846C15.6203 2 16.3249 2.44685 16.6551 3.14716L18 6H6L7.34491 3.14716Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#fff"/>
							<Path d="M2 6H22" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<Path d="M10 11V16" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<Path d="M14 11V16" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</SVG>
					);

	const checkMarkIcon = (
		<SVG width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<Path d="M5 13l4 4L19 7" stroke="#36ce3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
		</SVG>
	);

	const hyphenIcon = (
		<SVG width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<Path d="M5 13h14" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
		</SVG>
	);


	// When the block loads, set the fallbackCurrentYear attribute to the
	// current year if it's not already set.
	useEffect( () => {
		if (!tiers || tiers.length === 0) {
			setAttributes({tiers:[{
					name: "Free", features: [], priceCAD: "$0", priceUSD: "$0", buttonText: "Sign Up", buttonUrl: "#", isPopular: false
				},
				{
					name: "Basic", features: [], priceCAD: "$10", priceUSD: "$8", buttonText: "Get Started", buttonUrl: "#", isPopular: false
				},
				{
					name: "Standard", features: [], priceCAD: "$20", priceUSD: "$16", buttonText: "Sign Up", buttonUrl: "#", isPopular: true
				},
				{
					name: "Premium", features: [], priceCAD: "$30", priceUSD: "$24", buttonText: "Get Started", buttonUrl: "#", isPopular: false
				}
			]});
		}
		if (!featureCategories || featureCategories.length === 0) {
			setAttributes({featureCategories: [
				{id: uuidv4(), name: "Category 1", features: [
					{id: uuidv4(), name: "Feature 1"},
					{id: uuidv4(), name: "Feature 2"},
					{id: uuidv4(), name: "Feature 3"},
					{id: uuidv4(), name: "Feature 4"}
				]},
				{id: uuidv4(), name: "Category 2", features: [
					{id: uuidv4(), name: "Feature 5"}
				]}
			]});
		}
	}, [ tiers, featureCategories ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Features', 'autosoftway-pricing-table' ) }>
					<>
						{ attributes.featureCategories && attributes.featureCategories.map( ( category, categoryIndex ) => (
							<div key={ categoryIndex }>
								<HStack key={ categoryIndex } gap="0" justify="start">
									<TextControl
										key={ `category-name-${categoryIndex}` }
										label={ __( 'Category Name:', 'autosoftway-pricing-table' ) }
										value={ category.name }
										onChange={ ( value ) => {
											const newCategories = [ ...attributes.featureCategories ];
											newCategories[ categoryIndex ].name = value;
											setAttributes( { featureCategories: newCategories } );
										} }
									/>
									<Button
										style={{ padding: '0px', height: '24px', width: '24px', minWidth: '24px' }}
										icon={deleteIcon}
										label="Delete"
										onClick={ () => {
											const newFeatureCategories = [ ...attributes.featureCategories ];
											newFeatureCategories.splice( categoryIndex, 1 );
											setAttributes( { featureCategories: newFeatureCategories } );
										} }
									/>
								</HStack>
								<br />
								{ category.features && category.features.map( ( feature, featureIndex ) => (
									<HStack key={ featureIndex } gap="0" justify="start">
										<TextControl
											label={ __( `Feature ${ featureIndex + 1 }`, 'autosoftway-pricing-table' ) }
											value={ feature.name }
											onChange={ ( value ) => {
												const features = [ ...category.features ];
												features[ featureIndex ].name = value;
												setAttributes( { featureCategories: [ ...attributes.featureCategories.slice( 0, categoryIndex ), { ...category, features }, ...attributes.featureCategories.slice( categoryIndex + 1 ) ] } );
											} }
										/>
										<Button
											style={{ padding: '0px', height: '24px', width: '24px', minWidth: '24px' }}
											icon={deleteIcon}
											label="Delete"
											onClick={ () => {
												const newFeatures = [ ...category.features ];
												newFeatures.splice( featureIndex, 1 );
												const newFeatureCategories = [ ...attributes.featureCategories ];
												newFeatureCategories[ categoryIndex ] = { ...category, features: newFeatures };
												setAttributes( { featureCategories: newFeatureCategories } );
											} }
										/>
									</HStack>
								) ) }
								<button
									style={{ marginTop: '12px' }}
									className="components-button is-primary"
									onClick={ () => {
										const newFeatures = [ ...category.features ];
										newFeatures.push( { id: uuidv4(), name: `Feature ${ newFeatures.length + 1 }` } );
										const newFeatureCategories = [ ...attributes.featureCategories ];
										newFeatureCategories[ categoryIndex ] = { ...category, features: newFeatures };
										setAttributes( { featureCategories: newFeatureCategories } );
									} }
								>
									{ __( 'Add Feature', 'autosoftway-pricing-table' ) }
								</button>
								<CardDivider />
							</div>
						) ) }
						<button
							style={{ marginTop: '12px' }}
							className="components-button is-primary"
							onClick={ () => {
								const newCategories = [ ...attributes.featureCategories ];
								newCategories.push( { id: uuidv4(), name: `Category ${ newCategories.length + 1 }`, features: [] } );
								setAttributes( { featureCategories: newCategories } );
							} }
						>
							{ __( 'Add Category', 'autosoftway-pricing-table' ) }
						</button>
						
					</>
				</PanelBody>
				<PanelBody title={ __( 'Tiers', 'autosoftway-pricing-table' ) }>
					{ attributes.tiers && attributes.tiers.map( ( tier, index ) => (
						<>
							<label style={{ fontWeight: 'bold', marginTop: '12px' }}>{ __( `Tier ${ index + 1 }`, 'autosoftway-pricing-table' ) }</label>
							<TextControl
								key={ `name-${index}` }
								label={ __( `Name:`, 'autosoftway-pricing-table' ) }
								value={ tier.name }
								onChange={ ( value ) => {
									const newTiers = [ ...attributes.tiers ];
									newTiers[ index ].name = value;
									setAttributes( { tiers: newTiers } );
								} }
							/>
							<TextControl
								key={ `usd-${index}` }
								label={ __( `Price USD:`, 'autosoftway-pricing-table' ) }
								value={ tier.priceUSD }
								onChange={ ( value ) => {
									const newTiers = [ ...attributes.tiers ];
									newTiers[ index ].priceUSD = value;
									setAttributes( { tiers: newTiers } );
								} }
							/>
							<TextControl
								key={ `cad-${index}` }
								label={ __( `Price CAD:`, 'autosoftway-pricing-table' ) }
								value={ tier.priceCAD }
								onChange={ ( value ) => {
									const newTiers = [ ...attributes.tiers ];
									newTiers[ index ].priceCAD = value;
									setAttributes( { tiers: newTiers } );
								} }
							/>
							{ attributes.featureCategories.length > 0 && attributes.featureCategories.map( ( featureCategory, featureCategoryIndex ) => (
								<>
									<label style={{ fontWeight: 'bold' }}>{ __( featureCategory.name, 'autosoftway-pricing-table' ) }</label>
									<Spacer height="8px" />
									{ featureCategory.features && featureCategory.features.map( ( feature, featureIndex ) => (
										<CheckboxControl
											key={ `feature-${featureCategoryIndex}-${featureIndex}` }
											label={ feature.name }
											checked={ tier.features && tier.features.includes( feature.id ) }
											onChange={ ( isChecked ) => {
												const newTiers = [ ...attributes.tiers ];
												if ( isChecked ) {
													if ( !newTiers[ index ].features ) {
														newTiers[ index ].features = [];
													}
													newTiers[ index ].features.push( feature.id );
												} else {
													newTiers[ index ].features = newTiers[ index ].features.filter( ( id ) => id !== feature.id );
												}
												setAttributes( { tiers: newTiers } );
											} }
										/>
									) ) }
								</>
								
							) ) }
							<CardDivider />
						</>
					) ) }
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
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
			</div>
		</>
	);
}

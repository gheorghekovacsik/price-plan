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
import { PanelBody, TextControl, ToggleControl, Grid, CheckboxControl, CardDivider, __experimentalHStack as HStack, Button, SVG, Path } from '@wordpress/components';

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
	const { fallbackCurrentYear, showStartingYear, startingYear, tiers, features } = attributes;

	// Get the current year and make sure it's a string.
	const currentYear = new Date().getFullYear().toString();

	const deleteIcon = (
						<SVG width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<Path d="M4 6H20L18.4199 20.2209C18.3074 21.2337 17.4512 22 16.4321 22H7.56786C6.54876 22 5.69264 21.2337 5.5801 20.2209L4 6Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#fff"/>
							<Path d="M7.34491 3.14716C7.67506 2.44685 8.37973 2 9.15396 2H14.846C15.6203 2 16.3249 2.44685 16.6551 3.14716L18 6H6L7.34491 3.14716Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#fff"/>
							<Path d="M2 6H22" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<Path d="M10 11V16" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<Path d="M14 11V16" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</SVG>
					);

	// When the block loads, set the fallbackCurrentYear attribute to the
	// current year if it's not already set.
	useEffect( () => {
		if ( currentYear !== fallbackCurrentYear ) {
			setAttributes( { fallbackCurrentYear: currentYear } );
		}
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
		if (!features || features.length === 0) {
			setAttributes({features: [
				{id: uuidv4(), name: "Feature 1"}, {id: uuidv4(), name: "Feature 2"}, {id: uuidv4(), name: "Feature 3"}, {id: uuidv4(), name: "Feature 4"}
			]});
		}
	}, [ currentYear, fallbackCurrentYear, setAttributes, tiers, features ] );

	let displayDate;

	// Display the starting year as well if supplied by the user.
	if ( showStartingYear && startingYear ) {
		displayDate = startingYear + '–' + currentYear;
	} else {
		displayDate = currentYear;
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'autosoftway-pricing-table' ) }>
					<ToggleControl
						checked={ showStartingYear }
						label={ __(
							'Show starting year',
							'autosoftway-pricing-table'
						) }
						onChange={ () =>
							setAttributes( {
								showStartingYear: ! showStartingYear,
							} )
						}
					/>
					{ showStartingYear && (
						<TextControl
							label={ __(
								'Starting year',
								'autosoftway-pricing-table'
							) }
							value={ startingYear }
							onChange={ ( value ) =>
								setAttributes( { startingYear: value } )
							}
						/>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Features', 'autosoftway-pricing-table' ) }>
					<>
						{ attributes.features && attributes.features.map( ( feature, index ) => (
							<HStack key={ index } gap="0" justify="start">
								<TextControl
									label={ __( `Feature ${ index + 1 }`, 'autosoftway-pricing-table' ) }
									value={ feature.name }
									onChange={ ( value ) => {
										const newFeatures = [ ...attributes.features ];
										newFeatures[ index ].name = value;
										setAttributes( { features: newFeatures } );
									} }
								/>
								<Button
									style={{ padding: '0px', height: '24px', width: '24px', minWidth: '24px' }}
									icon={deleteIcon}
									label="Delete"
									onClick={ () => {
										const newFeatures = [ ...attributes.features ];
										newFeatures.splice( index, 1 );
										setAttributes( { features: newFeatures } );
									} }
								/>
							</HStack>
						) ) }
						<button
							style={{ marginTop: '12px' }}
							className="components-button is-primary"
							onClick={ () => {
								const newFeatures = [ ...attributes.features ];
								newFeatures.push( { id: uuidv4(), name: `Feature ${ newFeatures.length + 1 }` } );
								setAttributes( { features: newFeatures } );
							} }
						>
							{ __( 'Add Feature', 'autosoftway-pricing-table' ) }
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
							{ attributes.features && attributes.features.map( ( feature, featureIndex ) => (
								<CheckboxControl
									key={ featureIndex }
									label={ __( feature.name, 'autosoftway-pricing-table' ) }
									checked={ tier.features.includes( feature.id ) }
									onChange={ ( value ) => {
										const newTiers = [ ...attributes.tiers ];
										if ( value ) {
											newTiers[ index ].features.push( feature.id );
										} else {
											newTiers[ index ].features = newTiers[ index ].features.filter( ( id ) => id !== feature.id );
										}
										setAttributes( { tiers: newTiers } );
									} }
								/>
							) ) }
							<CardDivider />
						</>
					) ) }
				</PanelBody>
			</InspectorControls>
			<p { ...useBlockProps() }>© { displayDate }</p>
		</>
	);
}

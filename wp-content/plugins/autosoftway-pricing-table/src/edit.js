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
import { PanelBody, TextControl, ToggleControl, Grid, CheckboxControl, CardDivider, HStack, Button, SVG, Path } from '@wordpress/components';

/**
 * Imports the useEffect React Hook. This is used to set an attribute when the
 * block is loaded in the Editor.
 *
 * @see https://react.dev/reference/react/useEffect
 */
import { useEffect } from 'react';

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
				{id: "0", name: "Feature 1"}, {id: "1", name: "Feature 2"}, {id: "2", name: "Feature 3"}, {id: "3", name: "Feature 4"}
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
						<HStack>
							<TextControl
								key={ index }
								label={ __( `Feature ${ index + 1 }`, 'autosoftway-pricing-table' ) }
								value={ feature.name }
								onChange={ ( value ) => {
									const newFeatures = [ ...attributes.features ];
									newFeatures[ index ].name = value;
									setAttributes( { features: newFeatures } );
								} }
							/>
							{/* <Button
								icon={<SVG viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg"><Path d="M20 10c0-5.51-4.49-10-10-10C4.48 0 0 4.49 0 10c0 5.52 4.48 10 10 10 5.51 0 10-4.48 10-10zM7.78 15.37L4.37 6.22c.55-.02 1.17-.08 1.17-.08.5-.06.44-1.13-.06-1.11 0 0-1.45.11-2.37.11-.18 0-.37 0-.58-.01C4.12 2.69 6.87 1.11 10 1.11c2.33 0 4.45.87 6.05 2.34-.68-.11-1.65.39-1.65 1.58 0 .74.45 1.36.9 2.1.35.61.55 1.36.55 2.46 0 1.49-1.4 5-1.4 5l-3.03-8.37c.54-.02.82-.17.82-.17.5-.05.44-1.25-.06-1.22 0 0-1.44.12-2.38.12-.87 0-2.33-.12-2.33-.12-.5-.03-.56 1.2-.06 1.22l.92.08 1.26 3.41zM17.41 10c.24-.64.74-1.87.43-4.25.7 1.29 1.05 2.71 1.05 4.25 0 3.29-1.73 6.24-4.4 7.78.97-2.59 1.94-5.2 2.92-7.78zM6.1 18.09C3.12 16.65 1.11 13.53 1.11 10c0-1.3.23-2.48.72-3.59C3.25 10.3 4.67 14.2 6.1 18.09zm4.03-6.63l2.58 6.98c-.86.29-1.76.45-2.71.45-.79 0-1.57-.11-2.29-.33.81-2.38 1.62-4.74 2.42-7.1z" /></SVG>}
								label="Code is poetry"
								></Button> */}
						</HStack>
					) ) }
					<button
						style={{ marginTop: '12px' }}
						className="components-button is-primary"
						onClick={ () => {
							const newFeatures = [ ...attributes.features ];
							newFeatures.push( { id: (newFeatures.length).toString(), name: `Feature ${ newFeatures.length + 1 }` } );
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
								key={ index }
								label={ __( `Name:`, 'autosoftway-pricing-table' ) }
								value={ tier.name }
								onChange={ ( value ) => {
									const newTiers = [ ...attributes.tiers ];
									newTiers[ index ].name = value;
									setAttributes( { tiers: newTiers } );
								} }
							/>
							<TextControl
								key={ index }
								label={ __( `Price USD:`, 'autosoftway-pricing-table' ) }
								value={ tier.priceUSD }
								onChange={ ( value ) => {
									const newTiers = [ ...attributes.tiers ];
									newTiers[ index ].priceUSD = value;
									setAttributes( { tiers: newTiers } );
								} }
							/>
							<TextControl
								key={ index }
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

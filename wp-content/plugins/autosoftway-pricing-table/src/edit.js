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
import { PanelBody, TextControl, ToggleControl, Grid } from '@wordpress/components';

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
	const { fallbackCurrentYear, showStartingYear, startingYear, tiers } = attributes;

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
					name: "Free", features: ["Feature 1", "Feature 2", "Feature 3"], priceCAD: "$0", priceUSD: "$0", buttonText: "Sign Up", buttonUrl: "#", isPopular: false
				},
				{
					name: "Basic", features: ["Feature 1", "Feature 2"], priceCAD: "$10", priceUSD: "$8", buttonText: "Get Started", buttonUrl: "#", isPopular: false
				},
				{
					name: "Standard", features: ["Feature 1", "Feature 2", "Feature 3"], priceCAD: "$20", priceUSD: "$16", buttonText: "Sign Up", buttonUrl: "#", isPopular: true
				},
				{
					name: "Premium", features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"], priceCAD: "$30", priceUSD: "$24", buttonText: "Get Started", buttonUrl: "#", isPopular: false
				}
			]});
		}
	}, [ currentYear, fallbackCurrentYear, setAttributes, tiers ] );

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
				<PanelBody title={ __( 'Tiers', 'autosoftway-pricing-table' ) }>
					{ attributes.tiers && attributes.tiers.map( ( tier, index ) => (
						<TextControl
							key={ index }
							label={ __( `Tier ${ index + 1 }`, 'autosoftway-pricing-table' ) }
							value={ tier.name }
							onChange={ ( value ) => {
								const newTiers = [ ...attributes.tiers ];
								newTiers[ index ].name = value;
								setAttributes( { tiers: newTiers } );
							} }
						/>
					) ) }
				</PanelBody>
			</InspectorControls>
			<p { ...useBlockProps() }>© { displayDate }</p>
		</>
	);
}

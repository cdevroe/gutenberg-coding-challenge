export function getEmojiFlag( countryCode ) {
	return String.fromCodePoint(
		...countryCode
			.toUpperCase()
			.split( '' )
			.map( ( char ) => 127397 + char.charCodeAt() )
	);
}

/*
	I wasn't sure what XWP would name this utility function.
	filterExcerpt? getExcerpt(seems incorrect)
	So I went with formatExcerpt

	Function comments
	Accepts:
		excerpt
		excerptLength
	Returns:
		If excerpt is longer than excerptLength
			Excerpt without HTML trimmed to desired length ending in ...
		Else 
			Empty string
*/
export function formatExcerpt( excerpt, excerptLength ) {
	if ( ! excerpt ) return '';

	if ( excerpt.length > excerptLength ) {
		return (
			excerpt.replace( /<[^>]*>?/gm, '' ).substring( 0, excerptLength ) +
			'...'
		);
	}
	return '';
}

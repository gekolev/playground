const removeDiacritics = require('diacritics').remove

export function capitalize (str) {
  if (typeof str !== 'string') { return str }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function sanitize (str) {
  if (!str) { return }
  const g = removeDiacritics(str)
  return g
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

export function strip_tags( _html ) {
    var _tags = [], _tag = "";
    for ( var _a = 1 ; _a < arguments.length ; _a++ ) {
        _tag = arguments[_a].replace(/[<>\/]/g, '').trim();
        if ( arguments[_a].length > 0 ) _tags.push( _tag );
    }

    if ( !( typeof _html == "string" ) && !( _html instanceof String ) ) return "";

    else if ( _tags.length == 0 ) return _html.replace( /<\s*\/?[^>]+>/g, "" );

    else {
        var _re = new RegExp( "<(?!\\s*\\/?(" + _tags.join("|") + ")\\s*\\/?>)[^>]*>", "g" );
        return _html.replace( _re, '' );
    }
}

export function stripHtmlWithBreaks (str) {
  if (typeof str !== 'string') { return '' }

  return str.replace(/<(?!br\s*\/?)[^>]+>/g, '')
}

export function stripHtml (str) {
  if (typeof str !== 'string') { return '' }
  return str
    .replace(/<(?:.|\n)*?>/gm, '')
    .replace(/^\s+|\s+$/gm, '')
}

export function convertToSlug (str) {
  return str ? str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '') : null
}

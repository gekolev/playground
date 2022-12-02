import _get from 'lodash/get'
import _isObject from 'lodash/isObject'
import _isArray from 'lodash/isArray'
import _last from 'lodash/last'
import _includes from 'lodash/includes'
import _each from 'lodash/each'
import _isNumber from 'lodash/isNumber'
import _isNaN from 'lodash/isNaN'

export function getImg({image, key, size, quality = 80, noWebp, webpSupported}) {
    if (!image) {
        return
    }

    let img

    if(_isArray(key)){
        _each(key, (k) => {
            image = _get(image, `fields.${k}`) || image

            if(image) {
                img = _isArray(image) ? _get(image, '[0].fields.file.url') : _get(image, 'fields.file.url')
                return 
            }
        })
    }
    else if (!_isObject(image)) {
        img = image
    } else {
        // check if the image is asset
        const isImage = image.sys && image.sys.type === 'Asset'
        if (!isImage && !image.fields) { return }

        image = img = isImage ? image : image.fields[key]
        img = _isArray(img) ? _get(img, '[0].fields.file.url') : _get(img, 'fields.file.url')
    }

    if (!img) {
        return false
    }

    // add extension
    let ext = _last(img.split('.'))

    let desc = _get(image, 'fields.description') || _get(image, '[0].fields.description')
    let noTransformation = _includes(desc, 'OFF')

    img = size ? `${img + size}&` : `${img}?`
    
    if (webpSupported && !noWebp && ext != 'svg' && !noTransformation) {
        img += 'fm=webp'
    } else {
        if (ext == 'webp') {
            img += "fm=jpg&"
        }
        img += "fl=progressive"
    }


    // manual optimisation
    if (desc) {
        quality = _get(desc.split(/[()]/), '1') * 1
        quality = _isNumber(quality * 1) && (!_isNaN(quality * 1)) ? quality : 80
    }

    return `https:${img}&q=${quality}`
}
// Common functions
import Vue from 'vue'
import {
    capitalize,
    convertToSlug,
    stripHtml,
    strip_tags,
    stripHtmlWithBreaks
} from '@/utils/stringUtils'
import {
    getHostName
} from '@/utils/urlUtils'
const removeDiacritics = require('diacritics').remove

import _get from 'lodash/get'
import _isNumber from 'lodash/isNumber'
import _map from 'lodash/map'
import _last from 'lodash/last'

const common = {
    install(options) {
        /* eslint-disable */

        /**
         * Number.prototype.formatMoney - description
         * usage: (123456789.12345).formatMoney(2, '.', ',');
         */
        Number.prototype.formatMoney = function(c, d, t) {
            var n = this,
                c = isNaN(c = Math.abs(c)) ? 0 : c,
                d = d == undefined ? '.' : d,
                t = t == undefined ? ',' : t,
                s = n < 0 ? '-' : '',
                i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
                j = (j = i.length) > 3 ? j % 3 : 0;
            return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(
                c).slice(2) : '');
        };

        // @TODO use { sanitize } from '@/utils/stringUtils'
        String.prototype.sanitize = function() {
            if (!this) { return }
            const g = removeDiacritics(this)
            return g
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
        }

        // @TODO use { capitalize } from '@/utils/stringUtils'
        String.prototype.capitalize = function() {
            if (typeof this !== 'string') { return this }
            return this.charAt(0).toUpperCase() + this.slice(1)
        }

        Vue.prototype.strip_tags = strip_tags
        
        Vue.prototype.stripHtmlWithBreaks = stripHtmlWithBreaks

        // @see '/utils/stringUtils.js#convertToSlug'
        Vue.prototype.convertToSlug = convertToSlug

        // @see '/utils/stringUtils.js#capitalize'
        Vue.prototype.capitalize = capitalize

        // @see { getHostName } from '@/utils/urlUtils'
        Vue.prototype.getHostName = getHostName

        // USE LIKE THIS --> this.loadImage(imgUrl).then(() => {});
        Vue.prototype.loadImage = (url) => {
            return new Promise((resolve, reject) => {
                const img = new Image()
                img.onload = () => { resolve(url) }
                img.onerror = () => { reject(url) }
                img.src = url
            })
        }

        // USE LIKE THIS --> this.loadImages([imgUrls]).then(() => {});
        Vue.prototype.loadImages = (options) => {
            let imageCount = 0
            const images = []

            if (!options.urls) {
                options.callback && options.callback()
                return
            }

            options.urls.forEach((src) => { // for each image url
                const image = new Image()
                image.src = src

                image.onload = () => {
                    imageCount += 1
                    if (imageCount === options.urls.length) {
                        // have all loaded ????
                        options.callback && options.callback()
                        return images
                    }
                }
                images.push(image) // add loading image to images array
            })
        }
    }
}

Vue.use(common)
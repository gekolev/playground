const express = require('express')
const app = express()
const link = 'https://bizzon.rbln7.com/';
const SitemapGenerator = require('sitemap-generator');
const router = express.Router()

// options
let options = {
  stripQuerystring: false,
  filepath: './static/sitemap.xml',
  priorityMap: [1.0, 0.8, 0.6, 0.4, 0.2, 0]
}

const generator = SitemapGenerator(link, options);

router.get('/generate', async (req, res, next) => {
  try {
	generator.stop();
	generator.on('done', () => {
		// sitemaps created
		console.log('done');
	});

	res.send(`Sitemap creation started. After finisihing, it will be available here: ${link}/sitemap.xml`)
	// start the crawler
	generator.start();

  } catch (err) {
    next(err)
  }
})

module.exports = router

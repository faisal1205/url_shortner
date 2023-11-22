// routes/urlRoutes.js
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');


router.post('/shorten', urlController.createUrl);//eg: http://localhost:8001/api/shorten
router.get('/details/:shortUrl', urlController.getUrlDetails);//eg: http://localhost:8001/api/details/ljea30
router.get('/visitors/:shortUrl', urlController.getAllVisitors);//eg: http://localhost:8001/api/visitors/ljea30
router.get('/allUrls', urlController.getAllUrls);////eg: http://localhost:8001/api/allUrls
router.get('/:shortUrl', urlController.redirectToOriginalUrl);//eg: http://localhost:8001/api/ljea30
router.post('/hi',urlController.hello);
router.put('/:shortUrl', urlController.updateUrlExpiry);//http://localhost:8001/api/ljea30
router.delete('/:shortUrl', urlController.deleteUrl);//http://localhost:8001/api/ljea30


module.exports = router;

const express = require('express')
const router = express()

router.get('/', (req, res) => {
    res.send('Frontend linked to backend')
})

module.exports = router;
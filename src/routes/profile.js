const router = require('express').Router()
const { getUserByEmail } = require('../controllers/users')
router.get('/profile', async (req, res) => {
  try {
    const data = await getUserByEmail(req.user.email)
    await data.reload()
    const user = {
      id: data.id,
      email: data.email,
    }
    res.status(200).json(user)
    console.log(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

module.exports = router

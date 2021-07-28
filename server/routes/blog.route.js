const router = require("express").Router();
const { blogController } = require("../controller/blog.controller");
const auth = require("../middleware/auth");

router.post("/createpost", auth, blogController.createBlog);
router.get("/getpost", auth, blogController.getblog);
router.post("/updatepost/:id", auth, blogController.updateBlog);
router.delete("/deletepost/:id", auth, blogController.deleteBlog);

module.exports = router;
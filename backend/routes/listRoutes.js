const path = require("path");
const express = require("express");
const router = express.Router();

const {
  getAllList,
  addItemToList,
  createNewList,
  deleteItemFromList,
  updateItemToList,
  removeList,
  updateListItems,
} = require(path.join(process.cwd(), "./backend/controllers/listController"));

const { isAuthenticated } = require(path.join(
  process.cwd(),
  "./backend/utils/auth"
));

router.route("/all-lists").get(isAuthenticated, getAllList);
router.route("/new-list").post(isAuthenticated, createNewList);
router.route("/add-item").post(isAuthenticated, addItemToList);
router.route("/remove-item").delete(isAuthenticated, deleteItemFromList);
router.route("/update-item/:id").put(isAuthenticated, updateItemToList);
router.route("/remove-list/:id").delete(isAuthenticated, removeList);
router.route("/update-list").put(isAuthenticated, updateListItems);

module.exports = router;

// require path module
const path = require("path");

//******************* * REQUIRING THE SCHEMAS   ***********************//

const listSchema = require(path.join(process.cwd(), "./backend/models/List"));
const userSchema = require(path.join(process.cwd(), "./backend/models/User"));

// ERROR HANDLER
const { ErrorHandler } = require(path.join(
  process.cwd(),
  "./backend/utils/errorHandler"
));

// MESSAGE HANDLER
const SuccessMessage = require(path.join(
  process.cwd(),
  "./backend/utils/message"
));

// CATCH ASYNC MIDDLEWARE
const { CatchAsyncError } = require(path.join(
  process.cwd(),
  "./backend/middlewares/CatchAsyncError"
));

// ====  CREATE NEW LIST ======//

module.exports.getAllList = CatchAsyncError(async (req, res, next) => {
  let allList = await listSchema.find({ user: req.user._id });
  return res.status(200).json({
    success: true,
    listCount: allList.length,
    lists: allList.reverse(),
  });
});

// ====  CREATE NEW LIST ======//
module.exports.createNewList = CatchAsyncError(async (req, res, next) => {
  // create an empty list of doc
  const user = await userSchema.findById(req.user._id);

  //   check if the list name already exists or not
  let list = await listSchema.findOne({
    $and: [{ listname: req.body.listname, user: req.user._id }],
  });
  if (list) {
    return next(new ErrorHandler(403, "List name Already Exists"));
  }
  // if the list not found then create new list
  list = await listSchema.create({
    user: req.user._id,
    listname: req.body.listname,
  });

  user.lists.push(list._id);
  await list.save();
  await user.save();

  return res.status(200).json({
    success: true,
    list: {
      message: "List Created",
      list,
    },
  });
});

//======== CREATE ITEM INSIDE LIST ========//

module.exports.addItemToList = CatchAsyncError(async (req, res, next) => {
  const listId = req.query.list_id;
  let list = await listSchema.findById({ _id: listId });
  // add new items to the list
  if (list) {
    const itemObj = {
      item: req.body.item,
    };

    list.items.push(itemObj);
    await list.save();
    return res.status(201).json({
      success: true,
      newItem: {
        message: "Item Added",
        item: req.body.item,
      },
    });
  } else {
    return next(new ErrorHandler(403, "List Not Found"));
  }
});

// DELETE ITEM

module.exports.deleteItemFromList = CatchAsyncError(async (req, res, next) => {
  const listId = req.query.list_id;
  let list = await listSchema.findById({ _id: listId });
  let user = await userSchema.findById({ _id: req.user._id });

  if (list) {
    let itemIndex = null;
    list.items.forEach((item, index) => {
      if (item._id.toString() === req.query.item_id.toString()) {
        itemIndex = index;
        return;
      }
    });

    // remove the item from array
    list.items.splice(itemIndex, 1);

    // save the list
    await list.save();

    if (list.items.length == 0) {
      // remove the list
      await listSchema.deleteOne({ _id: listId });
      //   remove from the user lists
      let index = user.lists.indexOf(listId.toString());

      // remove the item from array
      user.lists.splice(index, 1);
      await user.save();
    }
    // throw the message
    return SuccessMessage(200, "Item removed", res);
  }
});

// UPDATE ITEM

module.exports.updateItemToList = CatchAsyncError(async (req, res, next) => {
  const { listId } = req.body;

  let list = await listSchema.findById({ _id: listId });
  if (!list) {
    return next(new ErrorHandler(403, "List Not Found"));
  }

  if (list) {
    let itemIndex = null;
    list.items.forEach((item, index) => {
      if (item._id.toString() === req.params.id.toString()) {
        itemIndex = index;
        return;
      }
    });

    let status = list.items[itemIndex].isCompleted;
    list.items[itemIndex].isCompleted = !status;
    await list.save();
    // throw the message
    return SuccessMessage(200, "Item updated", res);
  }
});

// REMOVE LIST
module.exports.removeList = CatchAsyncError(async (req, res, next) => {
  const listId = req.params.id;
  let user = await userSchema.findById({ _id: req.user._id });

  if (user.lists.includes(listId)) {
    user.lists.splice(user.lists.indexOf(listId), 1);
  }
  await user.save();
  await listSchema.findByIdAndDelete(listId);
  return SuccessMessage(200, "List Removed", res);
});

module.exports.updateListItems = CatchAsyncError(async (req, res, next) => {
  const oldListId = req.query.lid;
  const updateListId = req.query.drag_lid;
  console.log(oldListId);
  console.log(updateListId);
  console.log(req.body._id);

  let itemObject = null;

  // FIND THE ITEM OBJECT
  let oldList = await listSchema.findById({ _id: oldListId });
  if (oldList) {
    let itemIndex = null;
    oldList.items.forEach((item, index) => {
      if (item._id.toString() === req.body._id.toString()) {
        itemIndex = index;
        return;
      }
    });

    // CREATE THE OBJECT AFTER FIND THE ITEM
    itemObject = {
      _id: req.body._id,
      item: oldList.items[itemIndex].item,
      isCompleted: oldList.items[itemIndex].isCompleted,
    };

    // FIND THE LIST ON WHICH ACTION IS PERFORMED

    let listToChange = await listSchema.findById({ _id: updateListId });

    if (!listToChange) {
      return next(new ErrorHandler(403, "List Not Found"));
    }

    // IF WE HAVE  FOUND THE LIST

    if (listToChange) {
      if (listToChange.items.includes(req.body._id)) {
        return;
      } else {
        listToChange.items.push(itemObject);
        await listToChange.save();
        // remove the item from array
        oldList.items.splice(itemIndex, 1);
        await oldList.save();
        return SuccessMessage(200, "List Item updated", res);
      }
    }
  }
});

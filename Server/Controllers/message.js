import User from "./../Model/user.js";
import Message from "./../Model/message.js";
import formidable from "formidable";
import fs from "fs";

const getLastMessage = async (myId, fdId) => {
  const msg = await Message.findOne({
    $or: [
      {
        $and: [
          {
            senderId: {
              $eq: myId,
            },
          },
          {
            reseverId: {
              $eq: fdId,
            },
          },
        ],
      },
      {
        $and: [
          {
            senderId: {
              $eq: fdId,
            },
          },
          {
            reseverId: {
              $eq: myId,
            },
          },
        ],
      },
    ],
  }).sort({
    updatedAt: -1,
  });
  return msg;
};

export const getFriends = async (req, res) => {
  const myId = req.userID;
  let fnd_msg = [];
  try {
    const friendGet = await User.find({
      _id: {
        $ne: myId,
      },
    });
    for (let i = 0; i < friendGet.length; i++) {
      let lmsg = await getLastMessage(myId, friendGet[i].id);
      fnd_msg = [
        ...fnd_msg,
        {
          fndInfo: friendGet[i],
          msgInfo: lmsg,
        },
      ];
    }

    res.status(200).json({ success: true, friends: fnd_msg });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

export const messageUploadDB = async (req, res) => {
  const { senderName, reseverId, message } = req.body;
  const senderId = req.userID;

  try {
    const insertMessage = await Message.create({
      senderId: senderId,
      senderName: senderName,
      reseverId: reseverId,
      message: {
        text: message,
        image: "",
      },
    });
    res.status(201).json({
      success: true,
      message: insertMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

export const messageGet = async (req, res) => {
  const myId = req.userID;
  const fdId = req.params.id;

  try {
    let getAllMessage = await Message.find({
      $or: [
        {
          $and: [
            {
              senderId: {
                $eq: myId,
              },
            },
            {
              reseverId: {
                $eq: fdId,
              },
            },
          ],
        },
        {
          $and: [
            {
              senderId: {
                $eq: fdId,
              },
            },
            {
              reseverId: {
                $eq: myId,
              },
            },
          ],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: getAllMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

export const ImageMessageSend = (req, res) => {
  const senderId = req.userID;
  const form = formidable();

  form.parse(req, (err, fields, files) => {
    const { senderName, reseverId, imageName } = fields;

    const newPath = `${__dirname}/../../../frontend/public/image/${imageName}`;
    files.image.originalFilename = imageName;

    try {
      fs.copyFile(files.image.filepath, newPath, async (err) => {
        if (err) {
          res.status(500).json({
            error: {
              errorMessage: "Image upload fail",
            },
          });
        } else {
          const insertMessage = await Message.create({
            senderId: senderId,
            senderName: senderName,
            reseverId: reseverId,
            message: {
              text: "",
              image: files.image.originalFilename,
            },
          });
          res.status(201).json({
            success: true,
            message: insertMessage,
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        error: {
          errorMessage: "Internal Server Error",
        },
      });
    }
  });
};

export const messageSeen = async (req, res) => {
  const messageId = req.body._id;

  await Message.findByIdAndUpdate(messageId, {
    status: "seen",
  })
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch(() => {
      res.status(500).json({
        error: {
          errorMessage: "Internal Server Error",
        },
      });
    });
};

export const delivaredMessage = async (req, res) => {
  const messageId = req.body._id;

  await Message.findByIdAndUpdate(messageId, {
    status: "delivared",
  })
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch(() => {
      res.status(500).json({
        error: {
          errorMessage: "Internal Server Error",
        },
      });
    });
};

import User from "./../Model/user.js";
import Message from "./../Model/message.js";

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
          fndInfo: {
            name: friendGet[i].name,
            photo: friendGet[i].photo,
            id: friendGet[i]._id,
          },
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

export const searchUser = async (request, response) => {
  try {
    const { search } = request.body;

    const query = new RegExp(search, "i");

    const user = await User.find({
      $or: [{ name: query }],
      _id: { $ne: request.userID },
    }).select("-password");

    return response.json(user);
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
    });
  }
};

export const messageUploadDB = async (req, res) => {
  const { senderName, reseverId, message } = req.body;
  const senderId = req.userID;

  if (!message) return;
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

export const ImageMessageSend = async (req, res) => {
  const senderId = req.userID;
  const { senderName, reseverId, image } = req.body;
  try {
    const insertMessage = await Message.create({
      senderId: senderId,
      senderName: senderName,
      reseverId: reseverId,
      message: {
        text: "",
        image: image,
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

export const messageSeen = async (req, res) => {
  // console.log(req.body);
  // return;
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
    status: "delivered",
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

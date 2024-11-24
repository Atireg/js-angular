const { themeModel } = require('../models');
const { newPost } = require('./postController')

function getThemes(req, res, next) {
    themeModel.find()
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getTheme(req, res, next) {
    const { themeId } = req.params;
    console.log(themeId);


    themeModel.findById(themeId)
        .populate({
            path: 'posts',
            populate: {
                path: 'userId'
            }
        })
        .then(theme => res.json(theme))
        .catch(next);
}

function createTheme(req, res, next) {
    const { themeName, postText, colour, size, rotation } = req.body;
    const { _id: userId } = req.user;

    const themeData = {
        themeName,
        userId,
        subscribers: [userId],
        colour: colour || "red",
        size: size || "0.5",
        rotation: rotation || []
    };

    themeModel.create({ themeName, userId, subscribers: [userId] })
        .then(theme => {
            newPost(postText, userId, theme._id)
                .then(([_, updatedTheme]) => res.status(200).json(updatedTheme))
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}

// New function to update theme properties
function updateThemeProperties(req, res, next) {
    const { themeId } = req.params;
    const { colour, size, rotation } = req.body;
    const { _id: userId } = req.user;

    // Only update fields that are provided
    const updateData = {};
    if (colour) updateData.colour = colour;
    if (size) updateData.size = size;
    if (rotation) updateData.rotation = rotation;

    themeModel.findOneAndUpdate(
        { _id: themeId, userId: userId }, // Only allow update if user owns the theme
        updateData,
        { new: true }
    )
    .then(updatedTheme => {
        if (!updatedTheme) {
            return res.status(404).json({ message: "Theme not found or unauthorized" });
        }
        res.status(200).json(updatedTheme);
    })
    .catch(next);
}

module.exports = {
    getThemes,
    createTheme,
    getTheme,
    subscribe,
    updateThemeProperties
}

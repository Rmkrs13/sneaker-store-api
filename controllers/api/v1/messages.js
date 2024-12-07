const Message = require("../../../models/api/v1/Message");

// POST /api/v1/messages - Create a new message
const create = (req, res) => {
    const text = req.body.message.text;
    const user = req.body.message.user;

    const m = new Message({ user: user, text: text });
    m.save().then(() => {
        res.json({
            status: "success",
            message: "Message saved",
            data: {
                message: m, // Includes the _id and __v fields automatically
            },
        });
    }).catch((err) => res.status(400).json({ status: "fail", message: err.message }));
};

// GET /api/v1/messages - Get all messages or filter by user
const index = async (req, res) => {
    try {
        const user = req.query.user;
        
        let messages;
        
        if (user) {
            // Find messages for the specific user
            messages = await Message.find({ user: user });
            res.json({
                status: "success",
                message: `Messages from user ${user}`,
                data: {
                    messages: messages, // Includes _id and __v
                },
            });
        } else {
            // Find all messages
            messages = await Message.find();
            res.json({
                status: "success",
                message: "GETTING messages",
                data: {
                    messages: messages, // Includes _id and __v
                },
            });
        }
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

// GET /api/v1/messages/:id - Get a single message by ID
const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ status: "fail", message: "Message not found" });
        }
        res.json({
            status: "success",
            message: `GETTING message ${req.params.id}`,
            data: {
                message: message, // Includes _id and __v
            },
        });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

// PUT /api/v1/messages/:id - Update a message by ID
const updateMessage = async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body.message, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ status: "fail", message: "Message not found" });
        }
        res.json({
            status: "success",
            message: "Message updated",
            data: {
                message: updatedMessage, // The updated message includes incremented __v
            },
        });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

// DELETE /api/v1/messages/:id - Delete a message by ID
const deleteMessage = async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ status: "fail", message: "Message not found" });
        }
        res.json({
            status: "success",
            message: "Message deleted",
            data: {
                message: deletedMessage, // The deleted message includes _id and __v
            },
        });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

// GET /api/v1/messages?user=username - Get messages for a specific user
const getMessagesByUser = async (req, res) => {
    try {
        const user = req.query.user;
        if (!user) {
            // If no user is specified, return all messages
            const messages = await Message.find();
            return res.json({
                status: "success",
                message: "GETTING messages",
                data: {
                    messages: messages, // Includes _id and __v
                },
            });
        }
        
        // Find messages that match the specific user
        const messages = await Message.find({ user: user });
        res.json({
            status: "success",
            message: `Messages from user ${user}`,
            data: {
                messages: messages, // Includes _id and __v
            },
        });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

module.exports = {
    create,
    index,
    getMessageById,
    updateMessage,
    deleteMessage,
    getMessagesByUser,
};
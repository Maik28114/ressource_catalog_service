// Ticket RC-008
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Ein interner Serverfehler ist aufgetreten.'
    });
};

export { errorHandler };
const yupValidatorMiddleware = (schema) => async (req, res, next) => {
    const data =req.body
    try {
        await schema.validate({
            body:req.body,
            query:req.query,
            params:req.params
        });
        next(); 
    } catch (error) {
        res.status(400).json({error});
    }
};

module.exports = yupValidatorMiddleware;
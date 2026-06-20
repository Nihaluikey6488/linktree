import {validationResult} from "express-validator"; // import validateRequest 'express-validator// '
const validateRequest = (req, res, next) =>{
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            message:"Validation failed",
            errors:errors.array().map((error)=>({
                field:error.path,
                msg:error.messag
            }))
        })
    }

    return next()
}

export default validateRequest;

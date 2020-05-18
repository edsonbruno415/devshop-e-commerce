const Joi = require("@hapi/joi");

const extractErrors = (error) => {
    const errors = error.details.reduce((prev, curr)=>{
        if(prev[curr.path[0]]){
            prev[curr.path[0]].push(curr.type);
        }else{
            prev[curr.path[0]] = [curr.type];
        }
        return prev;
    }, {} );
    return errors;
}

const ValidationError = (message, errors) => ({
    message,
    errors: Object.keys(errors)
})

const validation = (obj, schema) => {
    const { error , value } = schema.validate(obj, { abortEarly: false, stripUnknown: true });
    if(error){
        throw ValidationError('Validation', extractErrors(error));
    }else{
        return value;
    }
}

module.exports = {
    validation
}
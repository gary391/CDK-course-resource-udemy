


// This is the code for the lambda. 
// Main async function that receives two arguments event, context. 
// We need to 

exports.main = async function (event, context) {
    // Returns status code and body!
    return {
        statusCode: 200, 
        body: JSON.stringify(`Hello! I will read from ${process.env.TABLE_NAME}`)
    }
}
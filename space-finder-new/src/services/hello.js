// When we run this lambda we should get a response that should say "hello world"

exports.main = async function(event, context){
    return {
        statusCode: 200,
        body: JSON.stringify("Hello from Lambda!!")
    }
}
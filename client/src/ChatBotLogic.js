import { predictionServiceClient } from "@google-cloud/aiplatform";

const projectId = 'my-italian-chatbot'
const location = 'us-central1'
const endpointId = 'endpoint'

const client = new predictionServiceClient()

async function predict (instances) {
    const [response] = await client.predict({
        parent: `projects/${projectId}/locations/${location}/endpoints/${endpointId}`,
        instances
    })

    return response.predictions
}

const instances = [
    { content: 'Qual o ponto turístico mais famoso da Itália?' }
]

predict(instances).then(predictions => {
    return predictions
}).catch(ERR => console.log('error', ERR))
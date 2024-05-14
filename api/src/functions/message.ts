import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function message(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    switch (request.method) {
        case "GET":
            return await getMessage(request, context);            
        case "POST":
            return await getMessage(request, context);            
        default:
            return { body: `Hello!!!` };
    }
};

async function getMessage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}!` };
};

async function postMessage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Updated by ${name}!` };
};

app.http('message', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: message
});

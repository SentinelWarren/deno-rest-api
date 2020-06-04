import { v4 } from "https://deno.land/std/uuid/mod.ts"
import { Bidhaa } from "../aina.ts"

let bidhaaZote: Bidhaa[] = [
    {
        id: "1",
        jina: "Bidhaa namba moja",
        maelezo: "Bidhaa ya kwanza",
        bei: 99.99
    },
    {
        id: "2",
        jina: "Bidhaa namba mbili",
        maelezo: "Bidhaa ya pili",
        bei: 119.99
    },
    {
        id: "3",
        jina: "Bidhaa namba tatu",
        maelezo: "Bidhaa ya tatu",
        bei: 49.99
    }
]

// @maele   Get (Pata) bidhaa zote
// @ruti    GET /api/v1/bidhaa
const pataBidhaa = ({ response }: { response: any }) => {
    response.body = {
        fanikio: true,
        data: bidhaaZote
    }
}

// @maele   Get (Pata) bidhaa moja
// @ruti    GET /api/v1/bidhaa/:id
const pataBidhaaMoja = ({ params, response }: { params: { id: string }, response: any }) => {
    const bidhaaMoja: Bidhaa | undefined = bidhaaZote.find(b => b.id === params.id)

    if(bidhaaMoja){
        response.status = 200
        response.body = {
            fanikio: true,
            data: bidhaaMoja
        }
    }else{
        response.status = 404
        response.body = {
            fanikio: false,
            taarifa: "Hakuna bidhaa iliyopatikana!"
        }
    }
}

// @maele   Ongeza bidhaa
// @ruti    POST /api/v1/bidhaa
const ongezaBidhaa = async ({ request, response }: { request: any, response: any }) => {
    const mwili = await request.body()

    if(!request.hasBody){
        response.status = 400
        response.body = {
            fanikio: false,
            taarifa: "Hakuna data!"
        }
    }else{
        const bidhaaMpya: Bidhaa = mwili.value
        bidhaaMpya.id = v4.generate()
        bidhaaZote.push(bidhaaMpya)
        response.status = 201
        response.body = {
            fanikio: true,
            data: bidhaaMpya
        }

    }
}

// @maele   Sasisha (Update) bidhaa
// @ruti    PUT /api/v1/bidhaa/:id
const sasishaBidhaa = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
    const bidhaa: Bidhaa | undefined = bidhaaZote.find(b => b.id === params.id)

    if(bidhaa){
        const mwili = await request.body()
        const sasishaData: { jina?: string; maelezo?: string; bei?: number } = mwili.value

        bidhaaZote = bidhaaZote.map(b => b.id === params.id ? { ...b, ...sasishaData } : b)

        response.status = 200
        response.body = {
            fanikio: true,
            data: bidhaaZote
        }

    }else{
        response.status = 404
        response.body = {
            fanikio: false,
            taarifa: "Hakuna bidhaa iliyopatikana!"
        }
    }
}

// @maele   Ondoa (Futa) bidhaa
// @ruti    DELETE /api/v1/bidhaa/:id
const ondoaBidhaa = ({ params, response }: { params: { id: string }, response: any }) => {
    bidhaaZote = bidhaaZote.filter(b => b.id !== params.id)
    response.body = {
        fanikio: true,
        taarifa: "Bidhaa imeondolewa"
    }
}

export { pataBidhaa, pataBidhaaMoja, ongezaBidhaa, sasishaBidhaa, ondoaBidhaa }

/*

*/
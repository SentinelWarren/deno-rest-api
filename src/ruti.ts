import { Router } from "https://deno.land/x/oak/mod.ts"
import { pataBidhaa, pataBidhaaMoja, ongezaBidhaa, sasishaBidhaa, ondoaBidhaa } from "./miongozo/bidhaa.ts"

const ruta = new Router() //router

ruta.get("/api/v1/bidhaa", pataBidhaa)
.get("/api/v1/bidhaa/:id", pataBidhaaMoja)
.post("/api/v1/bidhaa", ongezaBidhaa)
.put("/api/v1/bidhaa/:id", sasishaBidhaa)
.delete("/api/v1/bidhaa/:id", ondoaBidhaa)

export default ruta
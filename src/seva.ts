import { Application } from "https://deno.land/x/oak/mod.ts"
import ruta from "./ruti.ts"

const port = 5000
const apu = new Application() //app

apu.use(ruta.routes())
apu.use(ruta.allowedMethods())

console.log(`Seva ina miliki port/banda (inafanya kazi kwenye port/banda) ${port}`)

await apu.listen({ port })
const express=require("express"),
app= express(),
port=process.env.port || 80,
cors=require("cors");

app.use(
    cors({
        origin:["http://localhost:4200"]
    })
)

app.use(express.json());

let frutas=[],
nombres=["Pera","Manzana","Sandía","Mandarina"],
precios=[40,55,65,10];

nombres.forEach((nombre,i)=>{
let template={
	id:i+1,
	nombre,
    precio:precios[i]||"Sin precio"
}
frutas[i]=template;
})

/* app.get("/",(req,res)=>{
    res.send("API de frutas");
}) */
app.get("/",(req,res)=>{
    res.send(frutas);
})
app.get("/:id",(req,res)=>{
    const fruta=frutas.find(fruit=>fruit.id===parseInt(req.params.id));
    if(!fruta)return res.status(404).send(`${req.params.id} no encontrado`);
      else  res.send(fruta);
})

app.post("/",(req,res)=>{
    const fruta={
        id:frutas.length+1,
        nombre:req.body.nombre,
        precio:parseInt(req.body.precio)
    }
    frutas.push(fruta);
    res.send(fruta);
})
app.delete("/:id",(req,res)=>{
    const fruta=frutas.find(fruit=>fruit.id===parseInt(req.params.id)),
    index=frutas.indexOf(fruta);
    frutas.splice(index,1);
    res.send(fruta);
})

app.listen(port,()=>console.log(`Escuchando puerto ${port}`));
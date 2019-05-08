export class Persona {
    constructor(
        nombres:String,
        apellidos: String,
        dni:Number,//numero plano sin puntos
        fechaInicio: Date,
        titulos:[String],
        foto: String, // foto de la persona es un archivo.jpg donde se almacenan todas las fotos de les personas
        fechaBaja: Date,
        motivoBaja:String,
    ){}
}
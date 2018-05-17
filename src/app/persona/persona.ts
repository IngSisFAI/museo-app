export class Persona {
    constructor(
        nombres:String,
        apellidos: String,
        dni:Number,//numero plano sin puntos
        fechaInicio: Date,
        titulos:[String],
        curriculum: String, // es la ruta de un archivo.pdf donde se encuentran todos los curriculum 
        foto: String, // foto de la persona es un archivo.jpg donde se almacenan todas las fotos de les personas
        fechaBaja: Date,
        motivoBaja:String,
        director:[String],
        paleontologo: [String],
        colector: [String]
    ){}
}
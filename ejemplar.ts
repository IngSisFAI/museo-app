export class Ejemplar{
    constructor(
        tipoEjemplar:{type: String, enum:['encontrado', 'no encontrado']},
        taxonReino:String,
        taxonFilo:String,
        taxonClase:String,
        taxonOrden:String,
        taxonFamilia:String,
        taxonGenero:String,
        taxonEspecie:String,
        eraGeologica:[{
            formacion:String,
            grupo:String,
            subgrupo: String,
            edad:Number,
            periodo: String,
            era:String    
        }],
        ilustracionCompleta:String,
        areaHallazgo:[{
            nombreArea:String,
            pais:String,
            ciudad:String
        }],
        nroColeccion:String,
        bochonesAsociados:[String],
        dimensionLargo:Number,
        dimensionAlto:Number,
        peso:Number,
        alimentacion:String,
        fechaIngresoColeccion:Date,
        ubicacionMuseo: String,
        cantidadPiezas: Number,
        piezasAsociadas:[String],
        fechaBaja: Date,
        motivoBaja:String
    ){}
}
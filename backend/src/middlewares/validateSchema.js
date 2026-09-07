export const validateSchema = (schema) =>(req, res, next)=>{
    try{
        //analiza el esquema contra lo que contiene req.body
        schema.parse(req.body);
        next();//si no hay error en el esquema se ejecuta next
    } catch (error) { 
        //console.log(error);
        return res.status(400)
                  .json({
                    message: error.issues.map( (error)=>error.message)
                  })  
    }//fin del catch
}//fin de validateSchema

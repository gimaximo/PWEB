//let dbConnection = require('../config/dbConnection')
module.exports = function(app){
    app.get('/informacao/professores', function(req,res){
        async function getProfessores() {
            try{
                let connection = app.config.dbConnection;
                const pool = await connection();

                let professoresModel = app.models.professormodel;
                //const results =  await pool.request().query('select*from professores') 
                professoresModel.getProfessores(pool, function(error, results){
                res.render("informacao/professores",{profs: results.recordset})})
            }
                catch(err){
                    console.log(err)
                }
        
}
getProfessores();   
});
}

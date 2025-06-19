module.exports = function(app){
    app.get('/admin/adicionar_professor', function(req,res){
        res.render('admin/adicionar_professor');
     });
   
     app.post('/professor/salvar', function(req,res){
   
         async function getAdcProfessor(){
             try {
                 let professor = req.body;
                  
                 let connection = application.config.dbConnection;
                 const pool = await connection();
   
                 let  professoresModel = application.models.professormodel;
   
                professoresModel.salvarProfessor(professor,pool, (error, results)=>{
                     if(error){
                     console.log('Erro ao inserir no banco:' + error);
                         res.status(500).send(error);
                     } else {
                         console.log('professor criado!!!');
                        res.redirect('/admin/crud_professores');
                     }
                 });
             } catch (error) {
                 console.log(error);
             }
         }
         getAdcProfessor();
     });
  }
module.exports= function(app){
    app.get('/admin/adicionar_professor', function(req,res){
        res.render("admin/adicionar_professor");
    })
    app.post('/professor/salvar', function(req,res){
        //res.send("Salvo!!!")
        async function getAdcProfessor() {
            try{
                let professor = req.body;
                
                let connection = app.config.dbConnection;
                const pool = await connection();

                let professoresModel = app.models.professormodel;

                professoresModel.salvarProfessor(professor,pool, (error, results)=>{
                    if(error){
                        console.log('Erro ao inserir no banco ' + error);
                        res.status(500).send(error);
                    } else{
                        console.log('professor criado!!!');
                        res.direct('/informacao/professor');
                    }
                })

            } catch(error){
                console.log(error);
            }
        }
        getAdcProfessor();
    });
}
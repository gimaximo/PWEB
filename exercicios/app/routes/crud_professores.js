module.exports = function (app) {
    app.get('/admin/crud_professores', function (req, res) {
      async function getProf() {
        try {
          const pool = app.config.dbConnection();
          let professoresModel = app.models.professormodel();
          professoresModel.getProfessores(pool, function (err, results) {
            res.render('admin/crud_professores', { profs: results.rows });
          });
        } catch (err) {
          console.error(err);
          res.status(500).send('Erro ao consultar dados' + err.message);
        }
      }
  
      getProf();
    });
  };
module.exports = function () {
     this.getProfessores = function (connection, callback) {
       connection.query('select * from professores', callback);
     };
   
     this.getProfessor = function (connection, callback) {
       connection.query(
         'select * from professores WHERE id_professor=1',
         callback,
       );
     };
   
     this.salvarProfessor = function (professor, connection, callback) {
       connection.query(
         "insert into professores (nome_professor,email_professor) values ('" +
           professor.nome_professor +
           "','" +
           professor.email_professor +
           "')",
         callback,
       );
     };
   
     this.deletarProfessor = function (professor, connection, callback) {
       connection.query(
         `Delete from professores WHERE id_professor=${professor.id_professor}`,
         callback,
       );
     };
     this.editarProfessor = function (professor, connection, callback) {
       connection.query(
         `Update professores set nome_professor=${professor.nome},
             email_professor=${professor.email_professor} 
             where id_professor=${professor.id_professor}`,
         callback,
       );
     };
   
     return this;
   };
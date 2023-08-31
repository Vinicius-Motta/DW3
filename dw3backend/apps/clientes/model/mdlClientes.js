const db = require("../../../database/databaseconfig");

const getAllCliente = async () => {
  return (
    await db.query(
      "SELECT *, (SELECT descricao from CURSOS where cursoid = cliente.cursoid)" +
        "FROM cliente where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const getClienteByID = async (clienteIDPar) => {
    return (
      await db.query(
        "SELECT *, (SELECT descricao from CURSOS where cursoid = cliente.cursoid)" +
          "FROM cliente WHERE clienteid = $1 and deleted = false ORDER BY nome ASC",
        [clienteIDPar]
      )
    ).rows;
  };

  const insertCliente = async (clienteREGPar) => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "INSERT INTO cliente " + "values(default, $1, $2, $3, $4, $5, $6, $7)",
          [
            clienteREGPar.prontuario,
            clienteREGPar.nome,
            clienteREGPar.endereco,
            clienteREGPar.rendafamiliar,
            clienteREGPar.datanascimento,
            clienteREGPar.cursoid,
            clienteREGPar.deleted,
          ]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlCliente|insertCliente] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
  };
  
  const UpdateCliente = async (clienteREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "UPDATE cliente SET " +
            "prontuario = $2, " +
            "nome = $3, " +
            "endereco = $4, " +
            "rendafamiliar = $5, " +
            "datanascimento = $6, " +
            "cursoid = $7, " +
            "deleted = $8 " +
            "WHERE clienteid = $1",
          [
            clienteREGPar.clienteid,
            clienteREGPar.prontuario,
            clienteREGPar.nome,
            clienteREGPar.endereco,
            clienteREGPar.rendafamiliar,
            clienteREGPar.datanascimento,
            clienteREGPar.cursoid,
            clienteREGPar.deleted,
          ]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlCliente|insertCliente] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
  };
  
  const DeleteCliente = async (clienteREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
      
    try {
      linhasAfetadas = (
      await db.query(
        "UPDATE Cliente SET " + "deleted = true " + "WHERE clienteid = $1",
        [clienteREGPar.clienteid]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlCliente|insertCliente] " + error.detail;
    linhasAfetadas = -1;
  }
  
  return { msg, linhasAfetadas };
  };



module.exports = {
  getAllCliente,
  getClienteByID,
  insertCliente,
  UpdateCliente,
  DeleteCliente,
};
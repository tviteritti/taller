
const conexion = require("../config/conexion")
module.exports = {
  insertar(idVenta, idProducto) {
    return new Promise((resolve, reject) => {
      conexion.query(`insert into productos_vendidos
            (id_venta, id_producto)
            values
            (?, ?)`,
        [idVenta, idProducto], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);
        });
    });
  },
  eliminar(idVenta, idProducto) {
    return new Promise((resolve, reject) => {
      conexion.query(`delete from productos_vendidos
          where id_venta=? and id_producto=?`,
        [idVenta, idProducto], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);
        });
    });
  },
}

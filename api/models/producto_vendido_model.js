
const conexion = require("../config/conexion")
module.exports = {
  insertar(idVenta, idProducto, cantidad) {
    return new Promise((resolve, reject) => {
      conexion.query(`insert into productos_vendidos
            (id_venta, id_producto, cantidad)
            values
            (?, ?, ?)`,
        [idVenta, idProducto, cantidad], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);
        });
    });
  },
  insertarCantidad(idVenta, idProducto, cantidad) {
    return new Promise((resolve, reject) => {
      conexion.query(`UPDATE productos_vendidos SET cantidad= ? WHERE id_venta= ? and id_producto= ?`,
        [cantidad,idVenta ,idProducto ], (err, resultados) => {
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
          else resolve(resultados);
        });
    });
  },
  obtenerCantidad(idVenta, idProducto) {
    return new Promise((resolve, reject) => {
      conexion.query(`select cantidad from productos_vendidos
          where id_venta=? and id_producto=?`,
        [idVenta, idProducto], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados[0]);
        });
    });
  },
  existe(idVenta, idProducto) {
    return new Promise((resolve, reject) => {
      conexion.query(`select * from productos_vendidos
          where id_venta=? and id_producto=?`,
        [idVenta, idProducto], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        });
    });
  },
}

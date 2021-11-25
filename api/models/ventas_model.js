
const conexion = require("../config/conexion")
module.exports = {
  obtenerProductosVendidos(idVenta) {
    return new Promise((resolve, reject) => {
      conexion.query(`select * from productos_vendidos 
        inner join productos on productos.id = productos_vendidos.id_producto 
        inner join fotos_productos on fotos_productos.id_producto = productos.id
        where productos_vendidos.id_venta = ?;`,
        [idVenta],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        });
    });
  },
  obtenerPorId(id) {
    return new Promise((resolve, reject) => {
      conexion.query(`select ventas.total, clientes.nombre, clientes.direccion FROM ventas inner join clientes on ventas.id_cliente = clientes.id WHERE ventas.id = ?`,
        [id],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados[0]);
        });
    });
  },
  obtenerIdVenta(id) {
    return new Promise((resolve, reject) => {
      conexion.query(`select ventas.id FROM ventas WHERE id_cliente = ?`,
        [id],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados[0]);
        });
    });
  },
  obtener() {
    return new Promise((resolve, reject) => {
      conexion.query(`select ventas.id, ventas.total, clientes.nombre, clientes.direccion FROM ventas inner join clientes on ventas.id_cliente = clientes.id;`,
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        });
    });
  },
  insertar(idCliente, total) {
    return new Promise((resolve, reject) => {
      conexion.query(`insert into ventas
            (id_cliente, total)
            values
            (?, ?)`,
        [idCliente, total], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);

        });
    });
  },
  terminarCompraProductoVendido(idV) {
    return new Promise((resolve, reject) => {
      conexion.query(`delete from productos_vendidos
        where id_venta=?`,
        [idV], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);
        });
    });
  },
}

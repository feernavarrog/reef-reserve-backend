const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
const app = express();

app.use(cors());

app.get('/reservas', async (req, res) => {
    process.env.TNS_ADMIN = "./Wallet_REEFRESERVE";
  let connection;
  try {
    connection = await oracledb.getConnection({
        user: "admin",
        password: "HotelRR2024!",
        connectString: "reefreserve_high", 
        walletLocation: "./Wallet_REEFRESERVE",
        walletPassword: "HotelRR2024!"
    });

    const result = await connection.execute(`SELECT * FROM RESERVA`);
    res.json(result.rows);

  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

app.listen(3000, () => {
  console.log('Backend is running on http://localhost:3000');
});

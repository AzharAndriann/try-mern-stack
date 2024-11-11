const mysql = require('mysql2');

// Membuat koneksi ke database dengan connection string
const connection = mysql.createConnection({
  host: 'junction.proxy.rlwy.net',  // Host dari Railway
  user: 'root',                      // Username MySQL (root)
  password: 'KiiLfgDdBSqdfTMJnFfaNXlykWlNDlTT', // Password dari Railway
  database: 'railway',               // Nama database dari Railway
  port: 32965                        // Port yang disediakan oleh Railway
});

// Cek koneksi
connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

// Menutup koneksi setelah selesai
connection.end();

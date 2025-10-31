import mysql from 'mysql2/promise'

let pool: mysql.Pool | null = null

export function getPool(): mysql.Pool {
  if (pool) return pool
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) throw new Error('DATABASE_URL not set')
  // mysql2 supports connection URI directly
  pool = mysql.createPool(databaseUrl)
  return pool
}

export async function ensureSchema(): Promise<void> {
  const pool = getPool()
  const conn = await pool.getConnection()
  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NULL,
        role ENUM('client', 'freelancer') DEFAULT 'freelancer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_email_role (email, role)
      ) ENGINE=InnoDB;
    `)

    await conn.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        budget INT NOT NULL,
        description TEXT NOT NULL,
        client_id INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (client_id),
        CONSTRAINT fk_jobs_client FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB;
    `)

    await conn.query(`
      CREATE TABLE IF NOT EXISTS chats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `)

    await conn.query(`
      CREATE TABLE IF NOT EXISTS chat_participants (
        chat_id INT NOT NULL,
        user_id INT NOT NULL,
        PRIMARY KEY (chat_id, user_id),
        CONSTRAINT fk_cp_chat FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
        CONSTRAINT fk_cp_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `)

    await conn.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        chat_id INT NOT NULL,
        sender_id INT NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (chat_id),
        CONSTRAINT fk_msg_chat FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
        CONSTRAINT fk_msg_user FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `)
    await conn.query(`
      CREATE TABLE IF NOT EXISTS proposals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        job_id INT NOT NULL,
        freelancer_id INT NOT NULL,
        cover_letter TEXT,
        expected_rate VARCHAR(255),
        timeline VARCHAR(255),
        additional_details TEXT,
        status ENUM('pending','accepted','rejected','under_review') DEFAULT 'pending',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_proposal_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
        CONSTRAINT fk_proposal_user FOREIGN KEY (freelancer_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `)
    await conn.query(`
      CREATE TABLE IF NOT EXISTS assignments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        job_id INT NOT NULL,
        freelancer_id INT NOT NULL,
        assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_assignment_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
        CONSTRAINT fk_assignment_user FOREIGN KEY (freelancer_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `)
  } finally {
    conn.release()
  }
}



import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import crypto from 'crypto';
import { sendSMS } from './smsService.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Create MySQL Connection Pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'K123202s@',
  database: 'gov_portal',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Phone normalization helper (E.164 Indian format)
function normalizePhoneNumber(phone) {
  if (!phone) return '';
  let clean = phone.replace(/[^+\d]/g, '');
  if (!clean.startsWith('+')) {
    if (clean.length === 10) {
      clean = '+91' + clean;
    } else if (clean.length === 12 && clean.startsWith('91')) {
      clean = '+' + clean;
    }
  }
  return clean;
}

// Healthcheck
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ status: 'OK', database: 'MySQL Server 8.0 (Sole Primary Database)', result: rows[0].result });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', message: err.message });
  }
});

// ── 1. QUERIES API (MYSQL SOLE DATABASE) ──
app.get('/api/queries', async (req, res) => {
  try {
    const { userId, departmentId, districtId, talukId, status } = req.query;
    let sql = 'SELECT * FROM queries WHERE 1=1';
    const params = [];

    if (userId) {
      sql += ' AND userId = ?';
      params.push(userId);
    }
    if (departmentId && departmentId !== 'ALL') {
      sql += ' AND departmentId = ?';
      params.push(departmentId);
    }
    if (districtId && districtId !== 'ALL') {
      sql += ' AND districtId = ?';
      params.push(districtId);
    }
    if (talukId && talukId !== 'ALL') {
      sql += ' AND (talukId = ? OR taluk LIKE ?)';
      params.push(talukId, `%${talukId}%`);
    }
    if (status && status !== 'ALL') {
      sql += ' AND status = ?';
      params.push(status);
    }

    sql += ' ORDER BY createdAt DESC';

    const [rows] = await pool.query(sql, params);

    const queriesWithDetails = await Promise.all(rows.map(async (q) => {
      const [messages] = await pool.query('SELECT * FROM query_messages WHERE queryId = ? ORDER BY createdAt ASC', [q.id]);
      const [timeline] = await pool.query('SELECT * FROM query_timeline WHERE queryId = ? ORDER BY id ASC', [q.id]);
      return {
        ...q,
        attachments: [],
        messages,
        timeline
      };
    }));

    res.json({ success: true, queries: queriesWithDetails });
  } catch (err) {
    console.error("GET /api/queries error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/queries', async (req, res) => {
  try {
    const q = req.body;
    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    const insertSql = `
      INSERT INTO queries 
      (id, userId, userName, userPhone, userEmail, state, stateId, district, districtId, taluk, talukId, departmentId, departmentName, subDepartmentId, serviceId, serviceName, category, subject, description, priority, status, assignedAgent, submittedDate, lastUpdated)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      q.id,
      q.userId || 'citizen-101',
      q.userName || 'Swedha Sri',
      q.userPhone || '+91 98765 43211',
      q.userEmail || 'swedhasrisathish@gmail.com',
      q.state || 'Tamil Nadu',
      q.stateId || 'TN',
      q.district || 'Thanjavur',
      q.districtId || 'thanjavur',
      q.taluk || 'Thanjavur Taluk',
      q.talukId || 'thanjavur-taluk',
      q.departmentId,
      q.departmentName,
      q.subDepartmentId || q.departmentId,
      q.serviceId,
      q.serviceName,
      q.category || 'General Inquiry',
      q.subject,
      q.description,
      q.priority || 'Medium',
      q.status || 'SUBMITTED',
      q.assignedAgent || 'Unassigned',
      q.submittedDate || nowStr,
      q.lastUpdated || nowStr
    ];

    await pool.query(insertSql, values);

    if (q.description) {
      await pool.query(
        'INSERT INTO query_messages (id, queryId, sender, senderName, text, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
        [`m-${Date.now()}`, q.id, 'citizen', q.userName || 'Swedha Sri', q.description, nowStr]
      );
    }

    await pool.query(
      'INSERT INTO query_timeline (queryId, status, date, actor) VALUES (?, ?, ?, ?)',
      [q.id, 'SUBMITTED', nowStr, `Citizen (${q.userName || 'Swedha Sri'})`]
    );

    res.json({ success: true, id: q.id, message: 'Query saved to MySQL database successfully' });
  } catch (err) {
    console.error("POST /api/queries error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/queries/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    const { sender, senderName, text } = req.body;
    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    const msgId = `m-${Date.now()}`;

    await pool.query(
      'INSERT INTO query_messages (id, queryId, sender, senderName, text, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
      [msgId, id, sender, senderName, text, nowStr]
    );

    await pool.query(
      'UPDATE queries SET lastUpdated = ? WHERE id = ?',
      [nowStr, id]
    );

    res.json({ success: true, messageId: msgId, timestamp: nowStr });
  } catch (err) {
    console.error("POST /api/queries/:id/messages error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/queries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedAgent, actorName } = req.body;
    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    let sql = 'UPDATE queries SET lastUpdated = ?';
    const params = [nowStr];

    if (status) {
      sql += ', status = ?';
      params.push(status);
    }
    if (assignedAgent) {
      sql += ', assignedAgent = ?';
      params.push(assignedAgent);
    }

    sql += ' WHERE id = ?';
    params.push(id);

    await pool.query(sql, params);

    if (status) {
      await pool.query(
        'INSERT INTO query_timeline (queryId, status, date, actor) VALUES (?, ?, ?, ?)',
        [id, status, nowStr, actorName || 'System']
      );
    }

    res.json({ success: true, message: 'Query updated in MySQL database' });
  } catch (err) {
    console.error("PATCH /api/queries/:id error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── 2. PROFILE CHANGES API (MYSQL SOLE DATABASE) ──
app.get('/api/profile-changes', async (req, res) => {
  try {
    const { userId } = req.query;
    let sql = 'SELECT * FROM profile_changes';
    const params = [];
    if (userId) {
      sql += ' WHERE userId = ?';
      params.push(userId);
    }
    sql += ' ORDER BY createdAt DESC';

    const [rows] = await pool.query(sql, params);

    const changesWithDepts = await Promise.all(rows.map(async (c) => {
      const [depts] = await pool.query('SELECT * FROM affected_departments WHERE changeId = ?', [c.id]);
      return {
        ...c,
        affectedDepartments: depts
      };
    }));

    res.json({ success: true, profileChanges: changesWithDepts });
  } catch (err) {
    console.error("GET /api/profile-changes error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/profile-changes', async (req, res) => {
  try {
    const c = req.body;
    await pool.query(
      'INSERT INTO profile_changes (id, userId, userName, fieldName, fieldLabel, oldValue, newValue, source, status, parentHash, currentHash, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [c.id, c.userId, c.userName, c.fieldName, c.fieldLabel, c.oldValue, c.newValue, c.source, c.status, c.parentHash, c.currentHash, c.timestamp]
    );

    if (c.affectedDepartments && Array.isArray(c.affectedDepartments)) {
      for (const d of c.affectedDepartments) {
        await pool.query(
          'INSERT INTO affected_departments (changeId, deptId, deptName, recordName, currentValue, consentStatus, updateStatus, lastUpdated) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [c.id, d.deptId, d.deptName, d.recordName, d.currentValue || d.oldValue, d.consentStatus || 'PENDING', d.updateStatus || 'NOT_STARTED', d.lastUpdated || c.timestamp]
        );
      }
    }

    res.json({ success: true, id: c.id, message: 'Profile change saved to MySQL database' });
  } catch (err) {
    console.error("POST /api/profile-changes error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/profile-changes/:id/consent', async (req, res) => {
  try {
    const { id } = req.params;
    const { deptId, consentStatus, updateStatus } = req.body;
    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    if (deptId) {
      await pool.query(
        'UPDATE affected_departments SET consentStatus = ?, updateStatus = ?, lastUpdated = ? WHERE changeId = ? AND deptId = ?',
        [consentStatus, updateStatus || 'NOT_STARTED', nowStr, id, deptId]
      );
    } else {
      await pool.query(
        'UPDATE affected_departments SET consentStatus = ?, lastUpdated = ? WHERE changeId = ?',
        [consentStatus, nowStr, id]
      );
    }

    res.json({ success: true, message: 'Consent updated in MySQL database' });
  } catch (err) {
    console.error("PATCH /api/profile-changes/:id/consent error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── 3. OTP AUTHENTICATION & SMS API (MYSQL SOLE DATABASE) ──

app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const normalizedPhone = normalizePhoneNumber(phoneNumber);

    if (!normalizedPhone || !/^\+91[6-9]\d{9}$/.test(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Indian mobile phone number. Please enter a valid 10-digit number (e.g. +91 98765 43210).'
      });
    }

    const cooldownSec = parseInt(process.env.OTP_RESEND_COOLDOWN_SECONDS || '60', 10);
    const expiryMin = parseInt(process.env.OTP_EXPIRY_MINUTES || '5', 10);

    // Rate limit check: Ensure resend cooldown has elapsed
    const [recent] = await pool.query(
      'SELECT createdAt FROM otp_verifications WHERE phoneNumber = ? AND createdAt > DATE_SUB(NOW(), INTERVAL ? SECOND) ORDER BY createdAt DESC LIMIT 1',
      [normalizedPhone, cooldownSec]
    );

    if (recent.length > 0) {
      return res.status(429).json({
        success: false,
        message: `OTP resend rate limit active. Please wait ${cooldownSec} seconds before requesting a new OTP.`
      });
    }

    // Cryptographically secure 6-digit OTP generation
    const otp = crypto.randomInt(100000, 1000000).toString();
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

    // Invalidate previous active OTPs for this phone number
    await pool.query('UPDATE otp_verifications SET verified = -1 WHERE phoneNumber = ? AND verified = 0', [normalizedPhone]);

    const expiresAt = new Date(Date.now() + expiryMin * 60 * 1000);

    // Save secure hashed OTP in MySQL database
    await pool.query(
      'INSERT INTO otp_verifications (phoneNumber, otpHash, expiresAt, attempts, verified) VALUES (?, ?, ?, 0, 0)',
      [normalizedPhone, otpHash, expiresAt]
    );

    // Dispatch SMS via Pluggable SMS Service
    const smsResult = await sendSMS({ phoneNumber: normalizedPhone, otp });

    res.json({
      success: true,
      message: 'OTP sent successfully via SMS to ' + normalizedPhone,
      provider: smsResult.provider,
      expiresInMinutes: expiryMin
    });
  } catch (err) {
    console.error('POST /api/auth/send-otp error:', err);
    res.status(500).json({ success: false, message: 'Failed to send OTP SMS: ' + err.message });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const normalizedPhone = normalizePhoneNumber(phoneNumber);

    if (!normalizedPhone || !otp || otp.length !== 6) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 6-digit OTP code and phone number.'
      });
    }

    const maxAttempts = parseInt(process.env.OTP_MAX_ATTEMPTS || '3', 10);

    // Query active unverified OTP from MySQL database
    const [rows] = await pool.query(
      'SELECT * FROM otp_verifications WHERE phoneNumber = ? AND verified = 0 ORDER BY createdAt DESC LIMIT 1',
      [normalizedPhone]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No active OTP request found. Please click "Send OTP" to request a new code.'
      });
    }

    const record = rows[0];

    // Check expiry
    if (new Date(record.expiresAt).getTime() < Date.now()) {
      await pool.query('UPDATE otp_verifications SET verified = -1 WHERE id = ?', [record.id]);
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please click "Resend OTP" to receive a new code.'
      });
    }

    // Check attempt limit
    if (record.attempts >= maxAttempts) {
      return res.status(429).json({
        success: false,
        message: `Maximum verification attempts (${maxAttempts}) exceeded. Please request a new OTP.`
      });
    }

    // Hash input OTP and compare with stored SHA-256 hash
    const inputHash = crypto.createHash('sha256').update(otp.trim()).digest('hex');

    if (inputHash !== record.otpHash) {
      const newAttempts = record.attempts + 1;
      await pool.query('UPDATE otp_verifications SET attempts = ? WHERE id = ?', [newAttempts, record.id]);

      const remaining = maxAttempts - newAttempts;
      return res.status(400).json({
        success: false,
        message: `Invalid OTP verification code. Attempts remaining: ${remaining > 0 ? remaining : 0}.`
      });
    }

    // Mark single-use OTP as verified
    await pool.query('UPDATE otp_verifications SET verified = 1 WHERE id = ?', [record.id]);

    res.json({
      success: true,
      message: 'Phone number verified successfully'
    });
  } catch (err) {
    console.error('POST /api/auth/verify-otp error:', err);
    res.status(500).json({ success: false, message: 'Verification failed: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`MySQL Backend Server listening on http://localhost:${PORT} [SOLE DATABASE ENGINE & OTP API]`);
});

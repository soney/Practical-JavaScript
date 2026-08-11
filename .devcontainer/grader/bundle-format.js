'use strict';

// The on-disk format of grader-bundle.enc: AES-256-GCM over the exact
// autograde-docker.zip that Coursera grades with, key derived by scrypt from
// the constants below.
//
// This file ships in the PUBLIC repo, so the key is public too. That is the
// point: the encryption is a courtesy curtain, not a vault. It keeps the
// course's test specs out of GitHub search, out of casual browsing, and out
// of accidental spoilers, while letting grading run entirely inside the
// learner's codespace with no server anywhere. A determined reader can open
// it - the same way `git sparse-checkout disable` reveals the practice
// solutions. If you are a learner: the specs describe what your code must
// do, and reading them teaches you much less than making them pass.
//
// coursera/scripts/create_grader_bundle.js (private repo) requires this same
// file to encrypt, so the two sides can never drift.

const crypto = require('crypto');

const MAGIC = Buffer.from('PJSGRDR1');
const PASSPHRASE = 'practical-javascript-in-codespace-grading';
const SALT = 'pjs-grader-bundle';
const IV_BYTES = 12;
const TAG_BYTES = 16;

function deriveKey() {
  return crypto.scryptSync(PASSPHRASE, SALT, 32);
}

function encrypt(plaintext) {
  const iv = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv('aes-256-gcm', deriveKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return Buffer.concat([MAGIC, iv, cipher.getAuthTag(), ciphertext]);
}

function decrypt(blob) {
  if (blob.length < MAGIC.length + IV_BYTES + TAG_BYTES) {
    throw new Error('grader bundle is truncated');
  }
  if (!blob.subarray(0, MAGIC.length).equals(MAGIC)) {
    throw new Error('not a grader bundle (bad magic)');
  }
  const iv = blob.subarray(MAGIC.length, MAGIC.length + IV_BYTES);
  const tag = blob.subarray(MAGIC.length + IV_BYTES, MAGIC.length + IV_BYTES + TAG_BYTES);
  const ciphertext = blob.subarray(MAGIC.length + IV_BYTES + TAG_BYTES);
  const decipher = crypto.createDecipheriv('aes-256-gcm', deriveKey(), iv);
  decipher.setAuthTag(tag);
  // GCM authenticates: a corrupted or tampered blob throws here rather than
  // producing a garbage zip.
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

module.exports = { encrypt, decrypt, sha256 };

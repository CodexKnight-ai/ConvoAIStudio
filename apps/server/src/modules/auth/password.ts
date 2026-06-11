import argon2 from "argon2"

export async function hashPassword(password: string) {
    const hash = await argon2.hash(password)
    return hash
}

export async function verifyPassword(password: string, hash: string) {
    const verified = await argon2.verify(hash, password)
    return verified
}
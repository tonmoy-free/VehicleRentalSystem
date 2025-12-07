import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUser = async (payload: Record<string, unknown>) => {
    const {name, email, password, phone, role} = payload;

    const hashPass= await bcrypt.hash(password as string, 10)
    const result = await pool.query(`
                INSERT INTO users(name,email, password, phone, role)VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role`, [name, email, hashPass, phone, role]);

    return result;

};

const getUsers = async () => {
    const result = await pool.query(`SELECT id, name, email, phone, role 
    FROM users`);

    return result;
};

const updateUser = async (name: string, email: string, phone: string, role: string, id: any) => {
    const result = await pool.query(`UPDATE users SET
             name = COALESCE($1, name),
             email = COALESCE($2, email),
             phone = COALESCE($3, phone),
             role = COALESCE($4, role),
             updated_at = NOW() 
             WHERE id=$5 
             RETURNING id, name, email, phone,role`, [name, email, phone, role, id]);

    return result;
};

const deleteUser = async (id: any) => {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

    return result;
}

export const userServices = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
}
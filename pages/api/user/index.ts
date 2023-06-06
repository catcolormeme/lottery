import User from "@/models/user";
import { getUsers } from "../../../lib/db";

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: User[]): void; new(): any; }; }; }) {
    const users = await getUsers();
    res.status(200).json(users);
}
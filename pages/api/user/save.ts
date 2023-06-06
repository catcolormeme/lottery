import User from "@/models/user";
import {saveUser, getUser } from "../../../lib/db";

export default async function handler(req: any, res: any) {
    const userExists = await getUser(req.body.address);
    if (userExists) {
        res.status(404).json({ message: "User already exists" });
    } else {
        const users = await saveUser({
            address: req.body.address,
            ammount: req.body.ammount,
            ticketid: req.body.ticketid,
        });
        res.status(200).json(users);
    }
}

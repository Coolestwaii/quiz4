import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function balanceRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    // return res.status(403).json({ok: false,message: "You do not have permission to check balance",});
    if (!user)
      return res.status(403).json({
        ok: false,
        message: "You do not have permission to check balance",
      });

    const users = readUsersDB();
    const userBalance = users.fins((x) => {
      return x.username === user.username;
    });
    //find user in DB and get their money value
    return res.status(200).json({ ok: true, money: userBalance.money });

    //return response
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}

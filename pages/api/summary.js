import { readUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    //return res.status(403).json({ ok: false, message: "Permission denied" });
    if (!user || !isAdmin)
      return res.status(403).json({ ok: false, message: "Permission denied" });
    //compute DB summary
    const users = readUsersDB();
    let adminCount = 0;
    let userCount = 0;
    let totalMoney = 0;
    users.forEach((x) => {
      if (x.isAdmin) adminCount++;
      else userCount++;
      totalMoney++;
    });
    return res
      .status(200)
      .json({
        ok: true,
        userCount: userCount,
        adminCount: adminCount,
        totalMoney: totalMoney,
      });
    //return response
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}

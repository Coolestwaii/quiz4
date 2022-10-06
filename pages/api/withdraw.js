export default function withdrawRoute(req, res) {
  if (req.method === "PUT") {
    //check authentication
    const user = checkToken(req);
    //return res.status(403).json({ ok: false, message: "You do not have permission to withdraw" });
    if (!user)
      return res
        .status(403)
        .json({ ok: false, message: "You do not have permission to deposit" });

    const amount = req.body.amount;
    //validate body
    if (typeof amount !== "number")
      return res.status(400).json({ ok: false, message: "Invalid amount" });
    //check if amount < 1
    // return res.status(400).json({ ok: false, message: "Amount must be greater than 0" });
    else if (amount < 1)
      return res
        .status(400)
        .json({ ok: false, message: "Amount must be greater than 0" });
    //find and update money in DB (if user has enough money)
    //return res.status(400).json({ ok: false, message: "You do not has enough money" });
    else if (amount >= 1 && userBalance.money < amount)
      return res
        .status(400)
        .json({ ok: false, message: "You do not has enough money" });
    else if (amount >= 1 && userBalance.money >= amount)
      return res
        .status(200)
        .json({ ok: true, money: userBalance.money - amount });

    //return response
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}

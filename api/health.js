export default function handler(req, res) {
  res.status(200).json({ status: "ok", message: "Kidrove Workshop API is running." });
}

export default function handler(req, res) {
  let now = new Date();
  return res.status(200).json(now.toLocaleTimeString());
}

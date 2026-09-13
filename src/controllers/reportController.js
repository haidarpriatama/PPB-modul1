import { CustomerModel } from "../models/customerModel.js";

export const ReportController = {
  async totalCustomers(req, res) {
    try {
      const result = await CustomerModel.getTotal();
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
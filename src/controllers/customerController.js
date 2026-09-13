import { CustomerModel } from "../models/customerModel.js";

function validateCustomerInput(body) {
  const { email, phone } = body;

  if (!email || !String(email).includes("@")) {
    return "Email wajib diisi dan harus mengandung karakter @";
  }

  if (!phone || String(phone).length < 10) {
    return "Nomor telepon wajib diisi dan minimal 10 karakter";
  }

  return null;
}

export const CustomerController = {
  async getAll(req, res) {
    try {
      const { name, page, limit } = req.query;
      const customers = await CustomerModel.getAll({ name, page, limit });
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const customer = await CustomerModel.getById(req.params.id);
      res.json(customer);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const validationError = validateCustomerInput(req.body);

      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const customer = await CustomerModel.create(req.body);
      res.status(201).json(customer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const validationError = validateCustomerInput(req.body);

      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const customer = await CustomerModel.update(req.params.id, req.body);
      res.json(customer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await CustomerModel.remove(req.params.id);
      res.json({ message: "Customer deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

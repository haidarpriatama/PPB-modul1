import { supabase } from "../config/supabaseClient.js";

export const CustomerModel = {
  async getAll({ name, page = 1, limit = 10 } = {}) {
    const currentPage = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.max(parseInt(limit, 10) || 10, 1);
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase.from("customers").select("*", { count: "exact" });

    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    const { data, error, count } = await query
      .order("name", { ascending: true })
      .range(from, to);

    if (error) throw error;

    return {
      data,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total: count ?? 0,
        totalPages: Math.max(Math.ceil((count ?? 0) / pageSize), 1),
      },
    };
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(customer) {
    const { data, error } = await supabase
      .from("customers")
      .insert([customer])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, customer) {
    const { data, error } = await supabase
      .from("customers")
      .update(customer)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) throw error;
    return { message: "Customer deleted successfully" };
  },

  async getTotal() {
    const { count, error } = await supabase
      .from("customers")
      .select("id", { count: "exact", head: true });

    if (error) throw error;

    return { total: count ?? 0 };
  },
};


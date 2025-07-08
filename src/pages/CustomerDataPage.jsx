import React, { useState, useEffect } from 'react';
import { getTables } from '../api/mockApi';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../store/orderStore';

const CustomerDataPage = () => {
  const [tables, setTables] = useState([]);
  const [form, setForm] = useState({
    name: '',
    wa: '',
    table: '',
    note: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setCustomerData = useOrderStore((state) => state.setCustomerData);

  useEffect(() => {
    getTables().then(setTables);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.wa || !form.table) {
      setError('Nama, nomor WA, dan meja wajib diisi!');
      return;
    }
    setCustomerData(form);
    navigate('/review');
  };

  return (
    <div className="max-w-md mx-auto mt-8 card bg-base-100 shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Isi Data Diri</h2>
      {error && <div className="alert alert-error mb-4 py-2 px-3">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Nama</label>
          <input name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Nomor WhatsApp</label>
          <input name="wa" value={form.wa} onChange={handleChange} className="input input-bordered w-full" required placeholder="08xxxx" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Pilih Meja/Area</label>
          <select name="table" value={form.table} onChange={handleChange} className="select select-bordered w-full" required>
            <option value="">-- Pilih --</option>
            {tables.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Catatan (opsional)</label>
          <textarea name="note" value={form.note} onChange={handleChange} className="textarea textarea-bordered w-full" />
        </div>
        <button type="submit" className="btn btn-primary btn-block rounded-full text-lg">Lanjut Review Pesanan</button>
      </form>
    </div>
  );
};

export default CustomerDataPage;

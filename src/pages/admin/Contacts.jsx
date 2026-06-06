import { useState, useEffect } from 'react';
import contactService from '../../services/contactService.js';
import Button from '../../components/Button.jsx';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const statusOrder = { new: 0, read: 1, replied: 2 };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await contactService.getAll();
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await contactService.updateStatus(id, status);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin mau hapus pesan ini?')) return;
    try {
      await contactService.delete(id);
      setSelectedContact(null);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusStyle = (status) => {
    if (status === 'new') return 'bg-red-200';
    if (status === 'read') return 'bg-yellow-200';
    return 'bg-green-200';
  };

  return (
    <div>
      <h1 className="font-black text-3xl mb-8">Pesan Masuk</h1>

      <div className="flex gap-6">
        {/* LIST PESAN */}
        <div className="flex-1 border-2 border-black bg-white shadow-nb overflow-hidden">
          {loading ? (
            <p className="p-4">Loading...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-primary border-b-2 border-black">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-sm">
                    Nama
                  </th>
                  <th className="text-left px-4 py-3 font-black text-sm">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 font-black text-sm">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-black text-sm">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, index) => (
                  <tr
                    key={c.id}
                    className={`cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${selectedContact?.id === c.id ? 'border-l-4 border-primary' : ''}`}
                    onClick={() => {
                      setSelectedContact(c);
                      if (c.status === 'new') handleUpdateStatus(c.id, 'read');
                    }}
                  >
                    <td className="px-4 py-3 font-semibold text-sm">
                      {c.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {c.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 border-2 border-black text-xs font-bold ${getStatusStyle(c.status)}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(c.id);
                        }}
                        className="px-3 py-1 border-2 border-black text-xs font-bold shadow-nb-sm bg-red-200"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* DETAIL PESAN */}
        {selectedContact && (
          <div className="w-80 border-2 border-black bg-white shadow-nb p-6 shrink-0">
            <h2 className="font-black text-lg mb-4">Detail Pesan</h2>

            <div className="flex flex-col gap-3 mb-6">
              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  Nama
                </p>
                <p className="font-semibold">{selectedContact.name}</p>
              </div>
              {selectedContact.business_name && (
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500">
                    Bisnis
                  </p>
                  <p className="font-semibold">
                    {selectedContact.business_name}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  Email
                </p>
                <p className="font-semibold">{selectedContact.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  No. HP
                </p>
                <p className="font-semibold">{selectedContact.phone}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  Kota
                </p>
                <p className="font-semibold">{selectedContact.city}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  Pesan
                </p>
                <p className="text-sm">{selectedContact.message}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  Tanggal
                </p>
                <p className="text-sm">
                  {new Date(selectedContact.created_at).toLocaleDateString(
                    'id-ID'
                  )}
                </p>
              </div>
            </div>

            {/* Balas via Email */}
            <a
              href={`mailto:${selectedContact.email}?subject=Re: Pesan dari ${selectedContact.name}&body=Halo ${selectedContact.name},%0A%0A`}
              target="_blank"
              rel="noreferrer"
              onClick={() => handleUpdateStatus(selectedContact.id, 'replied')}
            >
              <Button variant="primary" className="w-full">
                📧 Balas via Email
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContacts;

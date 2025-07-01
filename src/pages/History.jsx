import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("sendyourfeel_history");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    alert("Link disalin ke clipboard!");
  };

  const handleWhatsapp = (receiver, link) => {
    const message = `Hai ${receiver}, aku punya sesuatu buatmu 💌\n${link}`;
    const waLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waLink, "_blank");
  };

  return (
    <div className="min-h-screen pt-[80px] bg-sky-50 py-10 px-4 font-outfit">
      <h1 className="text-center text-4xl font-bold text-cyan-700 mb-8 font-satisfy-regular">Your History</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {history.length === 0 ? (
          <p className="text-center text-gray-400">Belum ada riwayat pesan.</p>
        ) : (
          history.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow p-6 relative border-l-4 border-sky-400">
              <h2 className="text-lg font-semibold text-cyan-700 mb-3">
                Untuk: {item.receiver}
              </h2>

              <input
                type="text"
                readOnly
                value={item.link}
                className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 text-gray-700 text-sm mb-4 font-outfit"
              />

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleCopy(item.link)}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow"
                >
                  Salin Link
                </button>

                <button
                  onClick={() => handleWhatsapp(item.receiver, item.link)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow"
                >
                  Kirim via WhatsApp
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;

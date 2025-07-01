import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Read() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch(`${API_URL}/api/message/${id}`);
        const result = await response.json();

        if (!response.ok) throw new Error(result.error || "Gagal memuat pesan.");

        setData({
          ...result,
          createdAt: new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50 font-outfit">
        <p className="text-gray-400">Loading pesan...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[80px] bg-sky-50 flex flex-col items-center justify-center px-4 py-10 font-outfit">
      <div className="bg-white rounded-3xl shadow-xl p-12 md:p-16 max-w-4xl w-full relative">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-xl md:text-4xl text-sky-600 font-medium mb-1 font-satisfy-regular">
            Dari <span className="font-bold">{data.sender}</span> untuk{" "}
            <span className="font-bold">{data.receiver}</span>
          </h2>
        </div>

        {/* Lagu */}
        {data.song_url && (
          <div className="mb-6">
            <p className="text-sm text-center text-sky-500 mb-2 font-medium">
              Pesan dan lagu untukmu:
            </p>
            <iframe
              src={`https://open.spotify.com/embed/track/${data.song_url}?utm_source=sendyourfeel`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            ></iframe>
          </div>
        )}

        {/* Isi Pesan */}
        <div className="italic text-gray-700 leading-relaxed text-lg whitespace-pre-line">
          {data.content}
        </div>

        {/* Tanggal */}
        <div className="mt-10 text-right text-sm text-gray-400 italic">
          Dikirim pada {data.createdAt}
        </div>

        {/* Dekorasi */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-sky-200 w-24 h-1 rounded-full"></div>
      </div>

       <button
        onClick={() => navigate("/create")}
        className="mt-6 bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-6 rounded-xl transition-all shadow-md"
      >
        Mau buat pesan?
      </button>
    </div>
  );
}

export default Read;

import { useState } from "react";
import { Copy } from "lucide-react";
import { Link } from "react-router-dom";


function Create() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [songId, setSongId] = useState("");
  const [song, setSong] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [link, setLink] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSongChange = async (e) => {
    const value = e.target.value;
    setSong(value);

    if (value.trim() === "") {
      setShowDropdown(false);
      setFilteredSongs([]);
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/spotify/search?q=${encodeURIComponent(
          value
        )}`
      );
      const data = await res.json();

      setFilteredSongs(data);
      setShowDropdown(true);
    } catch (err) {
      console.error("Failed to fetch songs", err);
      setFilteredSongs([]);
      setShowDropdown(false);
    }
  };

  const handleSelectSong = (track) => {
    setSong(`${track.title} - ${track.artist}`);
    setSongId(track.id);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi (optional)
    if (!sender || !receiver || !message || !songId) {
      alert("Lengkapi semua field dan pilih lagu.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender,
          receiver,
          content: message,
          song_url: songId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("❌ Insert error:", result);
        alert("Gagal mengirim pesan.");
        return;
      }

      setLink(`http://localhost:5173/read/${result.id}`);
      setIsSubmitted(true);

      // Simpan ke localStorage
      const newMessage = {
        sender,
        receiver,
        content: message,
        link: `http://localhost:5173/read/${result.id}`,
        createdAt: new Date().toISOString(), 
      };

      // Ambil history lama
      const existing =
        JSON.parse(localStorage.getItem("sendyourfeel_history")) || [];

      // Tambahkan ke array
      existing.push(newMessage);

      // Simpan kembali
      localStorage.setItem("sendyourfeel_history", JSON.stringify(existing));
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert("Terjadi kesalahan.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    alert("Link berhasil disalin!");
  };

  return (
    <div className="min-h-screen pt-[80px] bg-[linear-gradient(90deg,_#e3ffe7_0%,_#d9e7ff_100%)] text-cyan-700 px-4 py-10">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold my-4 font-satisfy-regular">
          Sebuah Pesan...
        </h1>
        <p className="text-xl mb-10 italic font-satisfy-regular leading-relaxed">
          Kadang, kata tak sampai lewat suara. Biarlah tulisan dan lagu jadi
          bahasa jiwa. Kirimkan rasa, dalam bait dan melodi yang tak biasa.
        </p>
      </div>
      {!isSubmitted && (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-lg space-y-6"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* KIRI: Nama, Penerima, Lagu */}
            <div className="w-full md:w-1/2 space-y-5">
              <div>
                <label className="block text-cyan-700 font-outfit mb-1">
                  Nama Pengirim
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border border-sky-300 font-outfit text-cyan-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="block text-cyan-700 font-outfit mb-1">
                  Nama Penerima
                </label>
                <input
                  type="text"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border border-sky-300 font-outfit text-cyan-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="block text-cyan-700 font-outfit mb-1">
                  Lagu
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={song}
                    onChange={handleSongChange}
                    required
                    className="w-full p-3 pr-10 rounded-xl border border-sky-300 font-outfit text-cyan-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    placeholder="Cari lagu..."
                  />

                  {/* Tombol silang */}
                  {song && (
                    <button
                      onClick={() => {
                        setSong("");
                        setSongId(null);
                        setFilteredSongs([]);
                        setShowDropdown(false);
                      }}
                      className="absolute right-3 top-2/4 -translate-y-1/2 text-gray-400 hover:text-red-400 text-2xl"
                      type="button"
                    >
                      &times;
                    </button>
                  )}

                  {/* Dropdown */}
                  {showDropdown && (
                    <ul className="absolute z-10 bg-white w-full mt-1 rounded-xl border shadow max-h-48 overflow-y-auto font-outfit">
                      {filteredSongs.length > 0 ? (
                        filteredSongs.map((track) => (
                          <li
                            key={track.id}
                            onClick={() => handleSelectSong(track)}
                            className="flex items-center gap-3 p-2 hover:bg-green-100 cursor-pointer rounded transition-all"
                          >
                            <img
                              src={track.album_image}
                              alt={`${track.title} cover`}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">
                                {track.title}
                              </span>
                              <span className="text-xs text-gray-500">
                                {track.artist}
                              </span>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="p-3 text-gray-400 font-outfit">
                          Lagu tidak ditemukan
                        </li>
                      )}
                    </ul>
                  )}

                  {/* Iframe Spotify Embed */}
                  {songId && (
                    <div className="mt-8">
                      <p className="font-outfit text-sm text-cyan-700 mb-2">
                        Dengarkan lagu:
                      </p>
                      <iframe
                        src={`https://open.spotify.com/embed/track/${songId}?utm_source=sendyourfeel`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-xl"
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* KANAN: Pesan */}
            <div className="w-full md:w-1/2">
              <label className="block text-cyan-700 font-outfit mb-1">
                Isi Pesan
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={9}
                className="w-full p-3 rounded-xl border border-sky-300 font-outfit text-cyan-700 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Tombol Submit */}
          <div className="text-right pt-4">
            <button
              type="submit"
              className="bg-sky-500 text-white font-outfit font-semibold px-6 py-3 rounded-full hover:bg-sky-600 transition"
            >
              Buat Pesan
            </button>
          </div>
        </form>
      )}

      {link && (
        <>
          <div className="max-w-xl mx-auto mt-8 bg-sky-50 border border-sky-200 rounded-xl p-5 shadow text-center">
            <p className="text-sm text-sky-500 mb-3 font-outfit">
              Link pesanmu:
            </p>
            <div className="flex items-center justify-between bg-white px-4 py-2 rounded-xl shadow-inner border">
              <span className="text-sm break-all text-left font-outfit">
                {link}
              </span>
              <button
                onClick={copyToClipboard}
                className="ml-3 text-sky-500 hover:text-sky-700 font-outfit"
                title="Salin Link"
              >
                <Copy size={18} />
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-3 flex-wrap">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-700 text-white px-4 py-2 rounded-xl hover:bg-sky-600 transition flex items-center gap-2 font-outfit"
              >
                Buka
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(link)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition flex items-center gap-2 font-outfit"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WA"
                  className="w-5 h-5"
                />
                Share WhatsApp
              </a>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link to="/">
              <button className="bg-white font-outfit text-cyan-800 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
                Kembali
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Create;

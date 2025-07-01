import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen pt-[80px] bg-gradient-to-r from-[#4b6cb7] to-[#182848] text-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 font-outfit">sendyourfeel!</h1>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl leading-relaxed font-satisfy-regular">
        Dalam sunyi, kata tak terucap. Biarlah lagu dan pesan jadi wakil rasa.
        Kirimkan perasaanmu dengan elegan, lewat melodi dan bisikan hati yang
        tulus.
      </p>
      <Link to="/create">
        <button className="bg-white font-outfit text-cyan-800 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
          Buat pesanmu untuk orang lain
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
